import User from "../models/user.model.js";
import Ebook from "../models/ebook.model.js";

/* =========================
   ADMIN DASHBOARD OVERVIEW
   ========================= */
export const adminOverview = async (req, res) => {
  try {
    // Only admin safeguard (extra layer)
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required"
      });
    }

    const [
      totalUsers,
      totalEbooks,
      totalViews
    ] = await Promise.all([
      User.countDocuments({ isActive: true }),
      Ebook.countDocuments({}),
      Ebook.aggregate([
        {
          $group: {
            _id: null,
            views: { $sum: "$stats.views" }
          }
        }
      ])
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalEbooks,
        totalUploads: totalEbooks,
        totalViews: totalViews[0]?.views || 0
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin overview",
      error: err.message
    });
  }
};
