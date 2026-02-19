import React, { useState } from 'react';
import { ComponentMap } from './ComponentMap';
import ComponentDefaults from './ComponentDefaults';

const Toolbox = () => {
    const [previewItem, setPreviewItem] = useState(null);

    // Categorization
    const PAGE_COMPONENTS = ['A4Paper', 'A4blank', 'CoverPage', 'PureGrid'];
    const BASIC_ELEMENTS = ['SimpleText', 'StaticImage', 'Spacer'];
    const FORM_COMPONENTS = Object.keys(ComponentMap).filter(k =>
        !PAGE_COMPONENTS.includes(k) && !BASIC_ELEMENTS.includes(k)
    );

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
            <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shadow-inner z-30">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-800">Toolbox</h2>
                    <p className="text-[11px] text-gray-500 font-medium">Click to Preview | Drag to Add</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">

                    {/* Pages Category */}
                    <div>
                        <div className="flex items-center gap-2 mb-3 px-1 border-l-4 border-purple-500">
                            <span className="text-xs font-black text-gray-700 uppercase tracking-widest">A4 Pages</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {PAGE_COMPONENTS.map(key => renderDraggableItem(key, 'PAGE', 'P', 'bg-purple-500'))}
                        </div>
                    </div>

                    {/* Basic Elements Category */}
                    <div>
                        <div className="flex items-center gap-2 mb-3 px-1 border-l-4 border-emerald-500">
                            <span className="text-xs font-black text-gray-700 uppercase tracking-widest">Layout Tools</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {renderDraggableItem('SimpleText', 'ELEMENT', 'T', 'bg-emerald-500')}
                            {renderDraggableItem('StaticImage', 'ELEMENT', 'IMG', 'bg-emerald-500')}
                            {renderDraggableItem('Spacer', 'ELEMENT', 'S', 'bg-emerald-500')}
                        </div>
                    </div>

                    {/* Form Components Category */}
                    <div>
                        <div className="flex items-center gap-2 mb-3 px-1 border-l-4 border-blue-500">
                            <span className="text-xs font-black text-gray-700 uppercase tracking-widest">Form Fields</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {FORM_COMPONENTS.sort().map(key => renderDraggableItem(key, 'ELEMENT', null, 'bg-blue-500'))}
                        </div>
                    </div>

                </div>
            </div>
            {renderPreview()}
        </div>
    );
};

export default Toolbox;
