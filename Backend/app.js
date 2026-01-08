import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler.js";
import categoryRoutes from "./routes/category.route.js";
import ebookRoutes from "./routes/ebook.route.js";
import ebookUploadRoutes from "./routes/ebookUpload.route.js";
import ebookAccessRoutes from "./routes/ebookAccess.route.js";
import ebookStreamRoutes from "./routes/ebookStream.route.js";
import analyticsRoutes from "./routes/analytics.route.js";



const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);
app.use(express.json());
app.use(morgan("combined"));

/* ✅ HOME / HEALTH CHECK */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Readora backend is running",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/ebooks", ebookRoutes);
app.use("/api/ebooks", ebookUploadRoutes);
app.use("/api/ebooks", ebookAccessRoutes);
app.use("/api/ebooks", ebookStreamRoutes);
app.use("/api/analytics", analyticsRoutes);



//must be last
app.use(errorHandler);

export default app;
