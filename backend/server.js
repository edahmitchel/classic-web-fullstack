const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data");
const connection = require("./config/db");
const userRoutes = require("./routes/userRoutes");
dotenv.config();
connection();
const app = express();
app.use(express.json());
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
app.use("/api/users", userRoutes);
const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`running at port ${PORT}`));
