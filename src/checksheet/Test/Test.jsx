import React from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import FinalEDWwireCheck from '../../components/FormComponents/FinalEDWwireCheck';
import EDWFinalRecordCutting from '../../components/FormComponents/EDWFinalRecordCutting';
import EDWFinalRoughnessCheck from '../../components/FormComponents/EDWFinalRoughnessCheck';
import EDWFinalSizeRecord from '../../components/FormComponents/EDWFinalSizeRecord';



const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000/api';

const Test = () => {
    const methods = useForm({
        defaultValues: {
        }
    });

    const { handleSubmit, control, setValue, watch } = methods;

    const onSubmit = (data) => {
        console.log('Form Data:', data);
        alert(JSON.stringify(data, null, 2));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-5xl mx-auto bg-white shadow-lg p-4">
                <h1 className="text-2xl font-bold mb-4">Component Test Lab</h1>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                        {/* 14. FinalEDWwireCheck Test */}
                        <section>
                            <h2 className="text-xl font-bold mb-2">14. FinalEDWwireCheck Test</h2>
                            <div className="p-4 border border-gray-300 rounded overflow-auto bg-gray-50 flex justify-center">
                                <FinalEDWwireCheck prefix="test_final_" />
                            </div>
                        </section>


                        {/* 15. EDWFinalRecordCutting Test */}
                        <section>
                            <h2 className="text-xl font-bold mb-2">15. EDWFinalRecordCutting Test</h2>
                            <div className="p-4 border border-gray-300 rounded overflow-auto">
                                <EDWFinalRecordCutting prefix="test_cutting_" />
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-2">16. EDWFinalRoughnessCheck Test</h2>
                            <div className="p-4 border border-gray-300 rounded overflow-auto">
                                <EDWFinalRoughnessCheck
                                    prefix="test_roughness_"
                                    standards={{ range: "0.430~0.640" }}
                                />
                                <EDWFinalRoughnessCheck
                                    prefix="test_roughness_"
                                    standards={{ range: "3.70~4.50" }}
                                />
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-2">17. EDWFinalRoughnessCheck Test (Instance 2)</h2>
                            <div className="p-4 border border-gray-300 rounded overflow-auto">
                                <EDWFinalRoughnessCheck
                                    prefix="test_roughness_2_"
                                    standards={{ range: "3.70~4.50" }}
                                />
                            </div>
                        </section>

                        {/* 18. EDWFinalRoughnessCheck Test (4th Variant) */}
                        <section>
                            <h2 className="text-xl font-bold mb-2">18. EDWFinalRoughnessCheck Test (4th)</h2>
                            <div className="p-4 border border-gray-300 rounded overflow-auto">
                                <EDWFinalRoughnessCheck
                                    prefix="test_roughness_4th_"
                                    variant="4th"
                                    standards={{ range: "~0.330" }}
                                />
                            </div>
                        </section>

                        {/* 19. EDWFinalSizeRecord Test (3rd Variant) */}
                        <section>
                            <h2 className="text-xl font-bold mb-2">19. EDWFinalSizeRecord Test (3rd)</h2>
                            <div className="p-4 border border-gray-300 rounded overflow-auto">
                                <EDWFinalSizeRecord
                                    prefix="test_size_3rd_"
                                    standards={{ x: "7.9970~8.0020", y: "7.9980~8.0040" }}
                                />
                            </div>
                        </section>

                        {/* 20. EDWFinalSizeRecord Test (4th Variant) */}
                        <section>
                            <h2 className="text-xl font-bold mb-2">20. EDWFinalSizeRecord Test (4th)</h2>
                            <div className="p-4 border border-gray-300 rounded overflow-auto">
                                <EDWFinalSizeRecord
                                    prefix="test_size_4th_"
                                    variant="4th"
                                    standards={{
                                        ae: "14.9980-15.0020",
                                        bf: "14.9980-15.0020",
                                        cg: "14.9980-15.0020",
                                        dh: "14.9980-15.0020"
                                    }}
                                />
                            </div>
                        </section>

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
        </div >
    );
};

export default Test;
