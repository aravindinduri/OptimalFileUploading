import React, { useState } from 'react';
import axios from 'axios';

export const DisplayFiles = () => {
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchFiles = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/v1/retrieve');
            setFiles(response.data.files);
        } catch (error) {
            setMessage(`Error: ${error.response?.data.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const renderFile = (file) => {
        console.log(file.url)

        const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);

        return (
            <li key={file._id} className="mb-4 border p-4 rounded shadow">
                {file.contentType === 'application/pdf' ? (
                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Open PDF: {file.name}
                    </a>
                ) : (
                    <img src={file.url} alt={file.name} className="w-full h-auto max-w-xs border rounded shadow-sm" />
                )}
                <p className="mt-2">{file.name} - {fileSizeMB} MB</p>
            </li>
        );
    };

    return (
        <div className="p-6 bg-gray-50 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Uploaded Files</h2>
            {message && <p className="text-red-500 mb-4">{message}</p>}
            <button 
                onClick={fetchFiles} 
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Get All Files'}
            </button>
            <ul className="mt-4">
                {files.map(renderFile)}
            </ul>
        </div>
    );
};
