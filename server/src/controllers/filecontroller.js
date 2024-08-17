import File from '../models/filemodel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import fs from 'fs/promises'; 

const FileUpload = async (req, res) => {
    try {
        const file = req.files?.file?.[0];

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const fileType = file.mimetype.split('/')[0];

        if (fileType !== 'image' && fileType !== 'application') {
            return res.status(400).json({ message: "Invalid file type." });
        }

        const uploadResult = await uploadOnCloudinary(file.path, fileType);

        const newFile = new File({
            name: file.originalname,
            url: uploadResult.url,
            type: file.mimetype,
            size: file.size,
        });

        await newFile.save();

        await fs.unlink(file.path);

        return res.status(201).json({ file: newFile, message: "File uploaded successfully" });

    } catch (error) {
        return res.status(500).json({ message: "error occurred while uploading the file", error });
    }
};


const getAllFiles = async (req, res) => {
    try {
        const files = await File.find();

        if (files.length === 0) {
            return res.status(404).json({ message: "No files found" });
        }

        return res.status(200).json({ files, message: "Files retrieved successfully" });

    } catch (error) {
        return res.status(500).json({ message: " error occurred while retrieving files", error: error.message });
    }
};

export { getAllFiles , FileUpload};

