const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");

// ✅ Load .env correctly
require("dotenv").config({ path: __dirname + "/.env" });

const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Root route
app.get("/", (_req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Test route
app.get("/ping", (_req, res) => {
  return res.json({ msg: "Ping Successful" });
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Debug (check env loading)
console.log("MONGO_URI:", process.env.MONGO_URI);

// ✅ MongoDB Connection (FIXED)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connection Successful ✅");
  })
  .catch((err) => {
    console.log("Mongo Error:", err.message);
  });

// ✅ Port setup
const PORT = process.env.PORT || 5000;

// ✅ Start server
const server = app.listen(PORT, () => {
  console.log(`Server started on ${PORT} 🚀`);
});

// ✅ Socket.io setup
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

// ✅ Socket logic
global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);

    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});