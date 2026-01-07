import mongoose from "mongoose";

/*
  Ebook Schema
  - Only ADMIN users can upload
  - Files are PRIVATE (no URLs exposed)
  - Search + analytics ready
*/

const ebookSchema = new mongoose.Schema(
  {
    /* ================= CORE INFO ================= */

    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    author: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    language: {
      type: String,
      default: "en",
      index: true
    },

    /* ================= CLASSIFICATION ================= */

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true
    },

    tags: {
      type: [String],
      default: [],
      index: true
    },

    /* ================= MEDIA ================= */

    coverImage: {
      publicId: {
        type: String
      },
      url: {
        type: String
      }
    },

    /* PRIVATE ebook file (PDF / EPUB) */
    file: {
      publicId: {
        type: String,
        required: true
      },
      format: {
        type: String,
        enum: ["pdf", "epub"],
        required: true
      },
      size: {
        type: Number // bytes
      },
      pageCount: {
        type: Number
      }
    },

    /* ================= PREVIEW ================= */

    preview: {
      enabled: {
        type: Boolean,
        default: true
      },
      pages: {
        type: Number,
        default: 5
      }
    },

    /* ================= ACCESS CONTROL ================= */

    access: {
      type: String,
      enum: ["free", "semi", "restricted"],
      index: true
    },

    /* ================= LIFECYCLE ================= */

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
      index: true
    },

    /* ================= OWNERSHIP ================= */

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true
    },

    /* ================= ANALYTICS ================= */

    stats: {
      views: {
        type: Number,
        default: 0
      },
      downloads: {
        type: Number,
        default: 0
      }
    }
  },
  {
    timestamps: true
  }
);

/* ================= TEXT SEARCH INDEX ================= */

ebookSchema.index(
  {
    title: "text",
    author: "text",
    description: "text",
    tags: "text"
  },
  {
    weights: {
      title: 5,
      author: 4,
      tags: 3,
      description: 1
    }
  }
);

/* ================= ADMIN-ONLY UPLOAD ENFORCEMENT ================= */

ebookSchema.pre("save", async function () {
  const User = mongoose.model("User");

  const uploader = await User.findById(this.uploadedBy).select("role");
  if (!uploader || uploader.role !== "admin") {
    throw new Error("Only admin users can upload ebooks");
  }
});

/* ================= EXPORT ================= */

export default mongoose.model("Ebook", ebookSchema);
