import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
dotenv.config();

(async function () {

    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

})();

/**
 * Uploads a local video file to Cloudinary.
 * @param {string} localVideoPath - Full path to the local video file.
 * @param {string} userId - MongoDB user ID to tag the upload.
 * @returns {string} Cloudinary video URL
 */

 export const uploadRecordingToCloudinary = async (localVideoPath, userId) => {
        try {
            // Upload local video file
            const uploadResult = await cloudinary.uploader.upload(localVideoPath, {
                resource_type: 'video',
                folder: 'recap_ai_recordings',
                public_id: `recap_user_${userId}_${Date.now()}`
            });

            // Delete local video file after upload
            fs.unlinkSync(localVideoPath);

            return uploadResult.secure_url; // 🌐 Final Cloudinary URL
        } catch (err) {
            console.error("❌ Cloudinary upload failed:", err);
            throw err;
        }
    };

export const getVideoDuration = (filePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) return reject(err);
      const duration = Math.floor(metadata.format.duration); // seconds
      resolve(duration);
    });
  });
};
