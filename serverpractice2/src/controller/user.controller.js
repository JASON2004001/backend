import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const registerUser = async (req, res) => {
  
    try {
    // name,email and password needed
    const { name, email, password } = req.body;

    // Check all field are present
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // existing  email is presnt or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exist please logIn",
      });
    }
    
    // we will simple create the user
    const newUser = await User.create({ name, email, password });
    return res.status(201).json({
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    console.log("Someting went wrong while registerin the user");
  }
};

const logInUser = async (req, res) => {
  try {
    // email and password needed
    const { email, password } = req.body;
    // all fields are empty or not
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // email is present in db
    const existingUser = await User.findOne({ email });
    // jodi na thake thole amra error show korbo
    if (!existingUser) {
      return res.status(400).json({
        msg: "Please register the user",
      });
    }
    // check the password in db
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );
    // Error will send if not correct
    if (!isPasswordCorrect) {
      return res.status(400).json({
        msg: "Email or password is not correct",
      });
    }
    // accessToken and refreshToken generate  
      const accessToken = await jwt.sign(
        {id: existingUser._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIARY}
      )

      const refreshToken = await jwt.sign(
        {id: existingUser._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIARY}
      )

    // Then refreshToken will be database saved 
    existingUser.refreshToken = refreshToken
    await existingUser.save()
    //  SEnd user  accessToken and refreshToken will send in cookies 
    const options = {
      httpOnly: true,
      secure: true
    }

    // give login  and user info will send response 
    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json({
      msg: "User logIn successfully",
      data: existingUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "something went wrong while logIn the user",
    });
  }
};
export { registerUser, logInUser };
