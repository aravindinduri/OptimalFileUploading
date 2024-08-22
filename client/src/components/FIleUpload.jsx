import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
const [file, setFile] = useState(null);
const [message, setMessage] = useState('');
const [isLoading, setIsLoading] = useState(false);

const handleFileChange = (event) => {
    setFile(event.target.files[0]);
};

const handleUpload = async () => {
    if (!file) {
        setMessage('Please select a file first.');
        return;
    }

    setIsLoading(true);

    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('/api/v1/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setMessage(response.data.message);
    } catch (error) {
        setMessage(`Error: ${error.response?.data.message || error.message}`);
    } finally {
        setIsLoading(false); 
    }
};

    return (
<div className="container mx-auto p-4">
    <h2 className="text-2xl font-bold mb-4">Upload File</h2>
    <input 
        type="file" 
        onChange={handleFileChange} 
        className="mb-4 border border-gray-300 rounded p-2"
    />
    <button 
        onClick={handleUpload} 
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        disabled={isLoading} // Disable button during loading
    >
        {isLoading ? 'Uploading...' : 'Upload'}
    </button>
    {isLoading && (
        <div className="mt-4">
            <svg
                className="animate-spin h-5 w-5 text-blue-500 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
            </svg>
            <p className="text-center mt-2">Uploading...</p>
        </div>
    )}
    {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
    );
};

export default FileUpload;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { storage } from '../firebase';
// import imageCompression from 'browser-image-compression';

// function FileUpload() {
//     const [file, setFile] = useState(null);
//     const [message, setMessage] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [downloadURL, setDownloadURL] = useState('');

//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//     };

//     const compressImage = async (imageFile) => {
//         const options = {
//             maxSizeMB: 3,
//             maxWidthOrHeight: 1920,
//             useWebWorker: true,
//         };
//         try {
//             const compressedFile = await imageCompression(imageFile, options);
//             return compressedFile;
//         } catch (error) {
//             console.error('Error compressing image:', error);
//             setMessage('Error compressing image: ' + error.message);
//             return imageFile;
//         }
//     };

//     const uploadPDFToBackend = async (pdfFile) => {
//         const formData = new FormData();
//         formData.append('file', pdfFile);

//         try {
//             const response = await axios.post('/api/v1/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             }); 
//         } catch (error) {
//             console.error('Error uploading PDF:', error);
//         }
//     };

//     const handleUpload = async () => {
//         if (!file) {
//             setMessage('Please select a file first.');
//             return;
//         }
//         setIsLoading(true);
//         setMessage('');

//         try {
//             let uploadFile = file;

//             if (file.size > 6 * 1024 * 1024) {
//                 if (file.type.startsWith('image/')) {
//                     uploadFile = await compressImage(file);
//                 } else if (file.type === 'application/pdf') {
//                     uploadFile = await uploadPDFToBackend(file);
//                 }
//             }

//             const storageRef = ref(storage, uploadFile.name);
//             await uploadBytes(storageRef, uploadFile);

//             const url = await getDownloadURL(storageRef);
//             setDownloadURL(url);

//             const response = await axios.post('/api/v1/upload', {
//                 url: url,
//                 name: uploadFile.name,
//                 size: uploadFile.size,
//                 type: uploadFile.type,
//             });

//             setMessage(response.data.message);
//         } catch (error) {
//             setMessage(`Error: ${error.message}`);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-2xl font-bold mb-4">Upload File</h2>
//             <input
//                 type="file"
//                 onChange={handleFileChange}
//                 className="mb-4 border border-gray-300 rounded p-2"
//             />
//             <button
//                 onClick={handleUpload}
//                 className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                 disabled={isLoading}
//             >
//                 {isLoading ? 'Uploading...' : 'Upload'}
//             </button>
//         </div>
//     );
// }

// export default FileUpload;
