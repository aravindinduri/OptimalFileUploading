import React, { useState } from 'react';
import axios from 'axios';

const DisplayFiles = () => {
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState('');

    const fetchFiles = async () => {
        try {
            const response = await axios.get('/api/v1/retrieve');
            setFiles(response.data.files);
        } catch (error) {
            setMessage('Failed to retrieve files.');
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Uploaded Files</h2>
            {message && <p className="text-red-500 mb-4">{message}</p>}
            <button 
                onClick={fetchFiles} 
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Get All Files
            </button>
            <ul className="list-disc pl-5 mt-4">
                {files.map((file) => (
                    <li key={file._id} className="mb-4">
                        {file.contentType.startsWith('image/') ? (
                            <div>
                                <img 
                                    src={file.url} 
                                    alt={file.name} 
                                    className="max-w-xs h-auto mb-2 border rounded"
                                />
                                <p>{file.name} - {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                            </div>
                        ) : (
                            <div>
                                <a 
                                    href={file.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-500 hover:underline"
                                >
                                    {file.name}
                                </a> - {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisplayFiles;
