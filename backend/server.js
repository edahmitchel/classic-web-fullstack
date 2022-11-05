const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data");
const connection = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
dotenv.config();
connection();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.get("/api/chat/:id", (req, res) => {
  console.log(req.params.id);
  cons;
});
app.use("/api/users", userRoutes);
app.use(notFound); //handle wrong routes
app.use(errorHandler);
const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`running at port ${PORT}`));
