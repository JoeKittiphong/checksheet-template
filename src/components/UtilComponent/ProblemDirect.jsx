import React, { useState } from 'react';
import axios from 'axios';
import { useFormContext, Controller } from 'react-hook-form';
import CreateProblemModal from './CreateProblemModal';
import { useChecksheet } from '../../context/ChecksheetContext';

/**
 * ProblemDirect Component - Post-it Style
 * 
 * Features:
 * - yellow post-it UI
 * - + button opens CreateProblemModal
 * - API integration to create ASSY_PROBLEM record
 * - - button to delete (requires ID confirmation)
 * - "ปัญหา" link for redirection to standard form
 * - RHF integration via Controller
 * 
 * @param {string} name - Field name for React Hook Form
 * @param {string} apiEndpoint - Base URL for redirection
 */
const ProblemDirect = ({ name, apiEndpoint }) => {
    const { control, getValues } = useFormContext();
    const { meta } = useChecksheet();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isValidating, setIsValidating] = useState(false);

    // Initial persistence check
    const initialValue = getValues(name) || "";

    // Post-it Style Base Classes
    const postItClasses = "relative w-24 h-24 bg-yellow-200 shadow-lg transform rotate-2 flex items-center justify-center p-2 border-l-4 border-yellow-300 transition-all hover:rotate-0 hover:scale-105";

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={initialValue}
            shouldUnregister={false}
            render={({ field: { onChange, value } }) => {
                const problemId = value;

                // Handle Create Action from Modal
                const handleCreate = async (formData) => {
                    setIsCreating(true);
                    try {
                        const payload = {
                            checksheet_name: "ASSY PROBLEM FORM",
                            form_name: "ASSY_PROBLEM",
                            form_id: null, // Allow server to generate ID
                            department: formData.department,
                            as_group: formData.as_group,
                            model: formData.model,
                            version: "VER.0",
                            status: "work_in_progress",
                            machine_no: formData.machine_no, // Use input from modal
                            checksheet_data: {
                                model: formData.model,
                                machine_no: formData.machine_no,
                                mc_model: formData.model,
                                mc_model_input: formData.model, // Add input field
                                mc_no: formData.machine_no,
                                mc_no_input: formData.machine_no, // Add input field
                                // Map AS Group to Checkboxes
                                div_semi: formData.as_group === 'SEMI',
                                div_body: formData.as_group === 'BODY',
                                div_mc: formData.as_group === 'MC_CHECK',
                                div_insp: formData.as_group === 'FINAL' || formData.as_group === 'INSPECTION',
                                div_acc: formData.as_group === 'ACCURACY',
                                div_other: !['SEMI', 'BODY', 'MC_CHECK', 'FINAL', 'INSPECTION', 'ACCURACY'].includes(formData.as_group)
                            }
                        };

                        const response = await axios.post(`${apiEndpoint}/api/save-form`, payload, {
                            withCredentials: true
                        });

                        if (response.data.success && response.data.data) {
                            const newId = response.data.data.insertedId || response.data.data.id;
                            if (newId) {
                                onChange(newId.toString());
                                setIsModalOpen(false);
                                alert(`สร้างใบแจ้งปัญหาเรียบร้อยแล้ว ID: ${newId} (Created successfully)`);
                            } else {
                                throw new Error("No ID returned from server");
                            }
                        } else {
                            throw new Error(response.data.error || "Creation failed");
                        }
                    } catch (error) {
                        console.error("Creation failed:", error);
                        alert(`เกิดข้อผิดพลาด: ${error.message}`);
                    } finally {
                        setIsCreating(false);
                    }
                };

                const handleDelete = async () => {
                    const confirmId = prompt("กรุณากรอก ID เดิมเพื่อยืนยันการลบ\n(Please enter the current ID to confirm deletion)");
                    if (confirmId === problemId) {
                        try {
                            // Import deleteForm dynamically or pass via prop (Assuming import at top-level)
                            const { deleteForm } = await import('../../utils/apiUtils');

                            await deleteForm({ apiEndpoint, formId: problemId });

                            onChange('');
                            alert("ลบข้อมูลและลิงค์เรียบร้อยแล้ว (Deleted successfully)");
                        } catch (error) {
                            console.error("Deletion failed:", error);
                            if (error.status === 403) {
                                alert("คุณไม่มีสิทธิ์ลบข้อมูลนี้ (Permission Denied: Admin/Engineer only)");
                            } else {
                                alert(`เกิดข้อผิดพลาด: ${error.message}`);
                            }
                        }
                    } else if (confirmId !== null) {
                        alert("ID ไม่ถูกต้อง/ยกเลิกการลบ (Incorrect ID / Cancelled)");
                    }
                };

                const handleJump = async () => {
                    if (!problemId) return;

                    setIsValidating(true);
                    try {
                        const response = await axios.get(`${apiEndpoint}/api/load-form/${problemId}`, {
                            withCredentials: true
                        });

                        if (response.data.success && response.data.data) {
                            const { machine_no, model } = response.data.data;
                            const targetForm = 'ASSY_PROBLEM';

                            const queryParams = new URLSearchParams();
                            if (machine_no) queryParams.append('machine_no', machine_no);
                            if (model) queryParams.append('model', model);
                            queryParams.append('id', problemId);

                            window.location.href = `${apiEndpoint}/form/${targetForm}/?${queryParams.toString()}`;
                        } else {
                            alert("ไม่พบข้อมูลปัญหาสำหรับ ID นี้ (Problem ID not found)");
                        }
                    } catch (error) {
                        console.error("Verification failed:", error);
                        if (error.response && error.response.status === 404) {
                            alert("ไม่พบข้อมูลปัญหาสำหรับ ID นี้ (Problem ID not found)");
                        } else {
                            if (confirm("เกิดข้อผิดพลาดในการตรวจสอบข้อมูล คุณต้องการไปยังหน้าปัญหานี้หรือไม่?\n(Verification failed. Proceed anyway?)")) {
                                window.location.href = `${apiEndpoint}/form/ASSY_PROBLEM/id=${problemId}`;
                            }
                        }
                    } finally {
                        setIsValidating(false);
                    }
                };

                return (
                    <div className="relative p-4 flex flex-col items-center print:hidden">
                        {!problemId ? (
                            // Initial State: + Button opens Modal
                            <>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="absolute top-13 right-[-18px] w-25 h-10 bg-yellow-300 hover:bg-yellow-400 text-black rounded-full flex items-center justify-start px-4 shadow-md transition-all active:scale-95"
                                    title="Create New Assy Problem"
                                >
                                    <span className="text-xs font-bold">+ ASS'Y PROBLEM</span>
                                </button>

                                <CreateProblemModal
                                    isOpen={isModalOpen}
                                    onClose={() => setIsModalOpen(false)}
                                    onCreate={handleCreate}
                                    isCreating={isCreating}
                                    apiEndpoint={apiEndpoint}
                                    defaultValues={{
                                        as_group: getValues('as_group') || meta?.as_group || 'SEMI',
                                        model: getValues('model') || getValues('mc_model') || '',
                                        machine_no: getValues('machineNo') || getValues('machine_no') || getValues('mc_no') || getValues('mc_no_input') || ''
                                    }}
                                />
                            </>
                        ) : (
                            // Active State: Post-it Link
                            <div className={postItClasses}>
                                <button
                                    onClick={handleDelete}
                                    className="absolute -top-2 -left-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-sm text-xs font-bold"
                                    title="Delete Link"
                                >
                                    -
                                </button>

                                <button
                                    onClick={handleJump}
                                    disabled={isValidating}
                                    className={`text-gray-800 font-bold text-sm hover:text-blue-700 decoration-2 transition-colors cursor-pointer flex items-center gap-1 ${isValidating ? 'opacity-50 cursor-wait' : ''}`}
                                >
                                    {isValidating && (
                                        <svg className="animate-spin h-3 w-3 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    )}
                                    Problem<br />Report
                                </button>

                                <span className="absolute bottom-1 right-1 text-[8px] italic opacity-90">ID {problemId}</span>
                            </div>
                        )}
                    </div>
                );
            }}
        />
    );
};

export default ProblemDirect;
