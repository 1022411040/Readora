import User from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken
} from "../utils/generateToken.js";

/* REGISTER */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    const user = await User.create({ name, email, password });

    const accessToken = generateAccessToken({ id: user._id });
    const refreshToken = generateRefreshToken({ id: user._id });

    user.refreshTokenHash = user.hashToken(refreshToken);
    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: err.message
    });
  }
};

/* LOGIN */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password +refreshTokenHash");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const accessToken = generateAccessToken({ id: user._id });
    const refreshToken = generateRefreshToken({ id: user._id });

    user.refreshTokenHash = user.hashToken(refreshToken);
    user.lastLogin = new Date();
    await user.save();

    res.json({
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: err.message
    });
  }
};

/* REFRESH TOKEN */
export const refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({ success: false, message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id).select("+refreshTokenHash");

    if (!user || user.hashToken(token) !== user.refreshTokenHash) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const newAccessToken = generateAccessToken({ id: user._id });

    res.json({
      success: true,
      message: "Token refreshed",
      data: { accessToken: newAccessToken }
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Invalid refresh token"
    });
  }
};

/* PROFILE */
export const getProfile = async (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      createdAt: req.user.createdAt
    }
  });
};

/* LOGOUT */
export const logoutUser = async (req, res) => {
  try {
    // invalidate refresh token
    req.user.refreshTokenHash = null;
    await req.user.save();

    res.json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: err.message
    });
  }
};
