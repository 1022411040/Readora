import express from "express";
import { auth } from "../middleware/auth.js";
import { accessEbook } from "../controllers/ebookAccess.controller.js";

const router = express.Router();

router.get("/:id/access", auth, accessEbook);

export default router;
