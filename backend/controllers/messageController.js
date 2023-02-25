const asyncHandler = require("express-async-handler");
const { Error } = require("mongoose");
const { AnonymousId } = require("../models/anonymousIdModel");

const Chat = require("../models/chatModel");

const Message = require("../models/messageModel");
const { User } = require("../models/userModel");
const { generateUniqueId } = require("./anonymousIdController");

// const generateRandomAlphaNumeric = () => {
//   const prefix = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
//   const suffix = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
//   const randomPrefix = prefix[Math.floor(Math.random() * prefix.length)];
//   const randomSuffix = suffix[Math.floor(Math.random() * suffix.length)];
//   return `${randomPrefix}${randomSuffix}`;
// };

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(400).json({
      status: "error",
    });
  }

  try {
    // Find or create the anonymousId document
    let anonymousId = await AnonymousId.findOne({
      user: req.user._id,
      chat: chatId,
    });

    if (!anonymousId) {
      // Create a new anonymousId document with a unique id
      const newAnonymousId = new AnonymousId({
        user: req.user._id,
        chat: chatId,
        anonymousId: generateUniqueId(),
      });

      anonymousId = await newAnonymousId.save(); // Save the new document to the database
    }

    // Create a new Message document with references to the sender, chat, and anonymousId documents
    const newMessage = {
      sender: req.user._id,
      content,
      chat: chatId,
      anonymousId: anonymousId._id, // Use the _id field of the anonymousId document
    };

    let message = await Message.create(newMessage); // Save the new document to the database

    // Populate the sender, chat, and anonymousId fields of the message document with the corresponding documents
    message = await Message.findOne({ _id: message._id })
      .populate("sender", "username pic")
      .populate({
        path: "chat",
        select: "chatName isGroupChat users",
        model: "Chat",
        populate: {
          path: "users",
          select: "username pic email",
          model: "User",
        },
      })
      .populate("anonymousId");

    // Update the latestMessage field of the Chat document with the saved message
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });

    res.json(message); // Send the saved message in the response
  } catch (error) {
    throw new Error(error.message);
  }
});

// const sendMessage = asyncHandler(async (req, res) => {
//   console.log("i got here");
//   const { content, chatId } = req.body;
//   console.log(content, chatId);
//   if (!content || !chatId) {
//     return res.status(400).json({
//       status: "error",
//     });
//   }
//   var newMessage = { sender: req.user._id, content: content, chat: chatId };

//   try {
//     let message = await Message.create(newMessage);
//     newmessage = await Message.findOne({ _id: message._id })
//       .populate("sender", "username pic")
//       .populate({
//         path: "chat",
//         select: "chatName isGroupChat users",
//         model: "Chat",
//         populate: {
//           path: "users",
//           select: "username pic email",
//           model: "User",
//         },
//       });

//     // message = await message.populate("sender", "username pic")
//     // message = await message.populate("chat")
//     // message = await User.populate(message, {
//     //   path: "chat.users",
//     //   select: "username pic email",
//     // });
//     await Chat.findByIdAndUpdate(req.body.chatId, {
//       latestMessage: newmessage,
//     });
//     console.log(newMessage)
//     res.json(newmessage);
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });
const allMessage = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "username pic")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessage, sendMessage };
