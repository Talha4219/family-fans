import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
/** * Uploads a file buffer to Cloudinary * @param buffer The file buffer (from FormData) * @param folder The folder in Cloudinary to store images * @returns The secure URL of the uploaded image */ export async function uploadToCloudinary(
  buffer: Buffer,
  folder: string = "FamilyFans-products",
): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else if (result) {
          resolve(result.secure_url);
        } else {
          reject(new Error("Unknown Cloudinary error"));
        }
      },
    );
    uploadStream.end(buffer);
  });
}
