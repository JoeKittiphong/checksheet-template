import React from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import CompactImageUpload from '../../components/FormComponents/CompactImageUpload';

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000/api';

// CheckCell Component - Checkbox + Image
const CheckCell = ({ name, control, machineNo = 'NO.1' }) => {
    const okValue = useWatch({ name: `${name}_ok`, control });

    return (
        <div className="flex flex-col items-center gap-1 p-2 min-w-[80px]">
            {/* OK Checkbox */}
            <label className="flex items-center gap-1 cursor-pointer">
                <input
                    type="checkbox"
                    {...control.register(`${name}_ok`)}
                    className="w-4 h-4 rounded border-gray-400"
                />
                <span className="text-xs font-medium text-gray-700">OK</span>
            </label>

            {/* Image Upload - Show only when OK is checked */}
            {okValue && (
                <CompactImageUpload
                    name={`${name}_image`}
                    apiEndpoint={apiEndpoint}
                    uploadPath="/upload/double-check"
                    uploadFolder="double_check"
                    extraData={{ machine_no: machineNo }}
                    label="📷"
                    viewLabel="ภาพ"
                    deferred={false}
                />
            )}
        </div>
    );
};

const Test = () => {
    const methods = useForm({
        defaultValues: {
            // Row 1
            row1_check1_ok: false,
            row1_check1_image: null,
            row1_check2_ok: false,
            row1_check2_image: null,
            row1_check3_ok: false,
            row1_check3_image: null,
        }
    });

    const { handleSubmit, control } = methods;

    const onSubmit = (data) => {
        console.log('Form Data:', data);
        alert(JSON.stringify(data, null, 2));
    };

    // Sample row data
    const row1 = {
        no: 1,
        partName: 'LOCK BKT (X)\nSCREW BLACK CS M8x20\nGT WASHER D8',
        qty: 7,
        torque: 250,
        refImage: '/images/lock_bkt_x.jpg' // Reference image path
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-5xl mx-auto bg-white shadow-lg">
                {/* Header */}
                <div className="border border-black">
                    <div className="grid grid-cols-4 border-b border-black">
                        <div className="col-span-2 p-2 border-r border-black">
                            <div className="text-xs text-gray-600">Control by</div>
                            <div className="font-bold">Assembly Division</div>
                        </div>
                        <div className="p-2 border-r border-black text-center">
                            <div className="font-bold">ASSEMBLY</div>
                            <div className="text-sm">Sodick (Thailand) Co.,Ltd</div>
                        </div>
                        <div className="p-2 text-center">
                            <div className="text-xs text-gray-600">Date</div>
                            <div className="font-bold">3 Mar 25</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 border-b border-black">
                        <div className="p-2 border-r border-black">
                            <span className="text-xs text-gray-600">MODEL</span>
                            <span className="ml-2 font-bold">ALC400G/ALC600G (iG+E)</span>
                        </div>
                        <div className="p-2">
                            <span className="text-xs text-gray-600">GROUP</span>
                            <span className="ml-2 font-bold">FINAL INSPECTION & FINISH GOODS</span>
                        </div>
                    </div>
                </div>

                {/* Section Title */}
                <div className="border-x border-black px-2 py-1 bg-gray-50 font-bold">
                    1. Double Check Lock BKT
                </div>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Table */}
                        <table className="w-full border-collapse border border-black text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-black px-2 py-1 w-10">No.</th>
                                    <th className="border border-black px-2 py-1 w-48">Part Name</th>
                                    <th className="border border-black px-2 py-1 w-12">Qty</th>
                                    <th className="border border-black px-2 py-1 w-16">Torque<br /><span className="text-xs font-normal">(kgf.cm)</span></th>
                                    <th className="border border-black px-2 py-1 w-24">Picture</th>
                                    <th className="border border-black px-2 py-1 w-20">Check-1</th>
                                    <th className="border border-black px-2 py-1 w-20">Check-2</th>
                                    <th className="border border-black px-2 py-1 w-20">Check-3</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Row 1 */}
                                <tr>
                                    <td className="border border-black px-2 py-1 text-center align-top font-bold">
                                        {row1.no}
                                    </td>
                                    <td className="border border-black px-2 py-1 align-top">
                                        <div className="font-bold">LOCK BKT (X)</div>
                                        <div className="text-xs text-gray-600">SCREW BLACK CS M8x20</div>
                                        <div className="text-xs text-gray-600">GT WASHER D8</div>
                                    </td>
                                    <td className="border border-black px-2 py-1 text-center align-top">
                                        {row1.qty}
                                    </td>
                                    <td className="border border-black px-2 py-1 text-center align-top">
                                        {row1.torque}
                                    </td>
                                    <td className="border border-black px-2 py-1 text-center">
                                        {/* Reference Image Placeholder */}
                                        <div className="w-20 h-16 bg-red-200 mx-auto flex items-center justify-center text-xs text-red-600">
                                            [รูปอ้างอิง]
                                        </div>
                                    </td>
                                    <td className="border border-black">
                                        <CheckCell name="row1_check1" control={control} />
                                    </td>
                                    <td className="border border-black">
                                        <CheckCell name="row1_check2" control={control} />
                                    </td>
                                    <td className="border border-black">
                                        <CheckCell name="row1_check3" control={control} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Submit Button */}
                        <div className="p-4 flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                            >
                                บันทึก
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export default Test;
