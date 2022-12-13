const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data");
const connection = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
dotenv.config();
connection();
app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("hello world");
// });
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.get("/api/chat/:id", (req, res) => {
  console.log(req.params.id);
  cons;
});
app.use("/api/users", userRoutes);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

// const server = app.listen(PORT, console.log(`running at port ${PORT}`));
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: [
      "http://localhost:3000",
      "http://192.168.0.144:3000",
      "https://192.168.0.144:3000",
      "https://classic-web-chat.herokuapp.com",
      "http://classic-web-chat.herokuapp.com",
      "classic-web-chat.herokuapp.com",
      "https://classic-web.netlify.app",
      "http://classic-web.netlify.app",
    ],
  },
});
io.on("connection", (socket) => {
  console.log("a user connected to socket ");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    console.log(userData.username + " is connected to socket");
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room" + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  socket.on("new message", (newMessageRecieved) => {
    // console.log("new message", newMessageRecieved);
    "in new message recieved";
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat users not defined");
    chat.users.forEach((user) => {
      console.log(user);
      if (user._id === newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
    // socket.on("disconnect", () => {
    //   console.log("user disconnected");
  });
  socket.off("setup", () => {
    console.log("user disconnected");
    socket.leave(userData._id);
  });
});
// ------ deployment--------
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log("Server Work in ", PORT);
});
