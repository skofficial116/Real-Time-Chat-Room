// import User from "../models/User";
import Room from "../models/Rooms.js";

export const createRoom = async (req, res, next) => {
  try {
    const room = req.body?.roomName || null;
    const description = req.body?.description || null;

    if (!description) {
      return res
        .status(400)
        .json({ success: false, message: "Description field is empty" });
    }
    if (!room) {
      return res
        .status(400)
        .json({ success: false, message: "RoomName field is empty" });
    }

    const newRoom = await Room.create({ name: room, description });

    return res.status(200).json({
      success: true,
      message: `Room, named as ${room}, created successfully`,
    });
  } catch (error) {
    console.log(error);
    // throw new Error("Error while creating message: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find() ;

    return res.status(200).json({
      success: true,
      message: "Rooms fetched successfully",
      rooms: rooms || [],
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: error.message });
  }
};
