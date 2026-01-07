import Ebook from "../models/ebook.model.js";
import { uploadToCloudinary } from "../services/fileUpload.service.js";
import { getEbookFormat } from "../utils/fileFormat.js";

/* =======================
   SINGLE EBOOK UPLOAD
   (ADMIN ONLY)
   ======================= */
export const uploadSingleEbook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      category,
      language = "en",
      tags = [],
      access = "free",
      status = "published"
    } = req.body;

    /* ================= VALIDATION ================= */
    if (!title || !author || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, author and category are required"
      });
    }

    /* ================= FILES ================= */
    const ebookFile = req.files?.ebook?.[0];
    const coverImageFile = req.files?.coverImage?.[0];

    if (!ebookFile) {
      return res.status(400).json({
        success: false,
        message: "Ebook file (PDF or EPUB) is required"
      });
    }

    /* ================= EBOOK FILE ================= */
    const format = getEbookFormat(ebookFile);
    if (!format) {
      return res.status(400).json({
        success: false,
        message: "Unsupported ebook format"
      });
    }

    const uploadedEbook = await uploadToCloudinary(
      ebookFile.buffer,
      "ebooks/files",
      "raw",
      "private"
    );

    /* ================= COVER IMAGE (OPTIONAL) ================= */
    let coverImage;

    if (coverImageFile) {
      const uploadedCover = await uploadToCloudinary(
        coverImageFile.buffer,
        "ebooks/covers",
        "image",
        "upload"
      );

      coverImage = {
        publicId: uploadedCover.public_id,
        url: uploadedCover.secure_url
      };
    }

    /* ================= CREATE EBOOK ================= */
    const ebook = await Ebook.create({
      title: title.trim(),
      author: author.trim(),
      description,
      category,
      language,
      tags: Array.isArray(tags) ? tags : [tags],
      access,
      status,
      uploadedBy: req.user._id,
      file: {
        publicId: uploadedEbook.public_id,
        format,
        size: uploadedEbook.bytes
      },
      coverImage
    });

    return res.status(201).json({
      success: true,
      message: "Ebook uploaded successfully",
      data: ebook
    });
  } catch (error) {
    console.error("UPLOAD_EBOOK_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to upload ebook"
    });
  }
};

/* =======================
   BULK EBOOK UPLOAD
   (ADMIN ONLY)
   ======================= */
export const bulkUploadEbooks = async (req, res) => {
  try {
    const {
      author,
      category,
      language = "en",
      access = "free"
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No ebook files uploaded"
      });
    }

    const results = [];

    for (const file of req.files) {
      try {
        const format = getEbookFormat(file);
        if (!format) {
          throw new Error("Unsupported ebook format");
        }

        const uploaded = await uploadToCloudinary(
          file.buffer,
          "ebooks/bulk"
        );

        const ebook = await Ebook.create({
          title: file.originalname.replace(/\.(pdf|epub)$/i, ""),
          author,
          category,
          language,
          access,
          uploadedBy: req.user._id,
          file: {
            publicId: uploaded.public_id,
            format,
            size: uploaded.bytes
          }
        });

        results.push({
          success: true,
          ebook
        });
      } catch (err) {
        results.push({
          success: false,
          file: file.originalname,
          error: err.message
        });
      }
    }

    return res.status(207).json({
      success: true,
      message: "Bulk upload completed",
      results
    });
  } catch (error) {
    console.error("BULK_UPLOAD_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Bulk upload failed"
    });
  }
};
