const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data");
const app = express();
dotenv.config();
app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/api/chat", (req, res) => {
  res.send(chats);
});
app.get("/api/chat/:id", (req, res) => {
  console.log(req.params.id);
  cons;
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`running at port ${PORT}`));
