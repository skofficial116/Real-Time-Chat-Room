// import User from "../models/User";
import Room from "../models/Rooms.js";
import Message from "../models/Message.js";

export const sendMessage = async (req, res, next) => {
  try {
    const message = req.body?.message || null;
    const room = req.body?.room || null;
    const user = req?.user || null;

    if (!message) {
      return res
        .status(400)
        .json({ success: false, message: "Message field is empty" });
    }
    if (!room) {
      return res.status(400).json({ success: false, message: "Room field is empty" });
    }
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found." });
    }

    const newMessage = await Message.create({ message, room, user });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.log(error);
    // throw new Error("Error while creating message: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getRoomMessages = async (req, res, next) => {
  try {
    const roomId = req.params.id;

    if (!roomId) {
      return res.status(400).json({ success: false, message: "RoomId is missing." });
    }

    const room = Room.findById(roomId);

    if (!room) {
      return res.status(400).json({ success: false, message: "RoomId is invalid" });
    }

    const messages = await Message.find({ room: roomId }).limit(10);

    return res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      messages: messages,
    });
  } catch (error) {
    console.log(error);
    // throw new Error("Error while creating message: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

