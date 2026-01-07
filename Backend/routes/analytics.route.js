import express from "express";
import { adminOverview } from "../controllers/analytics.controller.js";
import { auth } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";

const router = express.Router();

/* ADMIN DASHBOARD */
router.get("/admin-overview", auth, adminOnly, adminOverview);

export default router;
