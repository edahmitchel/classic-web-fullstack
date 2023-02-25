const mongoose = require("mongoose");
const anonymousIdSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  anonymousId: {
    type: String,
    required: true,
    unique: true,
  },
});

const AnonymousId = mongoose.model("AnonymousId", anonymousIdSchema);
module.exports = { AnonymousId };
