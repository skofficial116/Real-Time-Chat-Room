import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      console.log("Token not found");
      return res.status(401).json({
        success: false,
        message: "Token not found. Please Login.",
      });
    }
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Auth Middleware.",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded)
    const user = await User.findById(decoded.id);

    if (user.role !== "admin") {
      console.log("Unauthorized Access");
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access. Only admins can access this page.",
      });
    }

    next();
  } catch (error) {}
};
