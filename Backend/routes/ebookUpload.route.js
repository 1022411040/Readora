import express from "express";
import { auth } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";
import { upload } from "../middleware/multer.js";
import {
  uploadSingleEbook,
  bulkUploadEbooks
} from "../controllers/ebookUpload.controller.js";

const router = express.Router();

/* SINGLE */
router.post(
  "/upload",
  auth,
  adminOnly,
  upload.fields([
    { name: "ebook", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
  ]),
  uploadSingleEbook
);

/* BULK */
router.post(
  "/bulk-upload",
  auth,
  adminOnly,
  upload.array("ebooks", 20),
  bulkUploadEbooks
);

export default router;
