import jwt from "jsonwebtoken";

export const authorization = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;  // 👈 Read from cookie
    if (!token) {
      return res.status(401).json({ message: "Token not found!", valid: false});
    }

    //verify token & extract details from token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Something wrong with token" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong in middleware", error: error.message });
  }
};
