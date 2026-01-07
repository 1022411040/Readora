import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from "../controllers/category.controller.js";
import { auth } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";

const router = express.Router();

router.get("/", getCategories);

router.post("/", auth, adminOnly, createCategory);
router.put("/:id", auth, adminOnly, updateCategory);
router.delete("/:id", auth, adminOnly, deleteCategory);

export default router;
