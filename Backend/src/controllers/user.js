import Otp from "../models/Otp.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generator from "generate-password";
import { sendMail } from "../utils/sendMail.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(411)
        .json({ message: "Both Email & Password Required" });
    }

    //find email from DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not Found in DB" });
    }

    //after getting user in DB validate the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //if password matched then generate a JWT token to store email
    const token = await jwt.sign({ email: user.email }, process.env.JWT_SECRET);

    //now generate OTP for first time
    await generateOtpForUser(user);

    return res.status(201).json({ token });
  } catch (error) {
    console.error("Failed to Login. Error => ", error.message);
    return res.status(500).json({ message: "Failed to Login!" });
  }
};

export const generateOtpForUser = async (user) => {
  try {
    const sixDigitOTP = Math.floor(100000 + Math.random() * 900000);

    //check if user already generate a otp earlier
    const oldOtp = await Otp.findOne({ userId: user._id, email: user.email });
    if (oldOtp) {
      //if oldOtp found then update otp
      await Otp.findOneAndUpdate(
        { email: user.email },
        { otp: sixDigitOTP, createdAt: Date.now() }
      );
    } else {
      //if no old otp found then create new otp in db
      await Otp.create({
        userId: user._id,
        email: user.email,
        otp: sixDigitOTP,
      });
    }

    // send the same otp to user's email //TODO: sendMail Functionality pending
    await sendMail(
      user.email,
      "OTP for Login in LMS",
      `Your One Time Password(OTP): ${sixDigitOTP}
      This OTP is valid for: 5 Minutes`
    ); // Arguments- Email-Id, Email-Subject, Email-Body
  } catch (error) {
    console.error(
      "Failed to generate Otp for first time. Error => ",
      error.message
    );
  }
};

export const resendOtp = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(404).json({ message: "Token not found!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Something wrong with token" });
    }
    const email = decoded.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found to resend OTP!" });
    }

    //now generate new otp and send to user's email
    await generateOtpForUser(user);

    return res.status(200).json({message: "OTP resend Successfully!"})
  } catch (error) {
    console.error("Failed to Resend OTP. Error => ", error.message);
    return res.status(500).json({ message: "Failed to Resend OTP" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.user.email;
    //now find the otp from db
    const otpInDb = await Otp.findOne({ email });
    if (!otpInDb) {
      return res
        .status(404)
        .json({ message: "OTP not found in our Database!" });
    }

    //now its time to match the otp
    if (String(otpInDb.otp) === String(otp)) {
      //if otp matched then delete the otp in db
      await Otp.deleteOne({ _id: otpInDb._id });

      const user = await User.findById(otpInDb.userId);
      if (!user) {
        return res
          .status(404)
          .json({ message: "Otp matched but user not found to login" });
      }

      const finalToken = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      //now return the success res to frontend
      return res
        .status(200)
        .json({ message: "OTP Verified Successfully.", token: finalToken });
    } else {
      return res
        .status(410)
        .json({ message: "Invalid OTP, Not Matched! OR Expired OTP" });
    }
  } catch (error) {
    console.error("Failed to verify OTP. Error => ", error.message);
    return res.status(500).json({ message: "Failed to verify OTP" });
  }
};

export const getRolesForCreation = async (req, res) => {
  const loggedInRole = req?.user?.role;
  let allowedRoles = [];
  if (loggedInRole === "owner") {
    allowedRoles = ["admin", "member"];
  } else if (loggedInRole === "admin") {
    allowedRoles = ["member"];
  }
  return res.json({ roles: allowedRoles });
};

export const createNewUser = async (req, res) => {
  try {
    const { role: loggedInRole } = req?.user;
    const { name, email, role: selectedRole } = req.body;

    // Field validation
    if (!name || !email || !selectedRole) {
      return res.status(411).json({ message: "All fields required!" });
    }

    /*owner can't create another owner only one owner in db is allowed
    admin can't create another admin, owner can create multiple admin
    Owner rights -> create admin or member
    Admin rights -> create member only
    */
    // Prevent invalid role creation
    if (loggedInRole === "owner" && selectedRole === "owner") {
      return res
        .status(403)
        .json({ message: "Owner cannot create another owner" });
    }
    if (loggedInRole === "admin" && selectedRole !== "member") {
      return res.status(403).json({ message: "Admin can only create members" });
    }

    // Check if user exists
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(409).json({ message: "User email already exist" });
    }

    //generate a random password and send via email to user
    const randomPassword = generator.generate({ length: 8, numbers: true });

    // Hash password
    const hashPassword = await bcrypt.hash(randomPassword, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role: selectedRole,
    });
    await newUser.save(); //save/create new user in DB

    // Send email
    const emailBody = `Your account in our library created successfully✅
        Please login in our system
        email: ${email},
        password: ${randomPassword}

        **If any issue contact to the respected librarian.
        `;
    sendMail(email, "Library Account Created", emailBody); //sending mail to new user

    res.status(201).json({
      message: "New User Created Successfully! Email Send to New User.",
    });
    
  } catch (error) {
    console.error("Failed to create new user. Error => ", error.message);
    return res
      .status(500)
      .json({ message: "Failed to create new user", error: error.message });
  }
};
