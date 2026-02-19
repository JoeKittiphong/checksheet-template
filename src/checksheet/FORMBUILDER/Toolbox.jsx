import React from 'react';
import { ComponentMap } from './ComponentMap';

const Toolbox = () => {
    const PAGE_COMPONENTS = ['A4Paper', 'A4blank', 'CoverPage', 'PureGrid'];
    const ELEMENT_COMPONENTS = Object.keys(ComponentMap).filter(k => !PAGE_COMPONENTS.includes(k));

    const renderDraggableItem = (key, type) => (
        <div
            key={key}
            className="p-3 bg-white border border-gray-200 rounded shadow-sm hover:border-blue-500 hover:shadow-md cursor-grab active:cursor-grabbing transition-all flex items-center gap-2 group"
            draggable={true}
            unselectable="on"
            onDragStart={(e) => {
                // Determine if we are dragging a Page or an Element
                e.dataTransfer.setData("text/plain", key);
                e.dataTransfer.setData("application/react-checksheet-type", type);
                e.dataTransfer.setData("application/x-component-name", key);
                e.dataTransfer.setData("component-name", key);
                e.dataTransfer.setData("component-type", type);
                e.dataTransfer.effectAllowed = "move";

                // Set a ghost image or just let browser handle
                e.currentTarget.style.opacity = '0.5';
            }}
            onDragEnd={(e) => {
                e.currentTarget.style.opacity = '1';
            }}
        >
            <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-xs group-hover:bg-opacity-80 text-white ${type === 'PAGE' ? 'bg-purple-500' : 'bg-blue-500'}`}>
                {type === 'PAGE' ? 'P' : 'C'}
            </div>
            <span className="text-sm text-gray-700 font-medium truncate" title={key}>
                {key}
            </span>
        </div>
    );

    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-700">Toolbox</h2>
                <p className="text-xs text-gray-500 mt-1">Drag items to add</p>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-6">

                {/* Pages Section */}
                <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-1">Pages</h3>
                    <div className="space-y-2">
                        {PAGE_COMPONENTS.map(key => renderDraggableItem(key, 'PAGE'))}
                    </div>
                </div>

                {/* Elements Section */}
                <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-1">Form Elements</h3>
                    <div className="space-y-2">
                        {ELEMENT_COMPONENTS.map(key => renderDraggableItem(key, 'ELEMENT'))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Toolbox;
