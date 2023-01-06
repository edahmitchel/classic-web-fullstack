const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    dob: { type: String, required: true },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    verificationToken: { type: String, required: true },
    isVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log(await bcrypt.compare(enteredPassword, this.password));
  //  test
  const salt = await bcrypt.genSalt(10);
  const check = await bcrypt.hash("check", salt);
  const check2 = await bcrypt.hash("pass", salt);
  const check3 = await bcrypt.compare(enteredPassword, check2);

  console.log({ check, check2, check3 });
  //
  console.log(enteredPassword);
  console.log(await bcrypt.compareSync(enteredPassword, this.password));
  console.log(this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

// userSchema.pre("save", async function (next) {
//   if (!this.isModified) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   console.log(this.password);
//   this.password = await bcrypt.hash(this.password, salt);
// });

const User = mongoose.model("User", userSchema);
module.exports = { User };

// old schema
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const userSchema = mongoose.Schema(
//   {
//     username: {
//       type: String,
//       trim: true,
//       reuired: true,
//       unique: true,
//     },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     gender: {
//       type: String,
//       enum: ["male", "female"],
//       required: true,
//     },
//     dob: { type: String, required: true },
//     pic: {
//       type: String,
//       required: true,
//       default:
//         "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
//     },
//     isVerified: {
//       type: Boolean,
//       required: true,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };
// userSchema.pre("save", async function (next) {
//   if (!this.isModified) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });
// const User = mongoose.model("User", userSchema);
// module.exports = { User };
