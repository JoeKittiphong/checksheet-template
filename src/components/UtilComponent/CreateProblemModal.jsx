import React, { useState } from 'react';

const CreateProblemModal = ({ isOpen, onClose, onCreate, isCreating, apiEndpoint }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        department: 'ASSEMBLY', // Constant, hidden
        as_group: 'SEMI',
        model: '',
        machine_no: '', // New field
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Enforce Uppercase for Model and Machine No
        const finalValue = (name === 'model' || name === 'machine_no') ? value.toUpperCase() : value;
        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.model.trim()) {
            alert('กรุณากรอกรุ่น (Please enter Model)');
            return;
        }
        if (!formData.machine_no.trim()) {
             alert('กรุณากรอกชื่อเครื่อง (Please enter Machine No)');
             return;
        }
        onCreate(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 print:hidden">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 border border-gray-300">
                <h3 className="text-lg font-bold mb-4 text-center border-b pb-2">สร้างใบแจ้งปัญหา (Create Problem)</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Hidden Constant Fields: Form Type & Department */}

                    {/* AS Group */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">AS Group</label>
                        <select
                            name="as_group"
                            value={formData.as_group}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="SEMI">SEMI</option>
                            <option value="BODY">BODY</option>
                            <option value="MACHINE">MACHINE</option>
                            <option value="FINAL">FINAL</option>
                        </select>
                    </div>

                    {/* Machine No */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Machine No <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="machine_no"
                            value={formData.machine_no}
                            onChange={handleChange}
                            placeholder="Ex. NO.1"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm p-2 border focus:ring-blue-500 focus:border-blue-500 font-mono uppercase"
                        />
                    </div>

                    {/* Model */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Model <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            placeholder="Ex. AL400G"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm p-2 border focus:ring-blue-500 focus:border-blue-500 font-mono uppercase"
                            autoFocus
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded font-medium transition-colors"
                            disabled={isCreating}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition-colors flex justify-center items-center gap-2"
                            disabled={isCreating}
                        >
                            {isCreating && (
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProblemModal;
