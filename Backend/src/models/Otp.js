import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId , ref: "User", required: true},
  email: { type: String, required: true },
  otp: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 },
});

export default mongoose.model("Otp", OtpSchema);
