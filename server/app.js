import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import connectDatabase from "./configs/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookie from "cookie";
import jwt from "jsonwebtoken";

import messageRouter from "./routes/message.routes.js";
import authRouter from "./routes/auth.routes.js";
import roomRouter from "./routes/room.routes.js";
import User from "./models/User.js";
import Room from "./models/Rooms.js";
import Message from "./models/Message.js";

const port = 3000;
dotenv.config({ path: "./.env" });

connectDatabase();

const app = express();
const server = new createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("App is running");
});

app.use("/messages", messageRouter);
app.use("/auth", authRouter);
app.use("/room", roomRouter);

io.use(async (socket, next) => {
  try {
    const cookies = cookie.parse(socket.request.headers.cookie || "");
    const token = cookies.token;
    if (!token) return next(new Error("Not authenticated"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return next(new Error("User not found"));

    socket.user = user;
    next();
  } catch (err) {
    console.log("Auth error:", err.message);
    next(new Error("Authentication Failed"));
  }
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id} (${socket.user.email})`);

  socket.on("join-room", async (roomId) => {
    try {
      const room = await Room.findById(roomId);
      if (!room) return;

      socket.join(roomId);
      socket.currentRoom = roomId;

      room.activeMembers += 1;
      await room.save();

      console.log(`${socket.user.email} joined room ${roomId}`);

      const messages = await Message.find({ room: roomId }).populate(
        "sender",
        "name email"
      );

      socket.emit("messages", messages);
    } catch (err) {
      console.log("Join room error:", err);
    }
  });

  socket.on("leave-room", async () => {
    try {
      const roomId = socket.currentRoom;
      if (!roomId) return;

      const room = await Room.findById(roomId);
      if (room) {
        socket.leave(roomId);
        room.activeMembers -= 1;
        if (room.activeMembers < 0) room.activeMembers = 0;
        await room.save();

        console.log(`${socket.user.email} left room ${roomId}`);
      }

      socket.currentRoom = null;
    } catch (err) {
      console.log("Leave room error:", err);
    }
  });

  socket.on("send-message", async ({ msg, roomId }) => {
    try {
      if (!msg?.trim()) return;

      const newMessage = await Message.create({
        msg,
        room: roomId,
        sender: socket.user._id,
      });

      const populated = await Message.find({ room: roomId }).populate([
        "sender",
        "room",
      ]);
      io.to(roomId).emit("messages", populated);
    } catch (err) {
      console.log("Message error:", err);
    }
  });

  socket.on("disconnect", async () => {
    try {
      const roomId = socket.currentRoom;

      if (roomId) {
        const room = await Room.findById(roomId);
        if (room) {
          room.activeMembers -= 1;
          if (room.activeMembers < 0) room.activeMembers = 0;
          await room.save();

          console.log(`${socket.user.email} auto-left room ${roomId}`);
        }
      }

      console.log(`${socket.user.email} disconnected`);
    } catch (err) {
      console.log("Disconnect error:", err);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
