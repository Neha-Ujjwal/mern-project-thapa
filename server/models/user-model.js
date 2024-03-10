const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//secure the pasword using bcryptjs
//pre  is a Mongoose middleware that runs before saving a user instance to the database.

userSchema.pre("save", async function (next) {
  //here this refers to current user
  const user = this;

  //if password is already encrypted or there is no password
  if (!user.isModified("password")) {
    next(); //goes to next step which is storing in database in this case
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

//JSON WEB TOKEN-Authnetication and Authorization
// Tokens, such as JWTs (JSON Web Tokens), are typically not stored in the database
// along with other user details. Instead, they are issued by the server during the
// authentication process and then stored on the client-side (e.g., in cookies or local storage) for later use

//instance methods
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    throw new Error("Error in jwt ", error);
  }
};

//comparing password
userSchema.methods.comparePassword = async function (password) {
  try {
    return bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error("Error in comaring password", error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
