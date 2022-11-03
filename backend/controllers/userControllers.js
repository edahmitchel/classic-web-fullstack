const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken.JS");
const { User } = require("../models/userModel");
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { username, email, password, dob, gender, pic } = req.body;

  if (!username || !email || !password || !dob || !gender) {
    res.status(400);
    throw new Error("fields re missing");
  }
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error("user exists");
  }
  const user = await User.create({
    username,
    email,
    password,
    dob,
    gender,
    pic,
  });
  //   console.log(user.username);
  if (user)
    res.status(201).json({
      username: username,
      email: user.email,
      password: user.password,
      gender: user.gender,
      dob: user.dob,
      pic: user.pic,
      isVerified: user.isVerified,
      _id: user._id,
      token: generateToken(user._id),
    });
  else {
    res.status(400);
    throw new Error("failed to create user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) return res.status(400).json("user does not exist");
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      username: user.username,
      email: user.email,
      // password: user.password,
      gender: user.gender,
      dob: user.dob,
      pic: user.pic,
      isVerified: user.isVerified,
      _id: user._id,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid email or password");
  }
});
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: "i" } },
          // { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword);
  // .find({ _id: { $ne: req.user._id } });

  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
