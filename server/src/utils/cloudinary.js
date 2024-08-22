import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const type = localFilePath.endsWith('.pdf') ? 'raw' : 'image';
        
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: type, 
            pages: type === 'raw' ? true : false,
        });

        console.log("File uploaded to Cloudinary:", response.url);
        fs.unlinkSync(localFilePath); 
        return response;

    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        fs.unlinkSync(localFilePath); 
        return null;
    }
};

export { uploadOnCloudinary };