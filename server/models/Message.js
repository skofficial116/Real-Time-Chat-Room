import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  msg: {
    type: String,
    required: [true, "Message cannot be empty"],
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  roomId: {
    type: mongoose.Schema.ObjectId,
    ref: "Room",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
