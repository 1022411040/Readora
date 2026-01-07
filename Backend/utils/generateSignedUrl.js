import cloudinary from "../config/cloudinary.js";

export const generateSignedEbookUrl = (publicId, expiresIn = 300) => {
  const expiresAt = Math.floor(Date.now() / 1000) + expiresIn;

  return cloudinary.utils.private_download_url(
    publicId,
    "",
    {
      resource_type: "raw",
      expires_at: expiresAt
    }
  );
};
