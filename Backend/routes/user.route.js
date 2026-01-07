import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  refreshToken,
  logoutUser
} from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.get("/me", auth, getProfile);
router.post("/logout", auth, logoutUser);


export default router;
