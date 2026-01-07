import cloudinary from "../config/cloudinary.js";

/**
 * @param {Buffer} fileBuffer
 * @param {string} folder
 * @param {"raw" | "image" | "video"} resourceType
 * @param {"upload" | "private"} deliveryType
 */
export const uploadToCloudinary = (
  fileBuffer,
  folder,
  resourceType = "raw",
  deliveryType = "private"
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: resourceType,
          type: deliveryType
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(fileBuffer);
  });
};
