import { Router } from "express";
import { logInUser, registerUser } from "../controller/user.controller.js";

const router = Router()

router.route("/registerUser").post(registerUser)
router.route("/logInUser").post(logInUser)

export default router