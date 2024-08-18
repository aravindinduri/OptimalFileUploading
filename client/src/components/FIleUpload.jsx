import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // State for tracking loading

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true); 

        try {
            const response = await axios.post('/api/v1/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(`Error: ${error.response?.data.message || error.message}`);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Upload File</h2>
            <input 
                type="file" 
                onChange={handleFileChange} 
                className="border border-gray-300 rounded p-2 mb-4 w-full"
            />
            <button 
                onClick={handleUpload} 
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                disabled={loading} // Disable button while loading
            >
                {loading ? (
                    <svg className="animate-spin h-5 w-5 mr-3 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291A7.962 7.962 0 014 12H2c0 2.614 1.053 4.989 2.75 6.709l1.25-1.418z"></path>
                    </svg>
                ) : 'Upload'}
            </button>
            {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
    );
};

export default FileUpload;
