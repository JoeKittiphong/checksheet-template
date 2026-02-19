import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const FormSettingsModal = ({ isOpen, onClose, onSave, initialValues }) => {
    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues: initialValues || {
            meta: {},
            cover: {},
            content: {}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[800px] max-h-[90vh] overflow-y-auto shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Global Form Settings</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Meta Section */}
                    <div className="bg-gray-50 p-4 rounded border border-gray-200">
                        <h3 className="font-bold text-blue-600 mb-2">Meta Information (File & System)</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Form Name (ID)</label>
                                <input {...register('meta.form_name')} className="w-full border rounded px-2 py-1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Checksheet Name</label>
                                <input {...register('meta.checksheet_name')} className="w-full border rounded px-2 py-1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Version</label>
                                <input {...register('meta.version')} className="w-full border rounded px-2 py-1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Department</label>
                                <input {...register('meta.department')} className="w-full border rounded px-2 py-1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">AS Group</label>
                                <input {...register('meta.as_group')} className="w-full border rounded px-2 py-1" />
                            </div>
                        </div>
                    </div>

                    {/* Cover Section */}
                    <div className="bg-gray-50 p-4 rounded border border-gray-200">
                        <h3 className="font-bold text-blue-600 mb-2">Cover Page Settings</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Document No (Cover)</label>
                                <input {...register('cover.docNumber')} className="w-full border rounded px-2 py-1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input {...register('cover.title')} className="w-full border rounded px-2 py-1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date of Issue</label>
                                <input type="date" {...register('cover.dateOfIssue')} className="w-full border rounded px-2 py-1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Approval Date</label>
                                <input type="date" {...register('cover.approvalDate')} className="w-full border rounded px-2 py-1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Issued By</label>
                                <input {...register('cover.issuedBy')} className="w-full border rounded px-2 py-1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Company</label>
                                <input {...register('cover.company')} className="w-full border rounded px-2 py-1" />
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="bg-gray-50 p-4 rounded border border-gray-200">
                        <h3 className="font-bold text-blue-600 mb-2">Content Page Settings (Default Header)</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Form Number</label>
                                <input {...register('content.formNumber')} className="w-full border rounded px-2 py-1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Document No (Header)</label>
                                <input {...register('content.documentNo')} className="w-full border rounded px-2 py-1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Model</label>
                                <input {...register('content.model')} className="w-full border rounded px-2 py-1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Group</label>
                                <input {...register('content.group')} className="w-full border rounded px-2 py-1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Release No</label>
                                <input {...register('content.releaseNo')} className="w-full border rounded px-2 py-1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Control By</label>
                                <input {...register('content.controlBy')} className="w-full border rounded px-2 py-1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input {...register('content.title')} className="w-full border rounded px-2 py-1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                                <input {...register('content.subtitle')} className="w-full border rounded px-2 py-1" />
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Global Settings</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormSettingsModal;
