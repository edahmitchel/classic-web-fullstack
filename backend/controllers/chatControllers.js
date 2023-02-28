const asyncHandler = require("express-async-handler");
const { AnonymousId } = require("../models/anonymousIdModel");
const Chat = require("../models/chatModel");
const { User } = require("../models/userModel");
const { generateUniqueId } = require("./anonymousIdController");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  // console.log(`THIS IS USER ${userId}`);
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
    select: "username pic email",
  });
  // console.log(`this is is chat /n ${isChat}`);
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
      // console.log(fullChat);
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
      .populate("users", "-password -verificationToken")
      .populate({
        path: "anonymousIds",
        select: "anonymousId",
      })
      // .populate("groupAdmin", "-password")
      .populate(
        "latestMessage"

        // select: "anonymousId",
      )
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "username pic email",
        });
        // console.log(results);
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
const createInterestChat = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send("Please fill in all fields");
  }

  const { name } = req.body;
  const chat = await Chat.findOne({ chatName: name });

  if (chat) {
    return res.status(400).send("Chat name already taken");
  }

  try {
    const groupChat = await Chat.create({
      chatName: name,
      users: [req.user._id],
      isGroupChat: true,
    });

    const newAnonymousId = new AnonymousId({
      user: req.user._id,
      chat: groupChat._id,
      anonymousId: await generateUniqueId(),
    });

    const anonymousId = await newAnonymousId.save();

    await Chat.findByIdAndUpdate(groupChat._id, {
      $push: { anonymousIds: anonymousId._id },
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("anonymousIds");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// const createInterestChat = asyncHandler(async (req, res) => {
//   if (!req.body.name) {
//     return res.status(400).send("Please provide a chat name");
//   }

//   const { name } = req.body;
//   const chat = await Chat.findOne({ chatName: name });

//   if (chat) {
//     return res.status(400).send("Chat name already taken");
//   }

//   // Generate a new anonymousId for the user
//   const anonymousId = await AnonymousId.create({
//     user: req.user._id,
//     chat: null,
//     anonymousId: await generateUniqueId(),
//   });

//   const groupChat = await Chat.create({
//     chatName: name,
//     users: [req.user._id],
//     isGroupChat: true,
//     anonymousIds: [anonymousId._id],
//   });

//   const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
//     .populate("users", "-password")
//     .populate({
//       path: "anonymousIds",
//       populate: {
//         path: "user",
//         select: "-password",
//       },
//     });

//   res.status(200).json(fullGroupChat);
// });

// const createIntrestChat = asyncHandler(async (req, res) => {
//   if (
//     // !req.body.users ||
//     !req.body.name
//   ) {
//     return res.status(400).send("please fill all the fields");
//   }
//   const { name } = req.body;
//   const chat = await Chat.findOne({ chatName: name });
//   if (chat) {
//     // If a chat with the same name exists, return an error
//     return res.status(400).send("Chat name already taken");
//   }

//   // const users = JSON.parse(req.body.users);
//   // users.push(req.user._id);
//   // console.log(`this is ${users}`);
//   try {
//     const groupChat = await Chat.create({
//       chatName: name,
//       users: [req.user._id],
//       isGroupChat: true,
//       // groupAdmin:req.user
//     });
//     const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate(
//       "users",
//       "-password"
//     );
//     // .populate("groupAdmin","-password")

//     res.status(200).json(fullGroupChat);
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//     // .send({message:error.message})
//   }
// });
const renameInterestChat = asyncHandler(async (req, res) => {
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
const fetchAllInterestChat = asyncHandler(async (req, res) => {
  try {
    const chats = await Chat.find({ isGroupChat: true }).populate(
      "users",
      "-password"
    );
    res.status(200).json(chats);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const deleteInterestChat = asyncHandler(async (req, res) => {});

const joinInterestChat = asyncHandler(async (req, res) => {
  const { chatId } = req.body;

  const chat = await Chat.findById(chatId);
  if (!chat) {
    return res.status(404).send("Chat not found");
  }

  if (!chat.users.includes(req.user._id)) {
    chat.users.push(req.user._id);
    const anonymousId = await AnonymousId.findOne({
      user: req.user._id,
      chat: chatId,
    });

    if (!anonymousId) {
      const newAnonymousId = new AnonymousId({
        user: req.user._id,
        chat: chatId,
        anonymousId: await generateUniqueId(),
      });
      await newAnonymousId.save();
    }

    await chat.save();
  }

  const fullChat = await Chat.findOne({ _id: chat._id })
    .populate("users", "-password")
    .populate({
      path: "latestMessage",
      populate: {
        path: "sender",
        select: "-password",
      },
    })
    .populate({
      path: "anonymousIds",
      match: { user: req.user._id },
    });

  res.status(200).json(fullChat);
});

// const joinIntrestChat = asyncHandler(async (req, res) => {
//   const { chatId, userId } = req.body;

//   const added = await Chat.findByIdAndUpdate(
//     chatId,
//     {
//       $push: { users: userId },
//     },
//     { new: true }
//   ).populate("users", "-password");
//   console.log("added");
//   // .populate("groupAdmin","-password");
//   if (!added) {
//     res.status(404);
//     throw new Error("chat not found");
//   } else {
//     // res.json(added);

//     res.status(200).send(added);
//   }
// });
const removeInterestChat = asyncHandler(async (req, res) => {
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
  createInterestChat,
  renameInterestChat,
  joinInterestChat,
  removeInterestChat,
  fetchAllInterestChat,
};
