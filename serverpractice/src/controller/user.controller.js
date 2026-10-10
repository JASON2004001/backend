import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
  

  try {
    // name,email and password need from user
    const { name, email, password } = req.body;

    // if 3 fields are missing
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // existing user same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exist please logIn",
      });
    }
    

    // we a create the user

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
    // email and password are needed
    const { email, password } = req.body;
    // all fields are empty or not
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // email is exist or not
    const existingUser = await User.findOne({ email })
    // not email present
    if (!existingUser) {
      return res.status(400).json({
        msg: "Please register the user",
      });
    }
    // check the password existing user
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );
    // send error in password
    if (!isPasswordCorrect) {
      return res.status(400).json({
        msg: "Email or password is not correct",
      });
    }
    // login user in 
    return res.status(200).json({
      msg: "User login successfully",
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
