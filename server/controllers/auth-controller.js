const User = require("../models/user-model.js");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  
  try {
    return res.status(200).send("Welcome to the Home Page");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "Email Already exists" });
    }

    //hash the password->we can do it here or in user-model.js using pre method of schema
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    const user = await User.create({
      username,
      email,
      phone,
      password,
    });

    return res.status(201).json({
      message: "Registration Successfull",
      token: await user.generateToken(),
      userId: user._id.toString(),
    });
  } catch (error) {
    return res.status(500).json({ message: "Error in registering user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserFound = await User.findOne({ email: email });

    if (!isUserFound) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const user = await isUserFound.comparePassword(password);

    if (user) {
      return res.status(200).json({
        message: "Login Successfull",
        token: await isUserFound.generateToken(),
        userId: isUserFound._id.toString(),
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    // console.log(error);
    // res.status(500).send("Error in login ");
    next(error);
  }
};
module.exports = { home, register, login };
