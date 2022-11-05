const asyncHandler = require("express-async-handler");
const { Error } = require("mongoose");

const Chat = require("../models/chatModel");

const Message = require("../models/messageModel");
const { User } = require("../models/userModel");
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  console.log(content, chatId);
  if (!content || !chatId) {
    return res.status(400).json({
      status: "error",
    });
  }
  var newMessage = { sender: req.user._id, content: content, chat: chatId };
  try {
    let message = await Message.create(newMessage);
    newmessage = await Message.findOne({ _id: message._id })
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
      });

    // message = await message.populate("sender", "username pic")
    // message = await message.populate("chat")
    // message = await User.populate(message, {
    //   path: "chat.users",
    //   select: "username pic email",
    // });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: newmessage,
    });
    res.json(newmessage);
  } catch (error) {
    throw new Error(error.message);
  }
});
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
