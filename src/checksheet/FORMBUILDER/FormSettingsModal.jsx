import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const FormSettingsModal = ({ isOpen, onClose, onSave, initialValues }) => {
    const { register, handleSubmit, reset, watch, setValue } = useForm({
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-[850px] max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 flex flex-col">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl">⚙️</div>
                        <div>
                            <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Global Form Settings</h2>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Configure universal and page-specific attributes</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">✕</button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 flex-1">

                    {/* UNIVERSAL SETTINGS - SMART SYNC */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM6.464 14.95l.707-.707a1 1 0 01-1.414-1.414l-.707.707a1 1 0 010 1.414zM10 11a1 1 0 100-2 1 1 0 000 2z" /></svg>
                        </div>
                        <h3 className="font-black text-blue-700 mb-4 flex items-center gap-2 uppercase text-sm tracking-widest">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">1</span>
                            Universal Settings (Smart Sync)
                        </h3>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 relative z-10">
                            <div className="group">
                                <label className="block text-[10px] font-black text-blue-600 uppercase tracking-wider mb-1 group-focus-within:text-blue-500 transition-colors">Shared Document No.</label>
                                <input
                                    className="w-full border-b-2 border-blue-200 bg-white/50 px-3 py-2 text-sm focus:border-blue-600 outline-none transition-all font-mono"
                                    placeholder="e.g. FAWI0008"
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setValue('meta.form_name', val);
                                        setValue('cover.docNumber', val);
                                        setValue('content.documentNo', val);
                                    }}
                                    defaultValue={watch('meta.form_name')}
                                />
                                <p className="text-[9px] text-blue-400 mt-1 italic">Syncs Meta, Cover, and Content Doc numbers.</p>
                            </div>

                            <div className="group">
                                <label className="block text-[10px] font-black text-blue-600 uppercase tracking-wider mb-1 group-focus-within:text-blue-500 transition-colors">Shared Version</label>
                                <input
                                    className="w-full border-b-2 border-blue-200 bg-white/50 px-3 py-2 text-sm focus:border-blue-600 outline-none transition-all font-mono"
                                    placeholder="e.g. V3"
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setValue('meta.version', val);
                                        setValue('cover.version', val);
                                        // Auto-extract number for releaseNo if possible
                                        const numMatch = val.match(/\d+/);
                                        if (numMatch) setValue('content.releaseNo', numMatch[0]);
                                    }}
                                    defaultValue={watch('meta.version')}
                                />
                            </div>

                            <div className="group">
                                <label className="block text-[10px] font-black text-blue-600 uppercase tracking-wider mb-1 group-focus-within:text-blue-500 transition-colors">Shared Model</label>
                                <input
                                    className="w-full border-b-2 border-blue-200 bg-white/50 px-3 py-2 text-sm focus:border-blue-600 outline-none transition-all font-bold uppercase"
                                    placeholder="e.g. AL400G & AL600G"
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setValue('meta.model', val);
                                        setValue('content.model', val);
                                    }}
                                    defaultValue={watch('meta.model')}
                                />
                            </div>

                            <div className="group">
                                <label className="block text-[10px] font-black text-blue-600 uppercase tracking-wider mb-1 group-focus-within:text-blue-500 transition-colors">Shared Date</label>
                                <input
                                    type="date"
                                    className="w-full border-b-2 border-blue-200 bg-white/50 px-3 py-2 text-sm focus:border-blue-600 outline-none transition-all"
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setValue('cover.dateOfIssue', val);
                                        setValue('content.date', val);
                                    }}
                                    defaultValue={watch('cover.dateOfIssue')}
                                />
                                <p className="text-[9px] text-blue-400 mt-1 italic">Syncs Date across Cover and A4 Header.</p>
                            </div>

                            <div className="group">
                                <label className="block text-[10px] font-black text-blue-600 uppercase tracking-wider mb-1 group-focus-within:text-blue-500 transition-colors">Shared Group</label>
                                <input
                                    className="w-full border-b-2 border-blue-200 bg-white/50 px-3 py-2 text-sm focus:border-blue-600 outline-none transition-all"
                                    placeholder="e.g. FINAL"
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setValue('meta.as_group', val);
                                        setValue('content.group', val);
                                    }}
                                    defaultValue={watch('meta.as_group')}
                                />
                            </div>

                            <div className="group col-span-2">
                                <label className="block text-[10px] font-black text-blue-600 uppercase tracking-wider mb-1 group-focus-within:text-blue-500 transition-colors">Primary Title (Checklist Title)</label>
                                <input
                                    className="w-full border-b-2 border-blue-200 bg-white/50 px-3 py-2 text-sm focus:border-blue-600 outline-none transition-all font-bold"
                                    placeholder="e.g. CHECK LIST STICKER AL400G&AL600G"
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setValue('meta.title', val);
                                        setValue('cover.title', val);
                                    }}
                                    defaultValue={watch('meta.title')}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        {/* Meta & System */}
                        <div className="space-y-4">
                            <h3 className="font-black text-gray-800 flex items-center gap-2 uppercase text-[11px] tracking-widest border-b pb-2">
                                <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-gray-800 text-[9px] text-white">2</span>
                                System Meta (File Storage)
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Checksheet Filename ID</label>
                                    <input {...register('meta.checksheet_name')} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none font-mono" placeholder="FAWI0038_V2" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Department</label>
                                    <input {...register('meta.department')} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none" />
                                </div>
                            </div>
                        </div>

                        {/* Cover Specifics */}
                        <div className="space-y-4">
                            <h3 className="font-black text-gray-800 flex items-center gap-2 uppercase text-[11px] tracking-widest border-b pb-2">
                                <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-gray-800 text-[9px] text-white">3</span>
                                Cover Page Specifics
                            </h3>
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Date of Issue</label>
                                        <input type="date" {...register('cover.dateOfIssue')} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Approval Date</label>
                                        <input type="date" {...register('cover.approvalDate')} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100" />
                                    </div>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg border border-dashed border-gray-200 space-y-1">
                                    <p className="text-[9px] text-gray-400 uppercase font-black mb-1">Locked Corporate Info</p>
                                    <p className="text-[10px] text-gray-600 font-bold">Issued By: ENGINEERING DIV.</p>
                                    <p className="text-[10px] text-gray-600 font-bold">Company: Sodick ( Thailand ) Co., Ltd.</p>
                                    <p className="text-[10px] text-blue-600 font-bold italic pt-1 border-t border-gray-200 mt-1">Headers: MACHINE CHECK SHEET / TEST</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Header Settings */}
                    <div className="space-y-4 pt-4">
                        <h3 className="font-black text-gray-800 flex items-center gap-2 uppercase text-[11px] tracking-widest border-b pb-2">
                            <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-gray-800 text-[9px] text-white">4</span>
                            A4 Content Header (Repeated on every page)
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 underline decoration-yellow-400 decoration-2 underline-offset-4">Internal Form Ref</label>
                                <input {...register('content.formNumber')} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-50" placeholder="Form No.FQAG...." />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 italic">Release/Rev No.</label>
                                <input {...register('content.releaseNo')} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 font-mono" />
                            </div>
                        </div>
                    </div>

                    {/* LIVE PREVIEW: meta.json */}
                    <div className="space-y-4 pt-4">
                        <h3 className="font-black text-blue-700 flex items-center gap-2 uppercase text-[11px] tracking-widest border-b border-blue-100 pb-2">
                            <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-blue-600 text-[9px] text-white">5</span>
                            Live Preview: meta.json (System Export)
                        </h3>
                        <div className="bg-gray-900 rounded-xl p-4 shadow-inner relative overflow-hidden group">
                            <div className="absolute top-2 right-2 flex gap-2">
                                <div className="p-1 px-2 border border-gray-700 rounded text-[9px] font-black uppercase text-gray-500 bg-gray-800">SCHEMA V2.0</div>
                                <div className="p-1 px-2 bg-green-900/30 border border-green-800 text-green-500 rounded text-[9px] font-black uppercase">AUTO-GENERATED</div>
                            </div>
                            <pre className="text-xs font-mono text-blue-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                                {(() => {
                                    const meta = watch('meta') || {};
                                    const modelVal = meta.model || "";
                                    const generatedMeta = {
                                        form_name: meta.form_name || "",
                                        version: (meta.version || "").replace(/\D/g, ''),
                                        department: meta.department || "",
                                        model: modelVal,
                                        available_models: modelVal ? modelVal.split('&').map(s => s.trim()) : [],
                                        as_group: meta.as_group || "",
                                        checksheet_name: meta.checksheet_name || ""
                                    };
                                    return JSON.stringify(generatedMeta, null, 2);
                                })()}
                            </pre>
                            <div className="mt-2 pt-2 border-t border-gray-800 flex items-center justify-between">
                                <span className="text-[9px] text-gray-600 font-bold uppercase tracking-tighter">Verified Export Structure</span>
                                <span className="text-[9px] text-blue-900 font-bold italic">This file will be used by the server for form indexing.</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-8 border-t sticky bottom-0 bg-white">
                        <button type="button" onClick={onClose} className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors">Discard</button>
                        <button type="submit" className="px-8 py-2.5 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-lg shadow-lg hover:bg-blue-700 active:scale-95 transition-all">Save Global Settings</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormSettingsModal;
