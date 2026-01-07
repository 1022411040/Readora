import Category from "../models/category.model.js";
import Ebook from "../models/ebook.model.js"; // <-- ADD THIS


/* =========================
   CREATE CATEGORY (ADMIN)
   ========================= */
export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Category name is required"
    });
  }

  const normalizedName = name.trim();
  const slug = normalizedName.toLowerCase().replace(/\s+/g, "-");

  const exists = await Category.findOne({ slug });
  if (exists) {
    return res.status(409).json({
      success: false,
      message: "Category already exists"
    });
  }

  const category = await Category.create({
    name: normalizedName,
    slug,
    description
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category
  });
};

/* =========================
   GET ALL ACTIVE CATEGORIES
   ========================= */
export const getCategories = async (req, res) => {
  const categories = await Category.find({ isActive: true })
    .sort({ name: 1 })
    .select("name slug description");

  res.json({
    success: true,
    data: categories
  });
};

/* =========================
   UPDATE CATEGORY (ADMIN)
   ========================= */
export const updateCategory = async (req, res) => {
  const { name, description, isActive } = req.body;

  if (
    name === undefined &&
    description === undefined &&
    isActive === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "No fields provided to update"
    });
  }

  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found"
    });
  }

  /* Handle name + slug update safely */
  if (name !== undefined) {
    const normalizedName = name.trim();
    if (!normalizedName) {
      return res.status(400).json({
        success: false,
        message: "Category name cannot be empty"
      });
    }

    const newSlug = normalizedName.toLowerCase().replace(/\s+/g, "-");

    const slugExists = await Category.findOne({
      slug: newSlug,
      _id: { $ne: category._id }
    });

    if (slugExists) {
      return res.status(409).json({
        success: false,
        message: "Another category with this name already exists"
      });
    }

    category.name = normalizedName;
    category.slug = newSlug;
  }

  if (description !== undefined) {
    category.description = description;
  }

  if (isActive !== undefined) {
    category.isActive = isActive;
  }

  await category.save();

  res.json({
    success: true,
    message: "Category updated successfully",
    data: category
  });
};

/* =========================
   DELETE CATEGORY (SOFT)
   ========================= */
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    // 🔒 CHECK: Is category used by any ebook?
    const linkedEbooksCount = await Ebook.countDocuments({
      category: category._id
    });

    if (linkedEbooksCount > 0) {
      return res.status(409).json({
        success: false,
        code: "CATEGORY_IN_USE",
        message: "Category is linked to existing ebooks",
        data: {
          linkedEbooksCount
        }
      });
    }

    // ✅ SAFE TO DISABLE
    category.isActive = false;
    await category.save();

    return res.json({
      success: true,
      message: "Category disabled successfully"
    });

  } catch (error) {
    console.error("Delete category error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting category"
    });
  }
};