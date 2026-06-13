import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filePath, fileName, mediaType, directory) => {
  try {
    const data = await cloudinary.uploader.upload(filePath, {
      public_id: `${directory}/${fileName.replace(/\.[^/.]+$/, "")}`,
      resource_type: "auto",
    });
    fs.rm(filePath, (err) => { if (err) console.error(err); });
    return data.secure_url;
  } catch (err) {
    console.error(`Error uploading file to Cloudinary: ${err}`);
    throw err;
  }
};