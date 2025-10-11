import express from "express"
import { authorization } from "../middlewares/auth.js";
import { checkRole } from "../middlewares/checkRole.js";
import { createNewUser, getRolesForCreation, login, resendOtp, verifyOtp } from "../controllers/user.js";

const router = express.Router();

//Auth Routes
router.post("/auth/login", login)
router.post("/auth/resend-otp", authorization, resendOtp)
router.post("/auth/verify-otp", authorization, verifyOtp)
router.get("/auth/verify-token", authorization, (req, res) => {
    res.status(200).json({valid: true, user: req.user})
})

//get allowed roles in dropdown of new user creation
router.get("/get-roles", authorization, checkRole(["owner", "admin"]), getRolesForCreation)

//create new user only who having role owner or admin
router.post("/create-user", authorization, checkRole(["owner", "admin"]), createNewUser)

export default router;