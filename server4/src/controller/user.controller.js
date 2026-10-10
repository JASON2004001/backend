import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
  // 200 => successfull , 201 => created ,400 => Bad request, 403=> forbidden , 404 => not found , 500 => server error
  // database is always in another container
  try {
    // name,email ar password user kach thake nabo
    const { name, email, password } = req.body;

    // ai 3 te field ar modha jodi kichu missing thake thole ami error dabo
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // existing kono email ache kina same email a
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exist please logIn",
      });
    }
    // we will hash the password


    // const hashPassword = await bcrypt.hash(password,10)


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
    // email ar password ta nite hobe user ar kach thake
    const { email, password } = req.body;
    // all fields are empty or not
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // email ta check korbe user already register ache kine
    const existingUser = await User.findOne({ email })
    // jodi na thake thole amra error show korbo
    if (!existingUser) {
      return res.status(400).json({
        msg: "Please register the user",
      });
    }
    // thole amra passsword check korbo existing user ar
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );
    // error msg send korbo send korbo user k
    if (!isPasswordCorrect) {
      return res.status(400).json({
        msg: "Email or password is not correct",
      });
    }
    // login korte dabo ar user info ta pathiye dabo response a
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
