import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const port = 3000;
const secretKeyJWT = "klhskfhspofsnf";

const app = express();
const server = new createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// app.use(cors())
app.get("/", (req, res) => {
  res.send("App is running");
});
app.get("/login", (req, res) => {
  const token = jwt.sign({ _id: "adosfhbsflkf." }, secretKeyJWT);
  res
    .cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
    .json({ success: true, message: "Login Success" });
});

const user = false;

io.use((socket, next) => {
  // next()

  cookieParser()(socket.request, socket.request.res, (err) => {
    if (err) return next(err);
    const token = socket.request.cookies.token;

    if (!token) return new Error("Authentication Error");
    const decoded = jwt.verify(token, secretKeyJWT);
console.log(decoded)
    next();
  });
});

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("message", (data) => {
    console.log(data);

    io.to(data.room).emit("received-message", data);
  });

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`${socket.id} joined the room`);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} user disconnected`);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
