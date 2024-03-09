const User = require("../models/user-model.js");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to the Home Page");
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

    res.status(201).json({ message: user });
  } catch (error) {
    res.status(500).json({ message: "page not found" });
  }
};
module.exports = { home, register };
