import express from "express";
import { auth } from "../middleware/auth.js";
import { streamEbook } from "../controllers/ebookStream.controller.js";

const router = express.Router();

router.get("/:id/stream", auth, streamEbook);

export default router;
