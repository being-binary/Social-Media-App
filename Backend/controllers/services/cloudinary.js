import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

class CloudinaryUpload {
    constructor() {
        // Configure Cloudinary with environment variables
        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_API_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET // Ensure this matches your .env variable
        });
    }

    async uploadImages(files) {
        try {
            // Validate the files array
            if (!Array.isArray(files) || files.length === 0) {
                throw new Error('No files to upload.');
            }

            // Upload images asynchronously
            const uploaded = files.map((obj) => {
                return cloudinary.uploader.upload(obj.path, {
                    folder: process.env.CLOUDINARY_API_FOLDER, // Destination folder in Cloudinary
                    resource_type:'auto',
                });
            });

            // Wait for all uploads to resolve
            const results = await Promise.all(uploaded);
            // console.log('Uploaded files:', results); // Log the results
            return results;
        } catch (error) {
            console.error('Error uploading images:', error); // Handle errors gracefully
        }
    }
}

export default new CloudinaryUpload()
// Example usage
// const uploader = new CloudinaryUpload();
// uploader.uploadImages(fileArray); // Pass an array of file objects