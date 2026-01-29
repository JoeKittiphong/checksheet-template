import React, { useState, useRef, useEffect } from 'react';
import { useKeypad } from '../../context/KeypadContext';
import { useFormContext } from 'react-hook-form';

const VirtualKeypad = () => {
    const {
        isVisible,
        mode,
        targetField,
        tempValue,
        options,
        closeKeypad,
        setTempValue,
        toggleMode,
        keypadPosition,
        setKeypadPosition
    } = useKeypad();

    const { setValue } = useFormContext();

    // Position state - initialize with context if available, or default
    const [position, setPosition] = useState(keypadPosition || { x: window.innerWidth - 380, y: window.innerHeight - 450 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const keypadRef = useRef(null);

    // Initial positioning logic
    useEffect(() => {
        if (isVisible) {
            if (keypadPosition) {
                setPosition(keypadPosition);
            } else {
                const initialX = Math.min(window.innerWidth - 360, window.innerWidth * 0.6);
                const initialY = Math.min(window.innerHeight - 420, window.innerHeight * 0.5);
                setPosition({ x: initialX, y: initialY });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]);

    const handlePointerDown = (e) => {
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
        // Set pointer capture to handle movement outside the header
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
        if (!isDragging) return;

        // Calculate new position with boundary checks
        let newX = e.clientX - dragOffset.x;
        let newY = e.clientY - dragOffset.y;

        // Keep within viewport
        newX = Math.max(10, Math.min(newX, window.innerWidth - 350));
        newY = Math.max(10, Math.min(newY, window.innerHeight - 400));

        setPosition({ x: newX, y: newY });
    };

    const handlePointerUp = (e) => {
        setIsDragging(false);
        setKeypadPosition(position);
    };

    const handleKeyClick = (key) => {
        if (key === 'BACKSPACE') {
            setTempValue(prev => prev.slice(0, -1));
        } else if (key === 'CLEAR') {
            setTempValue('');
        } else if (key === 'TOGGLE_SIGN') {
            setTempValue(prev => {
                if (prev.startsWith('-')) return prev.slice(1);
                return '-' + prev;
            });
        } else if (key === 'ENTER') {
            if (targetField) {
                setValue(targetField, tempValue, { shouldDirty: true, shouldValidate: true });
            }
            closeKeypad();
        } else {
            setTempValue(prev => prev + key);
        }
    };

    if (!isVisible) return null;

    const numKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '0', '.'];
    const textKeys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div
            ref={keypadRef}
            className="fixed z-[9999] select-none shadow-2xl overflow-hidden rounded-2xl border border-gray-700 bg-gray-900/95 backdrop-blur-xl text-white transition-opacity duration-300"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: '340px',
                opacity: isDragging ? 0.8 : 1
            }}
        >
            {/* Header: Draggable Area */}
            <div
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="bg-gray-800 p-2 cursor-move flex items-center justify-between border-b border-gray-700 active:bg-gray-700 h-10"
                style={{ touchAction: 'none' }}
            >
                <div className="flex items-center gap-2 ml-1">
                    <div className="flex flex-col gap-0.5 pointer-events-none">
                        <div className="w-4 h-0.5 bg-gray-500 rounded-full"></div>
                        <div className="w-4 h-0.5 bg-gray-500 rounded-full"></div>
                        <div className="w-4 h-0.5 bg-gray-500 rounded-full"></div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 tracking-tighter truncate max-w-[120px]">
                        {options.label || targetField}
                    </span>
                </div>
                <div className="flex gap-1">
                    <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onPointerUp={(e) => { e.stopPropagation(); toggleMode(); }}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 rounded text-[10px] font-bold transition-colors"
                    >
                        {mode === 'numeric' ? 'ABC' : '123'}
                    </button>
                    <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onPointerUp={(e) => { e.stopPropagation(); closeKeypad(); }}
                        className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-[10px] font-bold transition-colors"
                    >
                        CLOSE
                    </button>
                </div>
            </div>

            {/* Display / Value Box */}
            <div className="p-2 bg-black/30 border-b border-gray-800">
                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-2 flex items-center justify-end h-10 overflow-hidden">
                    <span className="text-xl font-mono font-bold text-blue-400 break-all text-right">
                        {tempValue}
                        <span className="inline-block w-0.5 h-5 bg-blue-500 ml-0.5 animate-pulse align-middle"></span>
                    </span>
                </div>
            </div>

            {/* Keys Area */}
            <div className="p-2">
                {mode === 'numeric' ? (
                    <div className="grid grid-cols-3 gap-1.5">
                        {numKeys.map(key => (
                            <button
                                key={key}
                                onClick={() => handleKeyClick(key)}
                                className="h-10 bg-gray-700 hover:bg-gray-600 active:bg-blue-600 rounded-lg text-lg font-bold border-b-2 border-gray-800 active:border-b-0 active:translate-y-0.5 transition-all shadow-sm"
                            >
                                {key}
                            </button>
                        ))}
                        <button
                            onClick={() => handleKeyClick('TOGGLE_SIGN')}
                            className="h-10 bg-orange-600 hover:bg-orange-500 rounded-lg text-lg font-bold border-b-2 border-orange-800"
                        >
                            +/-
                        </button>
                        <button
                            onClick={() => handleKeyClick('CLEAR')}
                            className="h-10 bg-gray-600 hover:bg-gray-500 rounded-lg text-xs font-bold border-b-2 border-gray-700"
                        >
                            CLR
                        </button>
                        <button
                            onClick={() => handleKeyClick('BACKSPACE')}
                            className="h-10 bg-gray-600 hover:bg-gray-500 rounded-lg text-xs font-bold border-b-2 border-gray-700"
                        >
                            DEL
                        </button>
                        <button
                            onClick={() => handleKeyClick('ENTER')}
                            className="col-span-3 h-10 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-bold border-b-2 border-green-800 mt-0.5"
                        >
                            ENTER / CONFIRM
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-6 gap-1">
                        {/* Alphabet keys */}
                        {textKeys.map(key => (
                            <button
                                key={key}
                                onClick={() => handleKeyClick(key)}
                                className="h-8 bg-gray-700 hover:bg-gray-600 rounded text-xs font-bold border-b-2 border-gray-800 transition-all"
                            >
                                {key}
                            </button>
                        ))}
                        <button
                            onClick={() => handleKeyClick(' ')}
                            className="col-span-2 h-8 bg-gray-700 hover:bg-gray-600 rounded text-[10px] font-bold border-b-2 border-gray-800"
                        >
                            SPACE
                        </button>
                        <button
                            onClick={() => handleKeyClick('CLEAR')}
                            className="col-span-1 h-8 bg-gray-600 hover:bg-gray-500 rounded text-[9px] font-bold border-b-2 border-gray-700"
                        >
                            CLR
                        </button>
                        <button
                            onClick={() => handleKeyClick('BACKSPACE')}
                            className="col-span-1 h-8 bg-gray-600 hover:bg-gray-500 rounded text-[9px] font-bold border-b-2 border-gray-700"
                        >
                            DEL
                        </button>
                        <button
                            onClick={() => handleKeyClick('ENTER')}
                            className="col-span-2 h-8 bg-green-600 hover:bg-green-500 rounded text-[10px] font-bold border-b-2 border-green-800"
                        >
                            OK
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                .cursor-move { cursor: move; cursor: -webkit-grab; }
                .cursor-move:active { cursor: -webkit-grabbing; }
            `}</style>
        </div>
    );
};

export default VirtualKeypad;
