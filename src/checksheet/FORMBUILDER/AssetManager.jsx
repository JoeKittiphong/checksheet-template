import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssetManager = ({ isOpen, onClose, onSelect, workspace }) => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    // Mock for now until API is ready
    useEffect(() => {
        if (isOpen) {
            fetchAssets();
        }
    }, [isOpen]);

    const fetchAssets = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/upload/assets?workspace=${workspace || 'general'}`);
            setAssets(response.data.assets || []);
            setLoading(false);
        } catch (err) {
            console.error('Fetch Assets Error:', err);
            setError('Failed to load assets');
            setLoading(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            await axios.post('http://localhost:3000/api/upload/assets', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-workspace-name': workspace || 'general'
                }
            });
            setUploading(false);
            fetchAssets();
        } catch (err) {
            console.error('Upload Error:', err);
            setError('Upload failed');
            setUploading(false);
        }
    };

    const handleDelete = async (e, assetName) => {
        e.stopPropagation(); // Prevent selection when clicking delete
        if (!window.confirm(`Delete ${assetName}? This cannot be undone.`)) return;

        try {
            await axios.delete('http://localhost:3000/api/upload/assets', {
                data: {
                    filename: assetName,
                    workspace: workspace || 'general'
                }
            });
            fetchAssets();
        } catch (err) {
            console.error('Delete Error:', err);
            setError('Failed to delete asset');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden border border-gray-100 scale-in-center">

                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div>
                        <h2 className="text-2xl font-black text-gray-800 tracking-tight">Image Library</h2>
                        <p className="text-gray-500 text-sm font-medium">Select an asset or upload a new one</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white hover:shadow-md rounded-full transition-all text-gray-400 hover:text-gray-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Toolbar */}
                <div className="p-4 bg-white border-b border-gray-50 flex items-center gap-4">
                    <label className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all cursor-pointer shadow-lg shadow-blue-200 font-bold text-sm active:scale-95">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Upload Image
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                    </label>
                    <div className="h-8 w-px bg-gray-100"></div>
                    <button
                        onClick={fetchAssets}
                        className="p-2.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                        title="Refresh"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30 custom-scrollbar">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-4">
                            <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
                            <p className="font-medium animate-pulse">Loading items...</p>
                        </div>
                    ) : assets.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-2">
                            <div className="text-6xl mb-4 opacity-20">📂</div>
                            <p className="font-bold text-gray-500">No assets found</p>
                            <p className="text-sm">Upload your first image to get started</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {assets.map((asset, index) => (
                                <div
                                    key={index}
                                    onClick={() => onSelect(asset.url)}
                                    className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all"
                                >
                                    <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={asset.url}
                                            alt={asset.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/150?text=Error';
                                            }}
                                        />
                                    </div>
                                    <div className="p-3 bg-white">
                                        <p className="text-[10px] font-bold text-gray-700 truncate" title={asset.name}>
                                            {asset.name}
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onSelect(asset.url);
                                            }}
                                            className="bg-white p-2 rounded-full shadow-lg hover:bg-blue-50 transition-all transform hover:scale-110"
                                            title="Select Image"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, asset.name)}
                                            className="bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-all transform hover:scale-110"
                                            title="Delete Image"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {uploading && (
                    <div className="px-6 py-3 bg-blue-50 flex items-center gap-3 border-t border-blue-100">
                        <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Uploading file... Please wait</span>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .scale-in-center {
                    animation: scale-in-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                }
                @keyframes scale-in-center {
                    0% { transform: scale(0.9); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}} />
        </div>
    );
};

export default AssetManager;
