import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import connectDatabase from "./configs/db.js";
import dotenv from "dotenv";
import cors from "cors";


import messageRouter from "./routes/message.routes.js";
import authRouter from "./routes/auth.routes.js";
import roomRouter from "./routes/room.routes.js";
import Room from "./models/Rooms.js";
import Message from "./models/Message.js";

const port = 3000;
dotenv.config({ path: "./.env" });

connectDatabase();

const app = express();
const server = new createServer(app);
const io = new Server(server, {
  cors: {
    // origin: "*",
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// app.use(cors())
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

io.use((socket, next) => {
  next();

  // cookieParser()(socket.request, socket.request.res, (err) => {
  //   if (err) return next(err);
  //   const token = socket.request.cookies.token;

  //   if (!token) return new Error("Authentication Error");
  //   const decoded = jwt.verify(token, secretKeyJWT);
  //   console.log(decoded);
  //   next();
  // });
});

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("message", async (data) => {
    // data = { message: "", room: "", user: "" }

    const newMessage = await Message.create({
      message: data.message,
      room: data.room,
      user: data.user,
    });

    const messages = await Message.find({ room: data.room });

    io.to(data.room).emit("received-message", messages);
  });

  socket.on("join-room", async (roomId) => {
    const room = await Room.findById(roomId);

    if (room) {
      socket.join(roomId); // Join room by ID
      socket.currentRoom = roomId; // Track the room

      room.activeMembers += 1;
      await room.save();

      console.log(`${socket.id} joined room ${roomId}`);
    }
  });

  socket.on("leave-room", async () => {
    const roomId = socket.currentRoom;
    if (!roomId) return;

    const room = await Room.findById(roomId);
    if (room) {
      socket.leave(roomId);
      room.activeMembers -= 1;
      await room.save();

      console.log(`${socket.id} left room ${roomId}`);
    }

    socket.currentRoom = null;
  });

  socket.on("disconnect", async () => {
    console.log(`${socket.id} disconnected`);

    // Handle auto-leave when disconnecting
    const roomId = socket.currentRoom;
    if (roomId) {
      const room = await Room.findById(roomId);
      if (room) {
        room.activeMembers -= 1;
        await room.save();

        console.log(`${socket.id} auto-left room ${roomId}`);
      }
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
