import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

// Import all 64 components
import CompactImageUpload from '../../components/FormComponents/CompactImageUpload';
import EDWFinalRecordCutting from '../../components/FormComponents/EDWFinalRecordCutting';
import EDWFinalRoughnessCheck from '../../components/FormComponents/EDWFinalRoughnessCheck';
import EDWFinalSizeRecord from '../../components/FormComponents/EDWFinalSizeRecord';
import EquationBox from '../../components/FormComponents/EquationBox';
import FinalConditionTable from '../../components/FormComponents/FinalConditionTable';
import FinalEDWwireCheck from '../../components/FormComponents/FinalEDWwireCheck';
import FormCeramicCheckEDM from '../../components/FormComponents/FormCeramicCheckEDM';
import FormCeramicCheckEDW from '../../components/FormComponents/FormCeramicCheckEDW';
import FormCheckedBox from '../../components/FormComponents/FormCheckedBox';
import FormChecknumber from '../../components/FormComponents/FormChecknumber';
import FormDateInput from '../../components/FormComponents/FormDateInput';
import FormDoubleCheckTable from '../../components/FormComponents/FormDoubleCheckTable';
import FormEDMBodyCheckTable from '../../components/FormComponents/FormEDMBodyCheckTable';
import FormEDMCoilMagnetCheck from '../../components/FormComponents/FormEDMCoilMagnetCheck';
import FormEDMCoilTubeCheck from '../../components/FormComponents/FormEDMCoilTubeCheck';
import FormEDMLevelCeramic from '../../components/FormComponents/FormEDMLevelCeramic';
import FormEDMTablePitchingX from '../../components/FormComponents/FormEDMTablePitchingX';
import FormEDMTablePitchingY from '../../components/FormComponents/FormEDMTablePitchingY';
import FormEDMTableRollingX from '../../components/FormComponents/FormEDMTableRollingX';
import FormEDMTableRollingY from '../../components/FormComponents/FormEDMTableRollingY';
import FormEDMTableStraightness from '../../components/FormComponents/FormEDMTableStraightness';
import FormEDMYawingX from '../../components/FormComponents/FormEDMYawingX';
import FormEDMYawingY from '../../components/FormComponents/FormEDMYawingY';
import FormEDMparallelX from '../../components/FormComponents/FormEDMparallelX';
import FormEDMparallelY from '../../components/FormComponents/FormEDMparallelY';
import FormEDWVersionCheck from '../../components/FormComponents/FormEDWVersionCheck';
import FormEDWYawingX from '../../components/FormComponents/FormEDWYawingX';
import FormHorizontalTableSingleRow from '../../components/FormComponents/FormHorizontalTableSingleRow';
import FormInputCheckSTD from '../../components/FormComponents/FormInputCheckSTD';
import FormItemCheck from '../../components/FormComponents/FormItemCheck';
import FormLevelTableWithDirections from '../../components/FormComponents/FormLevelTableWithDirections';
import FormLevelTableXAB from '../../components/FormComponents/FormLevelTableXAB';
import FormLevelTableXStdAct from '../../components/FormComponents/FormLevelTableXStdAct';
import FormLevelTableYAB from '../../components/FormComponents/FormLevelTableYAB';
import FormQuickTable from '../../components/FormComponents/FormQuickTable';
import FormSQRgrapX from '../../components/FormComponents/FormSQRgrapX';
import FormSquareCheckGraph from '../../components/FormComponents/FormSquareCheckGraph';
import FormSquareCheckSQRGraph from '../../components/FormComponents/FormSquareCheckSQRGraph';
import FormStartFinishTime from '../../components/FormComponents/FormStartFinishTime';
import FormStoneTableGrid from '../../components/FormComponents/FormStoneTableGrid';
import FormTableEnto from '../../components/FormComponents/FormTableEnto';
import FormTableEntoDual from '../../components/FormComponents/FormTableEntoDual';
import FormTableEntoSingleDir from '../../components/FormComponents/FormTableEntoSingleDir';
import FormTablePitchCheck from '../../components/FormComponents/FormTablePitchCheck';
import FormTablePitchXYZUV from '../../components/FormComponents/FormTablePitchXYZUV';
import FormTablePitchXYZUVBigmodel from '../../components/FormComponents/FormTablePitchXYZUVBigmodel';
import FormTablePitchingX from '../../components/FormComponents/FormTablePitchingX';
import FormTablePitchingY from '../../components/FormComponents/FormTablePitchingY';
import FormTableRollingX from '../../components/FormComponents/FormTableRollingX';
import FormTableRollingY from '../../components/FormComponents/FormTableRollingY';
import FormTableStraightness from '../../components/FormComponents/FormTableStraightness';
import FormTableXABDIFF from '../../components/FormComponents/FormTableXABDIFF';
import FormTableXPR from '../../components/FormComponents/FormTableXPR';
import FormTableYABDIFF from '../../components/FormComponents/FormTableYABDIFF';
import FormTableYPR from '../../components/FormComponents/FormTableYPR';
import FormValidatedCell from '../../components/FormComponents/FormValidatedCell';
import FormWorkstandCheck from '../../components/FormComponents/FormWorkstandCheck';
import FormYawingUV from '../../components/FormComponents/FormYawingUV';
import FormYawingY from '../../components/FormComponents/FormYawingY';
import ImageUploadBox from '../../components/FormComponents/ImageUploadBox';
import InputWithArrow from '../../components/FormComponents/InputWithArrow';
import ShapedCheckGroup from '../../components/FormComponents/ShapedCheckGroup';
import TableCalculateSetting from '../../components/FormComponents/TableCalculateSetting';

