import axios from "axios";
import Ebook from "../models/ebook.model.js";
import { generateSignedEbookUrl } from "../utils/generateSignedUrl.js";

export const streamEbook = async (req, res) => {
  const ebook = await Ebook.findById(req.params.id);
  if (!ebook) {
    return res.status(404).json({ message: "Ebook not found" });
  }

  // Access control
  if (req.user.role !== "admin" && ebook.access !== "free") {
    return res.status(403).json({ message: "Access denied" });
  }

  const signedUrl = generateSignedEbookUrl(
    ebook.file.publicId,
    300
  );

  const cloudinaryResponse = await axios.get(signedUrl, {
    responseType: "stream"
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline");

  cloudinaryResponse.data.pipe(res);
};
