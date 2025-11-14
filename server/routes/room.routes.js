import express from "express";
import { createRoom, getAllRooms } from "../controllers/roomController.js";
import { isAdmin, isLoggedIn } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", isLoggedIn,isAdmin, createRoom);
router.get("/getAllRooms", getAllRooms);

export default router;
