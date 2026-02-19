import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const PageSettingsModal = ({ isOpen, onClose, onSave, initialValues }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            documentNo: '',
            releaseNo: '',
            controlBy: 'Assembly Division',
            title: 'Check Sheet',
            subtitle: 'ASSEMBLY',
            company: 'Sodick (Thailand) Co.,Ltd',
            date: '',
            model: '',
            group: '',
            totalPage: 1,
            // ... add other default values if needed
        }
    });

    useEffect(() => {
        if (isOpen && initialValues) {
            reset(initialValues);
        }
    }, [isOpen, initialValues, reset]);

    const onSubmit = (data) => {
        onSave(data);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-800">Page Settings</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 font-bold p-1">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 max-h-[70vh] overflow-y-auto">
                    <div className="space-y-4">
                        {/* Document & Release */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Document No.</label>
                                <input {...register('documentNo')} className="w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Release No.</label>
                                <input {...register('releaseNo')} className="w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                        </div>

                        {/* Titles */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input {...register('title')} className="w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                                <input {...register('subtitle')} className="w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Control By</label>
                                <input {...register('controlBy')} className="w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                        </div>

                        {/* Company & Date */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                <input {...register('company')} className="w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input {...register('date')} className="w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="dd/mm/yyyy" />
                            </div>
                        </div>

                        {/* Model & Group */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                                <input {...register('model')} className="w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Group</label>
                                <input {...register('group')} className="w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                        </div>

                        {/* Page Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Pages</label>
                                <input type="number" {...register('totalPage')} className="w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Form Number</label>
                                <input {...register('formNumber')} className="w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Bottom right number" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 shadow-sm"
                        >
                            Apply Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PageSettingsModal;
