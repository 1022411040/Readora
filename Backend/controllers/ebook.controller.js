import Ebook from "../models/ebook.model.js";

/* =========================
   CREATE EBOOK METADATA
   (ADMIN – OPTIONAL FLOW)
   ========================= */
/*
  ⚠️ RECOMMENDED:
  Use uploadSingleEbook instead.
  This is kept only if you want
  metadata-first workflows.
*/
export const createEbook = async (req, res) => {
  const {
    title,
    author,
    description,
    category,
    language,
    tags,
    access,
    status
  } = req.body;

  if (!title || !author || !category) {
    return res.status(400).json({
      success: false,
      message: "Title, author, and category are required"
    });
  }

  const ebook = await Ebook.create({
    title: title.trim(),
    author: author.trim(),
    description,
    category,
    language,
    tags,
    access,
    status,
    uploadedBy: req.user._id,
    file: {
      publicId: "PENDING_UPLOAD",
      format: "pdf"
    }
  });

  res.status(201).json({
    success: true,
    message: "Ebook metadata created",
    data: ebook
  });
};

/* =========================
   LIST EBOOKS
   ========================= */
export const listEbooks = async (req, res) => {
  const filter =
    req.user.role === "admin"
      ? {}
      : { status: "published", access: "free" };

  const ebooks = await Ebook.find(filter)
    .populate("category", "name slug")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: ebooks
  });
};

/* =========================
   GET SINGLE EBOOK
   ========================= */
export const getEbook = async (req, res) => {
  const ebook = await Ebook.findById(req.params.id)
    .populate("category", "name slug");

  if (!ebook) {
    return res.status(404).json({
      success: false,
      message: "Ebook not found"
    });
  }

  // Non-admins cannot see unpublished or restricted ebooks
  if (
    req.user.role !== "admin" &&
    (ebook.status !== "published" || ebook.access !== "free")
  ) {
    return res.status(403).json({
      success: false,
      message: "Access denied"
    });
  }

  res.json({
    success: true,
    data: ebook
  });
};

/* =========================
   UPDATE EBOOK (ADMIN)
   ========================= */
export const updateEbook = async (req, res) => {
  const {
    title,
    author,
    description,
    category,
    language,
    tags,
    access,
    status
  } = req.body;

  if (
    title === undefined &&
    author === undefined &&
    description === undefined &&
    category === undefined &&
    language === undefined &&
    tags === undefined &&
    access === undefined &&
    status === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "No fields provided to update"
    });
  }

  const ebook = await Ebook.findById(req.params.id);
  if (!ebook) {
    return res.status(404).json({
      success: false,
      message: "Ebook not found"
    });
  }

  if (title !== undefined) ebook.title = title.trim();
  if (author !== undefined) ebook.author = author.trim();
  if (description !== undefined) ebook.description = description;
  if (category !== undefined) ebook.category = category;
  if (language !== undefined) ebook.language = language;
  if (tags !== undefined) ebook.tags = tags;
  if (access !== undefined) ebook.access = access;
  if (status !== undefined) ebook.status = status;

  await ebook.save();

  res.json({
    success: true,
    message: "Ebook updated successfully",
    data: ebook
  });
};

/* =========================
   ARCHIVE EBOOK (ADMIN)
   ========================= */
export const archiveEbook = async (req, res) => {
  const ebook = await Ebook.findById(req.params.id);
  if (!ebook) {
    return res.status(404).json({
      success: false,
      message: "Ebook not found"
    });
  }

  ebook.status = "archived";
  await ebook.save();

  res.json({
    success: true,
    message: "Ebook archived successfully"
  });
};
