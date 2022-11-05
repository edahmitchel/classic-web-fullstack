const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // console.log("Bearer");
    try {
      token = req.headers.authorization.split(" ")[1];
      // console.log(token);
      //    decode
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded);

      req.user = await User.findById(decoded._id).select("-password");
      // console.log(`this is user in middle ware ${req.user._id}`);
      next();
    } catch (error) {
      res.status(400);
      throw new Error("not authorized");
    }
  }
});

module.exports = { protect };