const Test = () => {
    const methods = useForm();
    const { handleSubmit } = methods;

    const onSubmit = (data) => {
        console.log('Form Data:', data);
        alert(JSON.stringify(data, null, 2));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">Reference: All 64 Form Components</h1>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-6">

                            {/* CompactImageUpload */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">CompactImageUpload</h3>
                                <div className="flex gap-4 items-start">
                                    <div className="p-4 border rounded bg-gray-50">
                                        <CompactImageUpload
                                            name="test_CompactImageUpload_Full"
                                            apiEndpoint="http://localhost:3000"
                                            uploadPath="/api/upload/assy"
                                            uploadFolder="assy_problem"
                                            label="Upload Photo"
                                            viewLabel="View Photo"
                                            deferred={false}
                                            extraData={{ machine_no: 'M001', section: 'S01' }}
                                            className=""
                                        />
                                    </div>
                                    <div className="flex-1 bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<CompactImageUpload 
    name="test_CompactImageUpload_Full" 
    apiEndpoint="http://localhost:3000"
    uploadPath="/api/upload/assy"
    uploadFolder="assy_problem"
    label="Upload Photo"
    viewLabel="View Photo"
    deferred={false}
    extraData={{ machine_no: 'M001', section: 'S01' }}
    className=""
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* EDWFinalRecordCutting */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">EDWFinalRecordCutting</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <EDWFinalRecordCutting
                                            name="test_EDWFinalRecordCutting"
                                            prefix="test_EDWFinalRecordCutting_"
                                            standards={{
                                                c0001: { v: "26~34", a: "10.0~14.0", speed: "0.8~1.3", time: "H071= 36:30~46:30" },
                                                totalTime: "H081= 54:00~1:08:00"
                                            }}
                                            placeholders={{ c0001: { v: "H122" } }}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<EDWFinalRecordCutting 
    name="test_EDWFinalRecordCutting" 
    prefix="test_EDWFinalRecordCutting_"
    standards={{
        c0001: { v: "26~34", a: "10.0~14.0", speed: "0.8~1.3", time: "H071= 36:30~46:30" },
        totalTime: "H081= 54:00~1:08:00"
    }}
    placeholders={{ c0001: { v: "H122" } }}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* EDWFinalRoughnessCheck */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">EDWFinalRoughnessCheck</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <EDWFinalRoughnessCheck
                                            name="test_EDWFinalRoughnessCheck"
                                            prefix="test_EDWFinalRoughnessCheck_"
                                            variant="3rd"
                                            standards={{ range: "1.3~2.4" }}
                                            className=""
                                            headerSuffix="(3rd)"
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<EDWFinalRoughnessCheck 
    name="test_EDWFinalRoughnessCheck" 
    prefix="test_EDWFinalRoughnessCheck_"
    variant="3rd"
    standards={{ range: "1.3~2.4" }}
    className=""
    headerSuffix="(3rd)"
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* EDWFinalSizeRecord */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">EDWFinalSizeRecord</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <EDWFinalSizeRecord
                                            name="test_EDWFinalSizeRecord"
                                            prefix="test_EDWFinalSizeRecord_"
                                            variant="3rd"
                                            standards={{ range: "7.9970~8.0020", x: "10.00", y: "20.00" }}
                                            headerSuffix="(3rd)"
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<EDWFinalSizeRecord 
    name="test_EDWFinalSizeRecord" 
    prefix="test_EDWFinalSizeRecord_"
    variant="3rd"
    standards={{ range: "7.9970~8.0020", x: "10.00", y: "20.00" }}
    headerSuffix="(3rd)"
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* EquationBox */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">EquationBox</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <EquationBox
                                                labelLeft="Radius"
                                                labelRight="PI"
                                                labelResult="Area Approx"
                                                operator="*"
                                                nameLeft="eq_rad"
                                                nameRight="eq_pi"
                                                nameResult="eq_area"
                                                minStd={0}
                                                maxStd={100}
                                                stdText="Range: 0-100"
                                                className="border-blue-200 bg-blue-50 p-3 rounded"
                                            />
                                            <EquationBox
                                                labelLeft="Total"
                                                labelRight="Count"
                                                labelResult="Average"
                                                operator="/"
                                                nameLeft="eq_total"
                                                nameRight="eq_count"
                                                nameResult="eq_avg"
                                                stdText="Must be positive"
                                                className="border-green-200 bg-green-50 p-3 rounded"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`{/* Multi-Operator Examples */}
<EquationBox 
    labelLeft="Radius" labelRight="PI" labelResult="Area"
    operator="*" 
    nameLeft="eq_rad" nameRight="eq_pi" nameResult="eq_area" 
    stdText="Range: 0-100"
    className="border-blue-200 bg-blue-50 p-3 rounded"
/>
<EquationBox 
    labelLeft="Total" labelRight="Count" labelResult="Average" 
    operator="/" 
    nameLeft="eq_total" nameRight="eq_count" nameResult="eq_avg" 
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FinalConditionTable */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FinalConditionTable</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FinalConditionTable
                                            headers={["Cond 1", "Cond 2", "Cond 3"]}
                                            tableRows={[
                                                { label: "Check A", values: ["OK", "OK", "NG"] },
                                                { label: "Check B", values: ["-", "OK", "OK"] }
                                            ]}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FinalConditionTable 
    headers={["Cond 1", "Cond 2", "Cond 3"]}
    tableRows={[
        { label: "Check A", values: ["OK", "OK", "NG"] },
        { label: "Check B", values: ["-", "OK", "OK"] }
    ]}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FinalEDWwireCheck */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FinalEDWwireCheck</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <div className="relative">
                                            <FinalEDWwireCheck prefix="test_FinalEDWwireCheck_" />
                                            <p className="text-xs text-gray-500 mt-2">Note: Depends on AuthContext for user signature.</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FinalEDWwireCheck prefix="test_FinalEDWwireCheck_" />`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormCeramicCheckEDM */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormCeramicCheckEDM</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormCeramicCheckEDM
                                            name="test_CeramicEDM_Enhanced"
                                            standard={{ min: -0.005, max: 0.005 }}
                                            parallelStandard={0.003}
                                            defaultValue={{
                                                sqr: '0.002',
                                                points: {
                                                    p1: { top: 1.1, mid: 2.2, bot: 3.3 },
                                                    p2: { top: 0.5, mid: 0.6, bot: 0.7 }
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormCeramicCheckEDM 
    name="test_CeramicEDM_Enhanced" 
    standard={{ min: -0.005, max: 0.005 }}
    parallelStandard={0.003}
    defaultValue={{
        sqr: '0.002',
        points: { 
            p1: { top: 1.1, mid: 2.2, bot: 3.3 },
            p2: { top: 0.5, mid: 0.6, bot: 0.7 } 
        }
    }}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormCeramicCheckEDW */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormCeramicCheckEDW</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormCeramicCheckEDW
                                            name="test_CeramicEDW_Enhanced"
                                            standard={{ min: -0.01, max: 0.01 }}
                                            defaultValue={{
                                                sqr: '0.004',
                                                points: {
                                                    R1: { top: 1.5, mid: 2.5, bot: 3.5 },
                                                    R2: { top: 0.2, mid: 0.3, bot: 0.4 }
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormCeramicCheckEDW 
    name="test_CeramicEDW_Enhanced" 
    standard={{ min: -0.01, max: 0.01 }}
    defaultValue={{
        sqr: '0.004',
        points: { 
            R1: { top: 1.5, mid: 2.5, bot: 3.5 },
            R2: { top: 0.2, mid: 0.3, bot: 0.4 } 
        }
    }}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormCheckedBox */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormCheckedBox</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormCheckedBox
                                            name="test_FormCheckedBox"
                                            label="CHECKED BY / DATE"
                                            defaultValue={{ name: 'John Doe', date: '18/02/2026' }}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormCheckedBox 
    name="test_FormCheckedBox" 
    label="CHECKED BY / DATE"
    defaultValue={{ name: 'John Doe', date: '18/02/2026' }}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormChecknumber */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormChecknumber</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormChecknumber
                                            name="test_FormChecknumber"
                                            label="Sample Number"
                                            minStd={10}
                                            maxStd={20}
                                            unit="mm"
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormChecknumber 
    name="test_FormChecknumber" 
    label="Sample Number" 
    minStd={10} 
    maxStd={20}
    unit="mm"
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormDateInput */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormDateInput</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormDateInput
                                            name="test_FormDateInput"
                                            label="Sample Date"
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormDateInput 
    name="test_FormDateInput" 
    label="Sample Date" 
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormDoubleCheckTable */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormDoubleCheckTable</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormDoubleCheckTable
                                            title="Main Panel Torque Check (Batch 2)"
                                            fieldPrefix="test_dc_enhanced"
                                            rows={[
                                                {
                                                    id: "M01",
                                                    partName: "Main Bracket",
                                                    qty: 4,
                                                    torque: "120-130",
                                                    modelLabel: "TYPE-A",
                                                    subParts: ["Washer M12", "Bolt M12x40"]
                                                },
                                                {
                                                    id: "M02",
                                                    partName: "Side Support",
                                                    qty: 2,
                                                    torque: "80-90",
                                                    modelLabel: "TYPE-B",
                                                    subParts: ["M8 Bolt"]
                                                }
                                            ]}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormDoubleCheckTable 
    title="Main Panel Torque Check (Batch 2)"
    fieldPrefix="test_dc_enhanced"
    rows={[
        { 
            id: "M01", partName: "Main Bracket", qty: 4, torque: "120-130", modelLabel: "TYPE-A",
            subParts: ["Washer M12", "Bolt M12x40"] 
        },
        { 
            id: "M02", partName: "Side Support", qty: 2, torque: "80-90", modelLabel: "TYPE-B",
            subParts: ["M8 Bolt"] 
        }
    ]}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormEDMBodyCheckTable */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormEDMBodyCheckTable</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormEDMBodyCheckTable
                                            name="test_EDMBody_Enhanced"
                                            defaultValue={[
                                                {
                                                    no: 1,
                                                    partName: "X-Axis LM-Guide",
                                                    points: [
                                                        { check: "Tightness", qty: 8, torque: "150 Nm" },
                                                        { check: "Leveling", qty: 4, torque: "-" }
                                                    ]
                                                },
                                                {
                                                    no: 2,
                                                    partName: "Y-Axis Bed Bolt",
                                                    points: [
                                                        { check: "Mounting", qty: 12, torque: "220 Nm" }
                                                    ]
                                                }
                                            ]}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormEDMBodyCheckTable 
    name="test_EDMBody_Enhanced" 
    defaultValue={[
        { 
            no: 1, partName: "X-Axis LM-Guide", 
            points: [
                { check: "Tightness", qty: 8, torque: "150 Nm" },
                { check: "Leveling", qty: 4, torque: "-" }
            ] 
        },
        { 
            no: 2, partName: "Y-Axis Bed Bolt", 
            points: [{ check: "Mounting", qty: 12, torque: "220 Nm" }] 
        }
    ]}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormEDMCoilMagnetCheck */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormEDMCoilMagnetCheck</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormEDMCoilMagnetCheck
                                            name="test_CoilMagnet"
                                            title="MAGNET PLATE SPEC"
                                            config={[
                                                { axis: 'X', specs: ['Spec 1', 'Spec 2'] }
                                            ]}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormEDMCoilMagnetCheck 
    name="test_CoilMagnet" 
    title="MAGNET PLATE SPEC"
    config={[
        { axis: 'X', specs: ['Spec 1', 'Spec 2'] }
    ]}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormEDMCoilTubeCheck */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormEDMCoilTubeCheck</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormEDMCoilTubeCheck
                                            name="test_CoilTube"
                                            axes={[
                                                { key: 'x', label: 'x' },
                                                { key: 'ykc', label: 'Y(KC)' },
                                                { key: 'ykb', label: 'Y(KB)' }
                                            ]}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormEDMCoilTubeCheck 
    name="test_CoilTube" 
    axes={[
        { key: 'x', label: 'x' },
        { key: 'ykc', label: 'Y(KC)' },
        { key: 'ykb', label: 'Y(KB)' }
    ]}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormEDMLevelCeramic */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormEDMLevelCeramic</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <div className="max-w-md mx-auto">
                                            <FormEDMLevelCeramic
                                                name="test_LevelCeramic"
                                                standardX={20}
                                                standardY={20}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormEDMLevelCeramic 
    name="test_LevelCeramic" 
    standardX={20}
    standardY={20}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormEDMTablePitchingX */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormEDMTablePitchingX</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormEDMTablePitchingX
                                            name="test_PitchX"
                                            cols={5}
                                            standards={[
                                                { min: -2, max: 2, arrow: '+' },
                                                { min: -2, max: 2, arrow: '-' }
                                            ]}
                                            showStd={true}
                                            validateStd={true}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormEDMTablePitchingX 
    name="test_PitchX" 
    cols={5}
    standards={[
        { min: -2, max: 2, arrow: '+' },
        { min: -2, max: 2, arrow: '-' }
    ]}
    showStd={true}
    validateStd={true}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormEDMTablePitchingY */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormEDMTablePitchingY</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormEDMTablePitchingY
                                            name="test_PitchY"
                                            rows={5}
                                            standards={[
                                                { min: -2, max: 2, arrow: '+' },
                                                { min: -2, max: 2, arrow: '-' }
                                            ]}
                                            showStd={true}
                                            validateStd={true}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormEDMTablePitchingY 
    name="test_PitchY" 
    rows={5}
    standards={[
        { min: -2, max: 2, arrow: '+' },
        { min: -2, max: 2, arrow: '-' }
    ]}
    showStd={true}
    validateStd={true}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormEDMTableRollingX */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormEDMTableRollingX</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormEDMTableRollingX
                                            name="test_RollingX"
                                            cols={5}
                                            standards={[
                                                { min: -2, max: 2 },
                                                { min: -2, max: 2 }
                                            ]}
                                            showStd={true}
                                            validateStd={true}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormEDMTableRollingX 
    name="test_RollingX" 
    cols={5}
    standards={[
        { min: -2, max: 2 },
        { min: -2, max: 2 }
    ]}
    showStd={true}
    validateStd={true}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormEDMTableRollingY */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormEDMTableRollingY</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormEDMTableRollingY
                                            name="test_RollingY"
                                            rows={5}
                                            standards={[
                                                { min: -2, max: 2 },
                                                { min: -2, max: 2 }
                                            ]}
                                            showStd={true}
                                            validateStd={true}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormEDMTableRollingY 
    name="test_RollingY" 
    rows={5}
    standards={[
        { min: -2, max: 2 },
        { min: -2, max: 2 }
    ]}
    showStd={true}
    validateStd={true}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormEDMTableStraightness */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormEDMTableStraightness</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <div className="mx-auto">
                                            <FormEDMTableStraightness
                                                name="test_Straightness"
                                                title="Straight of X Axis"
                                                rowCount={10}
                                                strokeStep={20}
                                                standard={3}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormEDMTableStraightness 
    name="test_Straightness" 
    title="Straight of X Axis"
    rowCount={10}
    strokeStep={20}
    standard={3}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormEDMYawingX */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormEDMYawingX</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormEDMYawingX
                                            name="test_YawingX"
                                            stdYawing={2}
                                            stdSquare={10}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormEDMYawingX 
    name="test_YawingX" 
    stdYawing={2}
    stdSquare={10}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormEDMYawingY */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormEDMYawingY</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormEDMYawingY
                                            name="test_YawingY"
                                            stdYawing={2}
                                            stdSquare={10}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormEDMYawingY 
    name="test_YawingY" 
    stdYawing={2}
    stdSquare={10}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormEDMparallelX */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormEDMparallelX</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormEDMparallelX
                                            name="test_ParallelX"
                                            rows={5}
                                            standards={[
                                                { min: -5, max: 5 },
                                                { min: -5, max: 5 }
                                            ]}
                                            showStd={true}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormEDMparallelX 
    name="test_ParallelX" 
    rows={5}
    standards={[
        { min: -5, max: 5 },
        { min: -5, max: 5 }
    ]}
    showStd={true}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormEDMparallelY */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormEDMparallelY</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormEDMparallelY
                                            name="test_ParallelY"
                                            rows={5}
                                            standards={[
                                                { min: -5, max: 5 },
                                                { min: -5, max: 5 }
                                            ]}
                                            showStd={true}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormEDMparallelY 
    name="test_ParallelY" 
    rows={5}
    standards={[
        { min: -5, max: 5 },
        { min: -5, max: 5 }
    ]}
    showStd={true}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormEDWVersionCheck */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormEDWVersionCheck</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormEDWVersionCheck prefix="v1_" />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormEDWVersionCheck prefix="v1_" />`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormEDWYawingX */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormEDWYawingX</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormEDWYawingX
                                            name="test_EDWYawingX"
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormEDWYawingX 
    name="test_EDWYawingX" 
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormHorizontalTableSingleRow */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormHorizontalTableSingleRow</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormHorizontalTableSingleRow
                                            name="test_HorizontalRow"
                                            header="Point No."
                                            label="Z Axis (H)"
                                            cols={7}
                                            headerStart={1}
                                            axis="x"
                                            standard={0.05}
                                            showArrows={true}
                                            validateStd={true}
                                            standards={[
                                                { maxDiff: 0.02 }, // Point 1 specific std
                                                { maxDiff: 0.05 }, // Point 2
                                                { maxDiff: 0.05 },
                                                { maxDiff: 0.08 }, // Point 4 specific
                                                { maxDiff: 0.05 },
                                                { maxDiff: 0.05 },
                                                { maxDiff: 0.05 }
                                            ]}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormHorizontalTableSingleRow 
    name="test_HorizontalRow" 
    header="Point No."
    label="Z Axis (H)"
    cols={7}
    headerStart={1}
    axis="x"
    standard={0.05}
    showArrows={true}
    validateStd={true}
    standards={[
        { maxDiff: 0.02 }, // Point 1
        { maxDiff: 0.05 },
        { maxDiff: 0.05 },
        { maxDiff: 0.08 }, // Point 4
        { maxDiff: 0.05 },
        { maxDiff: 0.05 },
        { maxDiff: 0.05 }
    ]}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormInputCheckSTD */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormInputCheckSTD</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormInputCheckSTD
                                            name="test_InputSTD"
                                            label="Voltage"
                                            unit="V"
                                            minStd={210}
                                            maxStd={230}
                                            validateStd={true}
                                            showCheckbox={true}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormInputCheckSTD 
    name="test_InputSTD" 
    label="Voltage"
    unit="V"
    minStd={210}
    maxStd={230}
    validateStd={true}
    showCheckbox={true}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormItemCheck */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormItemCheck</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full">
                                        {/* Basic Mode */}
                                        <div className="mb-4 pb-4 border-b">
                                            <h4 className="text-sm font-semibold mb-2">Basic: Checkbox + Label + Input</h4>
                                            <FormItemCheck
                                                name="test_ItemCheck_Basic"
                                                label="1. Measure X-Axis Gap:"
                                                input={{
                                                    name: "test_ItemCheck_Gap_Val",
                                                    suffix: "mm",
                                                    width: "120px"
                                                }}
                                            />
                                        </div>
                                        {/* Ultra-Advance Mode */}
                                        <div>
                                            <h4 className="text-sm font-semibold mb-2">Ultra-Advance: Multi-Item Row</h4>
                                            <FormItemCheck
                                                name="test_ItemCheck_Ultra"
                                                items={[
                                                    { label: "Offset:" },
                                                    { input: { name: "ultra_offset", width: "60px", suffix: "m" } },
                                                    { label: " | Factor:" },
                                                    { input: { name: "ultra_factor", width: "50px" } },
                                                    { label: " [Verified]", className: "text-green-600 font-bold" }
                                                ]}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`{/* Basic Mode */}
<FormItemCheck 
    name="test_ItemCheck_Basic" 
    label="1. Measure X-Axis Gap:"
    input={{ name: "test_ItemCheck_Gap_Val", suffix: "mm", width: "120px" }}
/>

{/* Ultra-Advance Mode (Complex Array) */}
<FormItemCheck 
    name="test_ItemCheck_Ultra" 
    items={[
        { label: "Offset:" },
        { input: { name: "ultra_offset", width: "60px", suffix: "m" } },
        { label: " | Factor:" },
        { input: { name: "ultra_factor", width: "50px" } },
        { label: " [Verified]", className: "text-green-600 font-bold" }
    ]}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormLevelTableWithDirections */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormLevelTableWithDirections</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormLevelTableWithDirections
                                            name="test_LevelWithDir_Enhanced"
                                            direction="pitching"
                                            rows={8}
                                            labelStd="STD Diff (±0.005)"
                                            standards={[
                                                { min: -0.005, max: 0.005 },
                                                { min: -0.01, max: 0.01 },
                                                { min: -0.005, max: 0.005 },
                                                { min: -0.005, max: 0.005 }
                                            ]}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormLevelTableWithDirections 
    name="test_LevelWithDir_Enhanced" 
    direction="pitching"
    rows={8}
    labelStd="STD Diff (±0.005)"
    standards={[
        { min: -0.005, max: 0.005 }, { min: -0.01, max: 0.01 },
        { min: -0.005, max: 0.005 }, { min: -0.005, max: 0.005 }
    ]}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormLevelTableXAB */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormLevelTableXAB</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormLevelTableXAB
                                            name="test_LevelXAB_Enhanced"
                                            cols={9}
                                            showStd={true}
                                            sd={['0', '50', '100', '150', '200', '250', '300', '350', 'Max']}
                                            standards={[
                                                { min: -10, max: 10, arrow: '+' },
                                                { min: -10, max: 10, arrow: '-' },
                                                { min: 0, max: 20 },
                                                { min: -5, max: 5 },
                                                { min: -5, max: 5 }
                                            ]}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormLevelTableXAB 
    name="test_LevelXAB_Enhanced" 
    cols={9}
    showStd={true}
    sd={['0', '50', '100', '150', '200', '250', '300', '350', 'Max']}
    standards={[
        { min: -10, max: 10, arrow: '+' }, { min: -10, max: 10, arrow: '-' },
        { min: 0, max: 20 }, { min: -5, max: 5 }
    ]}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormLevelTableXStdAct */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormLevelTableXStdAct</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormLevelTableXStdAct
                                            name="test_XStdAct"
                                            groups={[
                                                {
                                                    label: 'X1 Axis (Linear)',
                                                    sd: ['0', '→50', '→100', '→150', '→200', '0', '←50', '←100', '←150', '←200'],
                                                    tolerance: 0.005
                                                },
                                                {
                                                    label: 'X2 Axis (Reference)',
                                                    sd: ['0', '→20', '→40', '→60', '0'],
                                                    tolerance: 0.002
                                                }
                                            ]}
                                            cols={10}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormLevelTableXStdAct 
    name="test_XStdAct" 
    groups={[
        { 
            label: 'X1 Axis (Linear)', 
            sd: ['0', '→50', '→100', '→150', '→200', '0', '←50', '←100', '←150', '←200'], 
            tolerance: 0.005 
        },
        { 
            label: 'X2 Axis (Reference)', 
            sd: ['0', '→20', '→40', '→60', '0'], 
            tolerance: 0.002 
        }
    ]}
    cols={10}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormLevelTableYAB */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormLevelTableYAB</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormLevelTableYAB
                                            name="test_LevelYAB"
                                            rows={5}
                                            showStd={true}
                                            showC={true}
                                            standards={[
                                                { min: -0.01, max: 0.01 },
                                                { min: -0.02, max: 0.02 },
                                                { min: -0.015, max: 0.015 },
                                                { min: -0.01, max: 0.01 },
                                                { min: 0, max: 0.005 } // Specific for last row
                                            ]}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormLevelTableYAB 
    name="test_LevelYAB" 
    rows={5}
    showStd={true}
    showC={true}
    standards={[
        { min: -0.01, max: 0.01 },
        { min: -0.02, max: 0.02 },
        { min: -0.015, max: 0.015 },
        { min: -0.01, max: 0.01 },
        { min: 0, max: 0.005 }
    ]}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormQuickTable */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormQuickTable</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormQuickTable
                                            navigationMode="vertical"
                                            headerRows={[
                                                [
                                                    { header: "Complex Header Example", colSpan: 4, className: "bg-blue-100 py-2" }
                                                ],
                                                [
                                                    { header: "Group", rowSpan: 1, width: "80px" },
                                                    { header: "Status", colSpan: 2, width: "160px" },
                                                    { header: "Value", width: "120px" }
                                                ]
                                            ]}
                                            columns={[
                                                { header: "Group", key: "group", rowGroup: true, width: "80px" },
                                                { header: "Tri", key: "tri", type: 'tristate', width: "80px", headerCheckbox: "header_tri_all" },
                                                { header: "Check", key: "chk", type: 'checkbox', width: "80px" },
                                                { header: "Input", key: "val", type: 'input', width: "120px", suffix: "mm" }
                                            ]}
                                            data={[
                                                { group: "A", tri: "a1_status", chk: "a1_chk", val: "a1_val", val_min: 0, val_max: 10, suffix: "µm" },
                                                { group: "A", tri: "a2_status", chk: "a2_chk", val: "a2_val", val_expected: "5.0" },
                                                { group: "B", tri: "b1_status", chk: "b1_chk", val: "b1_val", type: 'label' },
                                                { group: "B", tri: "b2_status", chk: "b2_chk", val: "b2_val_input", type: 'input', val_min: -5, val_max: 5 }
                                            ]}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormQuickTable 
    navigationMode="vertical"
    headerRows={[
        [{ header: "Complex Header Example", colSpan: 4, className: "bg-blue-100 py-2" }],
        [
            { header: "Group", width: "80px" },
            { header: "Status", colSpan: 2, width: "160px" },
            { header: "Value", width: "120px" }
        ]
    ]}
    columns={[
        { header: "Group", key: "group", rowGroup: true, width: "80px" },
        { header: "Tri", key: "tri", type: 'tristate', width: "80px", headerCheckbox: "header_tri_all" },
        { header: "Check", key: "chk", type: 'checkbox', width: "80px" },
        { header: "Input", key: "val", type: 'input', width: "120px", suffix: "mm" }
    ]}
    data={[
        { group: "A", tri: "a1_status", chk: "a1_chk", val: "a1_val", val_min: 0, val_max: 10, suffix: "µm" },
        { group: "A", tri: "a2_status", chk: "a2_chk", val: "a2_val", val_expected: "5.0" },
        { group: "B", tri: "b1_status", chk: "b1_chk", val: "b1_val", type: 'label' },
        { group: "B", tri: "b2_status", chk: "b2_chk", val: "b2_val_input", type: 'input', val_min: -5, val_max: 5 }
    ]}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormSQRgrapX */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormSQRgrapX</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormSQRgrapX
                                            name="test_SQRGraphX"
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormSQRgrapX 
    name="test_SQRGraphX" 
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormSquareCheckGraph */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormSquareCheckGraph</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormSquareCheckGraph
                                            name="test_SquareCheckGraph"
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormSquareCheckGraph 
    name="test_SquareCheckGraph" 
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormSquareCheckSQRGraph */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormSquareCheckSQRGraph</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormSquareCheckSQRGraph
                                            name="test_SQRCheck_Enhanced"
                                            defaultValue={{
                                                resultY: '8.5',
                                                points: {
                                                    top: 1.2,
                                                    mid1: 2.5,
                                                    mid2: 1.8,
                                                    bot: 0.5,
                                                    extra: 3.3
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormSquareCheckSQRGraph 
    name="test_SQRCheck_Enhanced" 
    defaultValue={{ 
        resultY: '8.5', 
        points: { top: 1.2, mid1: 2.5, mid2: 1.8, bot: 0.5, extra: 3.3 } 
    }}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormStartFinishTime */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormStartFinishTime</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormStartFinishTime
                                            name="test_Time"
                                            minHours={2}
                                            validateStd={true}
                                            defaultValue={{ startTime: '08:00', finishTime: '17:00' }}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormStartFinishTime 
    name="test_Time" 
    minHours={2}
    validateStd={true}
    defaultValue={{ startTime: '08:00', finishTime: '17:00' }}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormStoneTableGrid */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormStoneTableGrid</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormStoneTableGrid
                                            name="test_StoneGrid"
                                            maxName="test_StoneGrid_max"
                                            minName="test_StoneGrid_min"
                                            difName="test_StoneGrid_dif"
                                            dialGaugeNoName="test_StoneGrid_dial"
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormStoneTableGrid 
    name="test_StoneGrid" 
    maxName="test_StoneGrid_max"
    minName="test_StoneGrid_min"
    difName="test_StoneGrid_dif"
    dialGaugeNoName="test_StoneGrid_dial"
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormTableEnto */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormTableEnto</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormTableEnto
                                            name="test_TableEnto"
                                            axisLabel="Z1L"
                                            rowCount={21}
                                            stepSize={20}
                                            maxValue={15}
                                            maxDiff={1}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormTableEnto 
    name="test_TableEnto" 
    axisLabel="Z1L"
    rowCount={21}
    stepSize={20}
    maxValue={15}
    maxDiff={1}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormTableEntoDual */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormTableEntoDual</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormTableEntoDual
                                            name="test_TableEntoDual"
                                            rowCount={21}
                                            stepSize={20}
                                            maxValue={15}
                                            maxDiff={1}
                                            formula="A-B"
                                            maxFormula={2}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormTableEntoDual 
    name="test_TableEntoDual" 
    rowCount={21}
    stepSize={20}
    maxValue={15}
    maxDiff={1}
    formula="A-B"
    maxFormula={2}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormTableEntoSingleDir */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormTableEntoSingleDir</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormTableEntoSingleDir
                                            name="test_EntoSingle_Enhanced"
                                            sections={[
                                                { label: 'U-Axis Up (Linear)', cols: ['U1', 'U2', 'U3'] },
                                                { label: 'V-Axis Down (Ref)', cols: ['V1', 'V2'] }
                                            ]}
                                            rowCount={10}
                                            stepSize={50}
                                            topHeader="FULL PITCH CALIBRATION"
                                            maxValue={20}
                                            required={true}
                                            standard={{ min: -15, max: 15 }}
                                            headerImage="https://placehold.co/100x40?text=Ento+Ref"
                                            headerControl={{
                                                entoNo: 'ento_serial_001',
                                                selection: 'calibration_mode_auto'
                                            }}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormTableEntoSingleDir 
    name="test_EntoSingle_Enhanced" 
    sections={[
        { label: 'U-Axis Up (Linear)', cols: ['U1', 'U2', 'U3'] },
        { label: 'V-Axis Down (Ref)', cols: ['V1', 'V2'] }
    ]}
    rowCount={10} stepSize={50}
    topHeader="FULL PITCH CALIBRATION"
    maxValue={20}
    standard={{ min: -15, max: 15 }}
    headerControl={{ entoNo: 'ento_serial_001', selection: 'mode_auto' }}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormTablePitchCheck */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormTablePitchCheck</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormTablePitchCheck
                                            name="test_PitchCheck"
                                            axisLabel="X1"
                                            rowCount={5}
                                            stepSize={20}
                                            maxAB={15}
                                            maxDiff={1}
                                            showCalcCol={true}
                                            enabled={true}
                                            minVal={0}
                                            disableTopRowB={true}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormTablePitchCheck 
    name="test_PitchCheck" 
    axisLabel="X1"
    rowCount={5}
    stepSize={20}
    maxAB={15}
    maxDiff={1}
    showCalcCol={true}
    enabled={true}
    minVal={0}
    disableTopRowB={true}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormTablePitchXYZUV */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormTablePitchXYZUV</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormTablePitchXYZUV
                                            name="test_PitchXYZUV_Enhanced"
                                            rowCount={5}
                                            stepSize={100}
                                            maxAB={25}
                                            maxDiff={2}
                                            showCalcCol={true}
                                            tableLabels={['X Axis', 'Y Axis', 'Z Axis', 'U Axis', 'V Axis']}
                                            standards={[
                                                { min: -10, max: 10 }, // X
                                                { min: -10, max: 10 }, // Y
                                                { min: -20, max: 20 }, // Z
                                                { min: -5, max: 5 },   // U
                                                { min: -5, max: 5 }    // V
                                            ]}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormTablePitchXYZUV 
    name="test_PitchXYZUV_Enhanced" 
    rowCount={5} stepSize={100}
    maxAB={25} maxDiff={2}
    showCalcCol={true}
    tableLabels={['X Axis', 'Y Axis', 'Z Axis', 'U Axis', 'V Axis']}
    standards={[
        { min: -10, max: 10 }, { min: -10, max: 10 }, { min: -20, max: 20 },
        { min: -5, max: 5 }, { min: -5, max: 5 }
    ]}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormTablePitchXYZUVBigmodel */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormTablePitchXYZUVBigmodel</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormTablePitchXYZUVBigmodel
                                            name="test_PitchXYZUV_Big"
                                            rowCount={10}
                                            stepSize={20}
                                            maxAB={15}
                                            maxDiff={1}
                                            showCalcCol={true}
                                            tableLabels={['X1L', 'X1H', 'X2L', 'X2H']}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormTablePitchXYZUVBigmodel 
    name="test_PitchXYZUV_Big" 
    rowCount={10}
    stepSize={20}
    maxAB={15}
    maxDiff={1}
    showCalcCol={true}
    tableLabels={['X1L', 'X1H', 'X2L', 'X2H']}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormTablePitchingX */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormTablePitchingX</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormTablePitchingX
                                            name="test_PitchingX_Enhanced"
                                            standard={{ min: -10, max: 10 }}
                                            referenceCol={2}
                                            standards={[
                                                { min: -5, max: 5 },
                                                { min: -10, max: 10 },
                                                { min: -8, max: 8 }
                                            ]}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormTablePitchingX 
    name="test_PitchingX_Enhanced" 
    standard={{ min: -10, max: 10 }}
    referenceCol={2}
    standards={[
        { min: -5, max: 5 }, { min: -10, max: 10 }, { min: -8, max: 8 }
    ]}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormTablePitchingY */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormTablePitchingY</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormTablePitchingY
                                            name="test_PitchingY"
                                            standard={{ min: -10, max: 10 }}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormTablePitchingY 
    name="test_PitchingY" 
    standard={{ min: -10, max: 10 }}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormTableRollingX */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormTableRollingX</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormTableRollingX
                                            name="test_RollingX_Enhanced"
                                            standard={{ min: -15, max: 15 }}
                                            showRowT={true}
                                            standards={[
                                                { min: -10, max: 10 },
                                                { min: -12, max: 12 },
                                                { min: -15, max: 15 }
                                            ]}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormTableRollingX 
    name="test_RollingX_Enhanced" 
    standard={{ min: -15, max: 15 }}
    showRowT={true}
    standards={[
        { min: -10, max: 10 }, { min: -12, max: 12 }, { min: -15, max: 15 }
    ]}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormTableRollingY */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormTableRollingY</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormTableRollingY
                                            name="test_RollingY"
                                            standard={{ min: -15, max: 15 }}
                                            showColC={true}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormTableRollingY 
    name="test_RollingY" 
    standard={{ min: -15, max: 15 }}
    showColC={true}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormTableStraightness */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormTableStraightness</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormTableStraightness
                                            name="test_Straightness"
                                            rows={16}
                                            standards={[]}
                                            showStd={true}
                                            validateStd={true}
                                            axisLabel="Z Axis."
                                            topLabel="Top Data"
                                            sideLabel="Side Data"
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormTableStraightness 
    name="test_Straightness" 
    rows={16} 
    standards={[]} 
    showStd={true} 
    validateStd={true}
    axisLabel="Z Axis."
    topLabel="Top Data"
    sideLabel="Side Data"
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormTableXABDIFF */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormTableXABDIFF</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormTableXABDIFF
                                            name="test_XABDIFF_Enhanced"
                                            cols={5}
                                            standards={[
                                                { min: 0, max: 2, arrow: '+' },
                                                { min: -1, max: 1 },
                                                { min: 0, max: 5, arrow: '-' },
                                                { min: 10, max: 20 },
                                                { min: 0, max: 0.5 }
                                            ]}
                                            showStd={true}
                                            validateStd={true}
                                            useArrow={true}
                                            labelA="Input A"
                                            labelB="Input B"
                                            labelDiff="Calculated Result"
                                            calcType="sum"
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormTableXABDIFF 
    name="test_XABDIFF_Enhanced" 
    cols={5}
    standards={[
        { min: 0, max: 2, arrow: '+' }, { min: -1, max: 1 },
        { min: 0, max: 5, arrow: '-' }, { min: 10, max: 20 },
        { min: 0, max: 0.5 }
    ]}
    labelA="Input A" labelB="Input B" labelDiff="Result" calcType="sum"
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormTableXPR */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormTableXPR</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormTableXPR
                                            name="test_XPR_Enhanced"
                                            cols={5}
                                            referenceCol={2}
                                            defaultValue={{
                                                p: ['', '', '0', '', ''],
                                                r: ['', '', '0', '', '']
                                            }}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormTableXPR 
    name="test_XPR_Enhanced" 
    cols={5}
    referenceCol={2}
    defaultValue={{ p: ['', '', '0', '', ''], r: ['', '', '0', '', ''] }}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormTableYABDIFF */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormTableYABDIFF</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormTableYABDIFF
                                            name="test_YABDIFF_Enhanced"
                                            rows={5}
                                            standards={[
                                                { min: -1, max: 1, arrow: 'up' },
                                                { min: 0, max: 5, arrow: 'down' },
                                                { min: -2, max: 2 },
                                                { min: 10, max: 12 },
                                                { min: 0, max: 1, arrow: 'up' }
                                            ]}
                                            showStd={true}
                                            validateStd={true}
                                            labelA="Top Val"
                                            labelB="Bot Val"
                                            labelDiff="Absolute Diff"
                                            diffMode="abs"
                                            axis="y"
                                            showArrows={true}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormTableYABDIFF 
    name="test_YABDIFF_Enhanced" 
    rows={5}
    standards={[
        { min: -1, max: 1, arrow: 'up' }, { min: 0, max: 5, arrow: 'down' },
        { min: -2, max: 2 }, { min: 10, max: 12 }, { min: 0, max: 1, arrow: 'up' }
    ]}
    labelA="Top Val" labelB="Bot Val" labelDiff="Abs Diff"
    diffMode="abs" axis="y" showArrows={true}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormTableYPR */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormTableYPR</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormTableYPR
                                            name="test_YPR_Enhanced"
                                            rows={5}
                                            referenceRow={2}
                                            defaultValue={[
                                                { p: '', r: '' },
                                                { p: '', r: '' },
                                                { p: '0', r: '0' },
                                                { p: '', r: '' },
                                                { p: '', r: '' }
                                            ]}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormTableYPR 
    name="test_YPR_Enhanced" 
    rows={5}
    referenceRow={2}
    defaultValue={[
        {p: '', r: ''}, {p: '', r: ''}, {p: '0', r: '0'}, 
        {p: '', r: ''}, {p: '', r: ''}
    ]}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormValidatedCell */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormValidatedCell</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <table className="border-collapse border border-black">
                                            <tbody>
                                                <tr>
                                                    <td className="border border-black px-2 py-1 bg-gray-100">Test Cell</td>
                                                    <FormValidatedCell
                                                        name="test_ValidatedCell"
                                                        min={0}
                                                        max={10}
                                                        className="bg-yellow-50"
                                                        inputClassName="font-bold"
                                                        placeholder="Enter 0-10"
                                                    />
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormValidatedCell 
    name="test_ValidatedCell" 
    min={0} 
    max={10} 
    className="bg-yellow-50"
    inputClassName="font-bold"
    placeholder="Enter 0-10"
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormWorkstandCheck */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormWorkstandCheck</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormWorkstandCheck
                                            name="test_WorkstandCheck_Enhanced"
                                            defaultValue={{
                                                a: ['0.1', '0.2', '0.1', '0.3', '0.2', '0.1'],
                                                b: ['0.5', '0.5', '0.6', '0.4', '0.4', '0.5', '', '', '0.5', '0.4', '0.4', '0.5'],
                                                c: ['0.1', '0.1', '0.2', '0.2', '0.1', '0.1'],
                                                d: ['0.2', '0.2', '0.3', '0.3', '0.2', '0.2', '0.3', '0.3', '0.2', '0.2', '0.3', '0.3']
                                            }}
                                            maxDiff={10}
                                            maxCornerDiff={7}
                                            maxTotalDiff={12}
                                            maxAdjacentDiff={6}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormWorkstandCheck 
    name="test_WorkstandCheck_Enhanced" 
    defaultValue={{ 
        a: ['0.1', ...], b: ['0.5', ...], 
        c: ['0.1', ...], d: ['0.2', ...] 
    }}
    maxDiff={10}
    maxCornerDiff={7}
    maxTotalDiff={12}
    maxAdjacentDiff={6}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormYawingUV */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormYawingUV</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormYawingUV
                                            name="test_YawingUV"
                                            defaultValue={{ u: { top: 0, bot: 0 }, v: { top: 0, bot: 0 } }}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormYawingUV 
    name="test_YawingUV" 
    defaultValue={{ u: { top: 0, bot: 0 }, v: { top: 0, bot: 0 } }}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* FormYawingY */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">FormYawingY</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <FormYawingY
                                            name="test_YawingY"
                                            defaultValue={{ points: { head: 0, tail: 0 } }}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<FormYawingY 
    name="test_YawingY" 
    defaultValue={{ points: { head: 0, tail: 0 } }}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* ImageUploadBox */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">ImageUploadBox</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <ImageUploadBox
                                            name="test_ImageUpload"
                                            apiEndpoint="http://localhost:3000/api"
                                            uploadPath="/upload/assy"
                                            label="Upload Assembly Image"
                                            deferred={false}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<ImageUploadBox 
    name="test_ImageUpload" 
    apiEndpoint="http://localhost:3000/api"
    uploadPath="/upload/assy"
    label="Upload Assembly Image"
    deferred={false}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* InputWithArrow */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">InputWithArrow</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <InputWithArrow
                                            value="5.2"
                                            axis="y"
                                            showArrows={true}
                                            className="border rounded px-2"
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<InputWithArrow 
    value="5.2" 
    axis="y" 
    showArrows={true}
    className="border rounded px-2"
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* ShapedCheckGroup */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">ShapedCheckGroup</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <ShapedCheckGroup
                                            name="test_Shaped_Enhanced"
                                            apiEndpoint="http://localhost:3000/api"
                                            uploadFolder="audit_logs"
                                            extraData={{ machine_no: 'MXL-99', inspector: 'S. Tech' }}
                                            required={true}
                                            visibleShapes={[1, 2, 4, 5]}
                                            showCamera={true}
                                            options={[
                                                { label: "Surface Finish", key: "sf" },
                                                { label: "Edge Sharpness", key: "es" },
                                                { label: "Coating Uniformity", key: "cu" }
                                            ]}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<ShapedCheckGroup 
    name="test_Shaped_Enhanced" 
    apiEndpoint="http://localhost:3000/api"
    uploadFolder="audit_logs"
    extraData={{ machine_no: 'MXL-99', inspector: 'S. Tech' }}
    required={true}
    visibleShapes={[1, 2, 4, 5]}
    showCamera={true}
    options={[
        { label: "Surface Finish", key: "sf" },
        { label: "Edge Sharpness", key: "es" },
        { label: "Coating Uniformity", key: "cu" }
    ]}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                            {/* TableCalculateSetting */}
                            <div className="mb-8 p-4 border rounded bg-white shadow-sm">
                                <h3 className="text-lg font-bold mb-2 text-blue-600">TableCalculateSetting</h3>
                                <div className="flex gap-4 items-start flex-col">
                                    <div className="p-4 border rounded bg-gray-50 w-full overflow-x-auto">
                                        <TableCalculateSetting
                                            multiplier={1.5}
                                            registerPrefix="test_Calc_Audit"
                                            startIndex={1}
                                            title="High-Precision Scale Audit"
                                            calculatedRowsCount={8}
                                            enableScroll={true}
                                            headers={["Axis Val", "Actual", "Scale Result", "Calc Log", "Manual"]}
                                        />
                                    </div>
                                    <div className="w-full bg-gray-800 text-white p-4 rounded text-xs font-mono overflow-auto">
                                        <pre>{`<TableCalculateSetting 
    multiplier={1.5} 
    registerPrefix="test_Calc_Audit" 
    startIndex={1}
    title="High-Precision Scale Audit"
    calculatedRowsCount={8}
    enableScroll={true}
    headers={["Axis Val", "Actual", "Scale", "Log", "Manual"]}
/>`}</pre>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="mt-8 p-6 bg-white sticky bottom-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-center border-t border-blue-100">
                            <button
                                type="submit"
                                className="px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-tighter"
                            >
                                Submit & Verify Exhaustive Prop Data
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export default Test;