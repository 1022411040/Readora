import Ebook from "../models/ebook.model.js";

export const accessEbook = async (req, res) => {
  const ebook = await Ebook.findById(req.params.id);

  if (!ebook || ebook.status !== "published") {
    return res.status(404).json({ message: "Ebook not found" });
  }

  // Admin override / access control
  if (req.user.role !== "admin" && ebook.access !== "free") {
    return res.status(403).json({ message: "Access denied" });
  }

  // analytics
  ebook.stats.views += 1;
  await ebook.save();

  // ⛔ DO NOT generate Cloudinary URL here
  res.json({
    title: ebook.title,
    format: ebook.file.format,
    streamUrl: `/api/ebooks/${ebook._id}/stream`
  });
};
