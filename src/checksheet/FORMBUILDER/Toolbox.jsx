import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ComponentMap } from './ComponentMap';
import ComponentDefaults from './ComponentDefaults';

const Toolbox = ({ onAdd, workspace }) => {
    const [previewItem, setPreviewItem] = useState(null);
    const [activeTab, setActiveTab] = useState('elements'); // 'elements' | 'assets'
    const [assets, setAssets] = useState([]);
    const [loadingAssets, setLoadingAssets] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [copySuccess, setCopySuccess] = useState(null);

    // Categorization
    const PAGE_COMPONENTS = ['A4Paper', 'A4blank', 'CoverPage', 'PureGrid'];
    const BASIC_ELEMENTS = ['SimpleText', 'StaticImage', 'Spacer'];
    const FORM_COMPONENTS = Object.keys(ComponentMap).filter(k =>
        !PAGE_COMPONENTS.includes(k) && !BASIC_ELEMENTS.includes(k)
    );

    useEffect(() => {
        if (activeTab === 'assets' && workspace) {
            fetchAssets();
        }
    }, [activeTab, workspace]);

    const fetchAssets = async () => {
        setLoadingAssets(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/upload/assets?workspace=${workspace}`);
            if (response.data.success) {
                setAssets(response.data.assets || []);
            }
        } catch (err) {
            console.error('Failed to fetch toolbox assets:', err);
        } finally {
            setLoadingAssets(false);
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
            fetchAssets();
        } catch (err) {
            console.error('Upload Error:', err);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (e, assetName) => {
        e.stopPropagation();
        if (!window.confirm(`Delete ${assetName}?`)) return;

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
            alert('Failed to delete asset');
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopySuccess(text);
            setTimeout(() => setCopySuccess(null), 2000);
        });
    };

    // Categorization Logic
    const CATEGORIES = {
        'Common': { color: 'border-blue-500', bg: 'bg-blue-500', icon: '⚡' },
        'EDM': { color: 'border-orange-500', bg: 'bg-orange-500', icon: '⚡' },
        'EDW': { color: 'border-cyan-500', bg: 'bg-cyan-500', icon: '⚡' },
        'IMM': { color: 'border-pink-500', bg: 'bg-pink-500', icon: '⚡' }
    };

    const getCategory = (name) => {
        if (name.includes('EDM')) return 'EDM';
        if (name.includes('EDW')) return 'EDW';
        if (name.includes('IMM')) return 'IMM';
        return 'Common';
    };

    const ToolboxSection = ({ title, count, color, isOpen, onToggle, children }) => (
        <div className="mb-2">
            <div
                onClick={onToggle}
                className={`flex items-center justify-between mb-2 px-2 py-1.5 cursor-pointer hover:bg-gray-100 rounded transition-colors group border-l-4 ${color}`}
            >
                <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-gray-700 uppercase tracking-widest">{title}</span>
                    {count !== undefined && <span className="text-[9px] text-gray-400 font-mono">({count})</span>}
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>

            {isOpen && (
                <div className="grid grid-cols-1 gap-2 pl-2 border-l border-gray-100 ml-1 animate-in slide-in-from-top-2 fade-in duration-200">
                    {children}
                </div>
            )}
        </div>
    );

    const FormComponentsSection = ({ components, renderItem }) => {
        const [openCategories, setOpenCategories] = useState({
            'Common': false,
            'EDM': false,
            'EDW': false,
            'IMM': false
        });

        const toggleCategory = (cat) => {
            setOpenCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
        };

        const categorized = components.reduce((acc, name) => {
            const cat = getCategory(name);
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(name);
            return acc;
        }, { 'Common': [], 'EDM': [], 'EDW': [], 'IMM': [] });

        return (
            <div className="space-y-4">
                {Object.entries(CATEGORIES).map(([catName, style]) => {
                    const items = categorized[catName] || [];
                    // if (items.length === 0) return null; // Uncomment to hide empty categories

                    return (
                        <div key={catName}>
                            <div
                                onClick={() => toggleCategory(catName)}
                                className={`flex items-center justify-between mb-2 px-2 py-1.5 cursor-pointer hover:bg-gray-100 rounded transition-colors group border-l-4 ${style.color}`}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-black text-gray-700 uppercase tracking-widest">{catName} Fields</span>
                                    <span className="text-[9px] text-gray-400 font-mono">({items.length})</span>
                                </div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 text-gray-400 transition-transform ${openCategories[catName] ? 'rotate-180' : ''}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>

                            {openCategories[catName] && (
                                <div className="grid grid-cols-1 gap-2 pl-2 border-l border-gray-100 ml-1 animate-in slide-in-from-top-2 fade-in duration-200">
                                    {items.length > 0 ? (
                                        items.sort().map(key => renderItem(key, 'ELEMENT', null, style.bg))
                                    ) : (
                                        <div className="text-[10px] text-gray-300 italic py-2 pl-2">No components</div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    // State for top-level sections
    const [sectionsOpen, setSectionsOpen] = useState({
        pages: false,
        layout: false
    });

    const toggleSection = (section) => {
        setSectionsOpen(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const renderDraggableItem = (key, type, icon, colorClass = 'bg-blue-500') => (
        <div
            key={key}
            className={`p-3 bg-white border rounded shadow-sm hover:border-blue-500 hover:shadow-md cursor-grab active:cursor-grabbing transition-all flex items-center gap-2 group ${previewItem === key ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'}`}
            draggable={true}
            unselectable="on"
            onClick={() => setPreviewItem(key === previewItem ? null : key)}
            onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", key);
                e.dataTransfer.setData("application/react-checksheet-type", type);
                e.dataTransfer.setData("application/x-component-name", key);
                e.dataTransfer.setData("component-name", key);
                e.dataTransfer.setData("component-type", type);
                e.dataTransfer.effectAllowed = "move";
                e.currentTarget.style.opacity = '0.5';
            }}
            onDragEnd={(e) => {
                e.currentTarget.style.opacity = '1';
            }}
        >
            <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-xs group-hover:bg-opacity-80 text-white ${colorClass}`}>
                {icon || (type === 'PAGE' ? 'P' : 'C')}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm text-gray-700 font-medium truncate" title={key}>
                    {key.replace('Form', '').replace('Simple', '').replace('Static', '')}
                </span>
                <span className="text-[10px] text-gray-400 truncate uppercase tracking-tighter">
                    {type}
                </span>
            </div>
            {/* Indicator that it can be clicked for preview */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    );

    const renderPreview = () => {
        if (!previewItem) return null;

        const Component = ComponentMap[previewItem];
        const defaults = ComponentDefaults[previewItem] || ComponentDefaults.default;
        const previewProps = { ...(defaults.props || {}), ...defaults };

        return (
            <div className="absolute left-64 top-0 bottom-0 w-96 bg-white border-r border-gray-200 shadow-2xl z-50 flex flex-col animate-in fade-in slide-in-from-left-4 duration-200">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <div>
                        <h3 className="text-sm font-bold text-gray-800">Live Preview</h3>
                        <p className="text-[10px] text-gray-500 font-mono italic">{previewItem}</p>
                    </div>
                    <button
                        onClick={() => setPreviewItem(null)}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className="flex-1 overflow-auto p-8 bg-gray-100/50 flex items-center justify-center">
                    <div className="bg-white p-4 shadow-sm border border-gray-200 min-w-[200px] pointer-events-none">
                        {Component ? <Component {...previewProps} isBuilder={true} /> : <div className="text-red-500">Component Error</div>}
                    </div>
                </div>
                <div className="p-4 border-t border-gray-200 bg-blue-50">
                    <p className="text-[11px] text-blue-700 italic">
                        * นี่คือตัวอย่างหน้าตาเมื่อวางลงบนกระดาษ คุณสามารถลากไอคอนจาก Toolbox ลงไปวางได้ทันที
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="relative flex h-full">
            <div className="w-full bg-white border-r border-gray-200 flex flex-col h-full shadow-inner z-30">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-black text-gray-800 uppercase tracking-tighter leading-none">Toolbox</h2>
                        <span className="text-[10px] font-bold text-gray-400 font-mono tracking-widest">{activeTab}</span>
                    </div>

                    <div className="flex bg-gray-200/50 p-1 rounded-xl">
                        <button
                            onClick={() => setActiveTab('elements')}
                            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === 'elements' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Elements
                        </button>
                        <button
                            onClick={() => setActiveTab('assets')}
                            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === 'assets' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Assets
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {activeTab === 'elements' ? (
                        <div className="space-y-4">
                            {/* Pages Category */}
                            <ToolboxSection
                                title="A4 Pages"
                                color="border-purple-500"
                                isOpen={sectionsOpen.pages}
                                onToggle={() => toggleSection('pages')}
                            >
                                {PAGE_COMPONENTS.map(key => renderDraggableItem(key, 'PAGE', 'P', 'bg-purple-500'))}
                            </ToolboxSection>

                            {/* Basic Elements Category */}
                            <ToolboxSection
                                title="Layout Tools"
                                color="border-emerald-500"
                                isOpen={sectionsOpen.layout}
                                onToggle={() => toggleSection('layout')}
                            >
                                {renderDraggableItem('SimpleText', 'ELEMENT', 'T', 'bg-emerald-500')}
                                {renderDraggableItem('StaticImage', 'ELEMENT', 'IMG', 'bg-emerald-500')}
                                {renderDraggableItem('Spacer', 'ELEMENT', 'S', 'bg-emerald-500')}
                            </ToolboxSection>

                            {/* Form Components Category */}
                            <FormComponentsSection
                                components={FORM_COMPONENTS}
                                renderItem={renderDraggableItem}
                            />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Workspace Library</span>
                                <div className="flex items-center gap-1">
                                    <label className={`p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-blue-500 cursor-pointer ${uploading ? 'animate-pulse' : ''}`} title="Upload Image">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                                    </label>
                                    <button onClick={fetchAssets} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-blue-500" title="Refresh">
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${loadingAssets ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {!workspace ? (
                                <div className="py-20 text-center opacity-40">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 italic">No Workspace Selected</p>
                                </div>
                            ) : loadingAssets ? (
                                <div className="py-20 flex flex-col items-center gap-2 text-gray-300">
                                    <div className="w-6 h-6 border-2 border-gray-100 border-t-blue-500 rounded-full animate-spin"></div>
                                    <span className="text-[9px] font-black uppercase">Scanning Assets...</span>
                                </div>
                            ) : assets.length === 0 ? (
                                <div className="py-20 text-center text-gray-300 opacity-60">
                                    <div className="text-4xl mb-2">📂</div>
                                    <p className="text-[10px] font-black uppercase tracking-widest">Empty Workspace</p>
                                    <p className="text-[9px] mt-1 italic">Upload images using the <span className="font-bold">icon above</span></p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    {assets.map((asset, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => copyToClipboard(asset.url)}
                                            className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl hover:border-blue-400 transition-all active:scale-95"
                                        >
                                            <div className="aspect-square bg-gray-50 flex items-center justify-center">
                                                <img src={asset.url} alt={asset.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="p-2 border-t border-gray-50 flex items-center justify-between">
                                                <span className="text-[9px] font-bold text-gray-500 truncate flex-1">{asset.name}</span>
                                                {copySuccess === asset.url ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-300 group-hover:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                                    </svg>
                                                )}
                                            </div>

                                            {/* Tooltip Overlay */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col">
                                                <div className="flex justify-end p-1">
                                                    <button
                                                        onClick={(e) => handleDelete(e, asset.name)}
                                                        className="p-1 bg-white/90 rounded-full hover:bg-red-500 hover:text-white text-red-500 transition-colors shadow-sm"
                                                        title="Delete"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="flex-1 flex items-center justify-center pb-4" title="Click to Copy URL">
                                                    <span className="text-[9px] font-black text-white uppercase tracking-widest bg-blue-600/80 px-2 py-1 rounded">Copy</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {renderPreview()}
        </div>
    );
};

export default Toolbox;
