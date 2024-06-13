const USER_SCHEMA = require("../Model/taskModel");
let bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config");
let jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    //check for existing user
    let user = await USER_SCHEMA.findOne({ email });

    if (user) {
      res.status(400).json({ message: "user already existing" });
    }

    //  add details in database
    user = new USER_SCHEMA({
      userName,
      email,
      password: await bcrypt.hash(password, 10)
    });
    await user.save();
    return res
      .status(201)
      .json({ message: "User registration successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    let { userName, password } = req.body;
    let user = await USER_SCHEMA.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "User Not Found?" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({ message: "Wrong Password" });
    }
    // res.status(200).json({ message: "Login successfully" });
    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );
    res.cookie("jwt", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", " ", { expiresIn: 1 });
    return res.status(200).json({ messge: "Logout successfully" });
  } catch (err) {
    res.json({ message: err.message });
  }
};
