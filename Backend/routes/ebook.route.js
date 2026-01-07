import express from "express";
import {
  createEbook,
  listEbooks,
  getEbook,
  updateEbook,
  archiveEbook
} from "../controllers/ebook.controller.js";
import { auth } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";

const router = express.Router();

/* PUBLIC / USER */
router.get("/", auth, listEbooks);
router.get("/:id", auth, getEbook);

/* ADMIN */
router.post("/", auth, adminOnly, createEbook);
router.put("/:id", auth, adminOnly, updateEbook);
router.delete("/:id", auth, adminOnly, archiveEbook);

export default router;
