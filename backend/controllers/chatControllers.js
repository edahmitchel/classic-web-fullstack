const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const { User } = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  console.log(`THIS IS USER ${userId}`);
  if (!userId) {
    console.log("user param not sent with request");
    return res.sendStatus(400);
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  console.log(`this is is chat /n ${isChat}`);
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: `users${req.user._id}and${userId}`,
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({
        _id: createdChat._id,
      }).populate("users", "-password");
      console.log(fullChat);
      res.status(200).json(fullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});
const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      // .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        console.log(results);
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// const fetchChats = asyncHandler(async (req, res) => {
//   const { userId } = req.body;
//   try {
//     const chats = await Chat.find({
//       users: { $elemMatch: { $eq: req.user._id } },
//     })
//       .populate("users", "-password")
//       .populate("latestMessage")
//       .sort({ updatedAt: -1 })
//       .then(async (results) => {
//         results = await User.populate(results, {
//           path: "latestMessage.sender",
//           select: "name pic email",
//         });

//         res.status(200).send(results);
//       });
//     console.log(chats);
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }
// });
const createIntrestChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "please fill all the fields" });
  }
  const { name } = req.body;
  const users = JSON.parse(req.body.users);
  users.push(req.user._id);
  console.log(`this is ${users}`);
  try {
    const groupChat = await Chat.create({
      chatName: name,
      users: users,
      isGroupChat: true,
      // groupAdmin:req.user
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate(
      "users",
      "-password"
    );
    // .populate("groupAdmin","-password")

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
    // .send({message:error.message})
  }
});
const renameIntrestChat = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    ).populate("users", "-password");
    if (!updatedChat) {
      res.status(404);
      throw new Error("chat not found");
    } else {
      res.json(updatedChat);
    }
    // .populate("groupAdmin","-password");
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
    // .send({message:error.message})
  }
});

const deleteIntrestChat = asyncHandler(async (req, res) => {});
const joinIntrestChat = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  ).populate("users", "-password");
  // .populate("groupAdmin","-password");
  if (!added) {
    res.status(404);
    throw new Error("chat not found");
  } else {
    // res.json(added);

    res.status(200).send(added);
  }
});
const removeIntrestChat = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  ).populate("users", "-password");
  // .populate("groupAdmin","-password");
  if (!removed) {
    res.status(404);
    throw new Error("chat not found");
  } else {
    // res.json(removed);

    res.status(200).send(removed);
  }
});
module.exports = {
  accessChat,
  fetchChats,
  createIntrestChat,
  renameIntrestChat,
  joinIntrestChat,
  removeIntrestChat,
};
