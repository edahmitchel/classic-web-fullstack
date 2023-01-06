const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken.JS");
const { User } = require("../models/userModel");
const {
  generateVerificationToken,
  sendVerificationEmail,
} = require("../services/email");
const jwt = require("jsonwebtoken");
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password, dob, gender, pic } = req.body;

  if (!email || !password || !dob || !gender) {
    res.status(400);
    throw new Error("fields re missing");
  }
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error("user exists");
  }

  // generate alias
  const customConfig = {
    dictionaries: [adjectives, colors, animals],
    separator: "",
    length: 2,
  };
  const generatedUserName = await uniqueNamesGenerator(customConfig); // big-donkey
  console.log(generatedUserName);
  const verificationToken = generateVerificationToken(generatedUserName);
  const username = generatedUserName;
  console.log(username);
  const user = await User.create({
    username,
    email,
    password,
    dob,
    gender,
    pic,
    verificationToken,
  });
  sendVerificationEmail(email, verificationToken, username);
  res.status(200).json({ message: "Verification link sent to email.", user });
});

// old register

// const registerUser = asyncHandler(async (req, res) => {
//   console.log(req.body);
//   const { username, email, password, dob, gender, pic } = req.body;

//   if (!username || !email || !password || !dob || !gender) {
//     res.status(400);
//     throw new Error("fields re missing");
//   }
//   const userExist = await User.findOne({ email: email });
//   if (userExist) {
//     res.status(400);
//     throw new Error("user exists");
//   }
//   const user = await User.create({
//     username,
//     email,
//     password,
//     dob,
//     gender,
//     pic,
//   });
//   //   console.log(user.username);
//   if (user)
//     res.status(201).json({
//       username: username,
//       email: user.email,
//       password: user.password,
//       gender: user.gender,
//       dob: user.dob,
//       pic: user.pic,
//       isVerified: user.isVerified,
//       _id: user._id,
//       token: generateToken(user._id),
//     });
//   else {
//     res.status(400);
//     throw new Error("failed to create user");
//   }
// });

//

// verify email

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username } = decoded;

    // Find the user with the matching userId and token
    User.findOne({ username: username, verificationToken: token }).then(
      (user) => {
        if (user) {
          // Update the isVerified flag to true
          user.isVerified = true;
          user.save().then(() => {
            res.send({ message: "Email verified." });
          });
        } else {
          res.status(400).send({ message: "Invalid verification token." });
        }
      }
    );
  } catch (error) {
    res.status(400).send({ message: "Invalid verification token." });
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) return res.status(400).json("user does not exist");
  console.log(user);
  if (user && (await user.matchPassword(password))) {
    if (!user.isVerified) {
      return res.status(400).send("Email is not verified");
    }
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
const updateUser = asyncHandler(
  // Update user details
  async (req, res) => {
    const update = req.body;
    try {
      const user = await User.findByIdAndUpdate(req.user._id, { ...update });
      const newuser = await User.findById(req.user._id);
      res.send(newuser);
    } catch (err) {
      res.status(404);
      res.send({ error: "user doesn't exist!", data: err });
    }
  }
);
// third logic
// try {
//   const { id } = req.user._id;
//   const updates = req.body;

//   // Create a new object to store the updates
//   const updatedRecord = { ...updates };

//   // Loop through the updates and add each non-empty field to the updatedRecord object
//   // Object.keys(updates).forEach((key) => {
//   //   if (updates[key]) {
//   //     updatedRecord[key] = updates[key];
//   //   }
//   // });

//   console.log(updates);
//   // Find the record in the database and update it with the non-empty fields from the updatedRecord object
//   const result = await User.findByIdAndUpdate(id, updates, {
//     new: true,
//   });

//   res.json(result);
// } catch (error) {
//   res.status(500).send(error);
// }
// seconde logic
// try {
//   // Find the user by their ID
//   const user = await User.findById(req.user._id);

//   // Update the user details with the new values from the request body
//   if (req.body.name) user.name = req.body.name;
//   if (req.body.email) user.email = req.body.email;
//   if (req.body.pic) user.pic = req.body.pic;

//   // Save the updated user to the database
//   const updatedUser = await user.save();
//   console.log(user);
//   // Send a response with the updated user details
//   res.json({
//     success: true,
//     data: updatedUser,
//   });
// } catch (err) {
//   // If there was an error, send a response with a status code of 500 (Internal Server Error)
//   res.status(500).json({
//     success: false,
//     message: err.message,
//   });
// }

// first logic
//   (req, res) => {
//     const id = req.user._id;
//     // const field = req.params.field;
//     // Get the updated value for the field
//     const updatedValue = req.body.user;

//     // Use Mongoose to find the document and update the field
//     const updatedData = User.findByIdAndUpdate(id, {
//       $set: { field: username },
//     });
//     if (updatedData) {
//       return res.status(200).send(updatedData);
//     } else {
//       // If there was an error, return an error response
//       return res.json({ message: "Successfully updated field" });
//     }

//     // If the document was found and updated, return a success response
//   }

//   // This function assumes that you have already defined a Mongoose model for the database collection that you want to edit, and that you have imported this model into your controller file. It also assumes that the id of the document to edit is passed as a URL parameter, and that the updated value for the field is passed in the request body. You may need to adjust these details to match your specific use case.
// );
module.exports = { registerUser, authUser, allUsers, updateUser, verifyEmail };
