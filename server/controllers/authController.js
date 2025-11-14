import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  try {
    if (req.userId) {
      let user = await User.findById(req.userId);
      return res.status(200).json({
        success: true,
        message: "Login Success",
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          memberSince: user.createdAt,
        },
      });
    }
    console.log(req.body.user);
    const email = req.body?.user?.email || null;
    const password = req.body?.user?.password || null;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email field is empty" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password field is empty" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid userName. Pls SignUp first, if not done!",
      });
    }

    const isCorrect = await user.comparePassword(password);
    if (!isCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password." });
    }

    const token = user.getJWTToken();

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "Login Success",
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          memberSince: user.createdAt,
        },
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body?.user?.email || null;
    const password = req.body?.user?.password || null;
    const name = req.body?.user?.name || null;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email field is empty" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password field is empty" });
    }
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name field is empty" });
    }

    const user = await User.find({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exist" });
    }
    user = await User.create({ email, name, password });

    if (!user) {
      console.log("User creation failed.");
      return res.status(500).json({
        success: false,
        message: "User creation failed. Try Again.",
      });
    }

    res.status(200).json({
      success: true,
      message: `Welcome ${name}, Kindly LogIn to continue.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
