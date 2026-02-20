import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkspaceModal = ({ isOpen, onWorkspaceSet }) => {
    const [workspaceName, setWorkspaceName] = useState('');
    const [existingWorkspaces, setExistingWorkspaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchWorkspaces();
        }
    }, [isOpen]);

    const fetchWorkspaces = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/forms/list');
            if (response.data.success) {
                setExistingWorkspaces(response.data.forms || []);
            }
        } catch (err) {
            console.error('Failed to fetch workspaces:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedName = workspaceName.trim().replace(/[^a-zA-Z0-9_\- ]/g, '_');
        if (!trimmedName) {
            setError('Please enter a valid workspace name');
            return;
        }
        onWorkspaceSet(trimmedName);
    };

    const handleSelectExisting = (name) => {
        onWorkspaceSet(name);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-gray-900/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden border border-white/20 p-8 scale-in-center">

                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-3xl mb-6 text-4xl shadow-inner animate-bounce-subtle">
                        🏗️
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-3">
                        Form Workspace
                    </h1>
                    <p className="text-gray-500 font-medium max-w-md mx-auto leading-relaxed">
                        Start your project by naming your workspace or selecting an existing one.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Create New */}
                    <div className="space-y-4">
                        <label className="block text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">Create New</label>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={workspaceName}
                                    onChange={(e) => {
                                        setWorkspaceName(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="Enter Form Name..."
                                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-800 placeholder-gray-400 shadow-sm group-hover:shadow-md"
                                />
                                {error && <p className="text-red-500 text-[10px] font-bold mt-2 px-2 uppercase tracking-wider">{error}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 active:scale-95 transition-all flex items-center justify-center gap-3 group"
                            >
                                Get Started
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </form>
                    </div>

                    {/* Choose Existing */}
                    <div className="flex flex-col">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Existing Workspaces</label>
                        <div className="flex-1 bg-gray-50/50 rounded-2xl p-4 overflow-y-auto max-h-[250px] custom-scrollbar space-y-2 border border-dashed border-gray-200">
                            {loading ? (
                                <div className="flex items-center justify-center h-full gap-2 text-gray-400">
                                    <div className="w-4 h-4 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                                    <span className="text-[10px] font-bold uppercase">Loading...</span>
                                </div>
                            ) : existingWorkspaces.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-300 opacity-50">
                                    <span className="text-3xl mb-2">📁</span>
                                    <span className="text-[10px] font-bold uppercase">Empty</span>
                                </div>
                            ) : (
                                existingWorkspaces.map((ws, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSelectExisting(ws)}
                                        className="w-full p-4 bg-white hover:bg-blue-50 border border-gray-100 hover:border-blue-200 rounded-xl transition-all text-left flex items-center justify-between group"
                                    >
                                        <span className="font-bold text-gray-700 truncate group-hover:text-blue-700">{ws}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300 group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-50 text-center">
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.1em]">
                        Assets will be stored in: <span className="text-gray-600">/upload_images/assets/[workspace_name]</span>
                    </p>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .scale-in-center {
                    animation: scale-in-center 0.4s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
                }
                @keyframes scale-in-center {
                    0% { transform: scale(0.8); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 2s infinite ease-in-out;
                }
            `}} />
        </div>
    );
};

export default WorkspaceModal;
