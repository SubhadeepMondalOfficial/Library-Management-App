import mongoose from "mongoose";
import User from "../src/models/User.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    //owner must one in db not multiple
    const anyOwnerPresent = await User.findOne({ role: "owner" });
    if (anyOwnerPresent) {
      console.log(
        "Owner already present in DB. Creating multiple owner not allowed ❌"
      );
      console.log(`Existing Owner Email- ${anyOwnerPresent.email}`);
      console.log(
        "To add new owner- manually remove the existing owner from DB"
      );
      process.exit(0); //zero(1) means "The program finished normally without errors." telling the OS
    }

    // if role=owner not present then create owner in db
    const hashPassword = await bcrypt.hash(process.env.OWNER_PASSWORD, 10);

    await User.create({
      name: process.env.OWNER_NAME,
      email: process.env.OWNER_EMAIL,
      password: hashPassword,
      role: "owner",
    });

    console.log("Owner has been created in DB ✅");
    process.exit(1); //closes all active connections //one(1) means "Something went wrong, the program didn’t complete successfully." telling the OS
  })
  .catch((err) => {
    console.error("Error while creating Owner in DB", err);
  });
