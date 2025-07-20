import { v2 as cloudinary } from "cloudinary";
import { createError, createMessage } from "../utils/createMessage.js";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const cloudinaryImageUploadMethod = async (file, config, expressRes) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.tempFilePath, config, (err, cloudinaryRes) => {
      if (err) {
        createError(expressRes, 500, "Upload image error");
        return reject(err);
      }
      resolve(cloudinaryRes.secure_url);
    });
  });
};

export default {
  // Upload image controller
  uploadImage: async (req, res) => {
    try {
      const files = req.files.photos;
      const urls = [];

      if (!files) {
        return createError(res, 400, "No files were uploaded.");
      }

      // Handle array of files
      if (Array.isArray(files)) {
        for (const file of files) {
          const newPath = await cloudinaryImageUploadMethod(file, { folder: "photos" }, res);
          urls.push(newPath);
        }
      } else {
        // Single file upload
        const newPath = await cloudinaryImageUploadMethod(files, { folder: "photos" }, res);
        urls.push(newPath);
      }

      return res.status(200).json({ url: urls });
    } catch (err) {
      console.error("Upload failed:", err.message || err);
      return createError(res, 500, "Failed to upload image(s)");
    }
  },

  // Delete image controller
  deleteImage: async (req, res) => {
    try {
      const { url } = req.body;

      if (!url || url.length < 1) {
        return createError(res, 400, "Invalid URL");
      }

      // Extract Cloudinary public_id from URL
      const public_id = url
        .substring(url.substring(1, url.lastIndexOf('/')).lastIndexOf('/') + 2, url.lastIndexOf('.'));

      const { result } = await cloudinary.uploader.destroy(public_id);

      if (result === "not found") {
        return createError(res, 404, "Image not found in Cloudinary");
      }

      return createMessage(res, 200, "Image deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err.message || err);
      return createError(res, 500, "Failed to delete image");
    }
  },
};
