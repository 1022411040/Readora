import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  /* ================= EBOOK FILE ================= */
  if (file.fieldname === "ebook") {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/epub+zip"
    ) {
      return cb(null, true);
    }
    return cb(new Error("Only PDF or EPUB allowed"), false);
  }

  /* ================= COVER IMAGE ================= */
  if (file.fieldname === "coverImage") {
    if (file.mimetype.startsWith("image/")) {
      return cb(null, true);
    }
    return cb(new Error("Only image files allowed"), false);
  }

  /* ================= UNKNOWN FIELD ================= */
  return cb(
    new Error(`Unexpected file field: ${file.fieldname}`),
    false
  );
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  },
  fileFilter
});
