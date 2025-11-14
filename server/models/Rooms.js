import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter room name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  description: {
    type: String,
    default: "",
    maxLength: [100, "Room Description cannot exceed 100 characters"],
  },
  activeMembers: {
    type: Number,
    default: 0,
    min: [0, "Active members cannot be less than 0"],
  },
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
