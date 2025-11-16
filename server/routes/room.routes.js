import express from "express";
import { createRoom, getAllRooms,getRoomByID } from "../controllers/roomController.js";
import { isAdmin, isLoggedIn } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", isLoggedIn, isAdmin, createRoom);
router.get("/getAllRooms", isLoggedIn, getAllRooms);
router.get("/getRoomByID/:id", isLoggedIn, getRoomByID);

export default router;
