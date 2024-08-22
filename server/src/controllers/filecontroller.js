import File from '../models/filemodel.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebase.js';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

const compressImage = async (filePath) => {
    const compressedPath = path.join(path.dirname(filePath), `compressed-${path.basename(filePath)}`);
    await sharp(filePath)
        .resize({ width: 1920 })
        .jpeg({ quality: 40 })
        .toFile(compressedPath);
    return compressedPath;
};

const compressPDFWithGhostscript = async (inputPath, outputPath) => {
    const command = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputPath} ${inputPath}`;
    await execPromise(command);
    return outputPath;
};

const uploadFileToFirebase = async (filePath, originalName) => {
    const fileRef = ref(storage, originalName);
    const fileData = fs.readFileSync(filePath);
    await uploadBytes(fileRef, fileData);
    return getDownloadURL(fileRef);
};

const FileUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        const file = req.file;
        let { originalname: name, mimetype: type, size } = file;
        let filePath = file.path;
        let compressedFilePath = filePath;

        if (type === 'application/pdf') {
            const outputPath = path.join(path.dirname(filePath), `compressed-${path.basename(filePath)}`);
            compressedFilePath = await compressPDFWithGhostscript(filePath, outputPath);
            size = fs.statSync(compressedFilePath).size;
        } else if (type.startsWith('image/')) {
            compressedFilePath = await compressImage(filePath);
            size = fs.statSync(compressedFilePath).size;
        }

        const url = await uploadFileToFirebase(compressedFilePath, name);
        const newFile = new File({
            name,
            url,
            size,
            contentType: type,
        });

        await newFile.save();

        return res.status(201).json({ message: 'File uploaded and compressed successfully.', file: newFile });
    } catch (error) {
        console.error('Error uploading and compressing file:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};


const getAllFiles = async (req, res) => {
    try {
        const files = await File.find();

        res.status(200).json({ files: files, message: "Files retrieved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve files" });
    }
};

export { FileUpload, getAllFiles };
