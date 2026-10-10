import { Router } from "express";
import { logInUser, logOutUser, registerUser } from "../controller/user.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/registerUser").post(registerUser)
router.route("/logInUser").post(logInUser)
router.route("/logOutUser").post(verifyJwt,logOutUser)

export default router