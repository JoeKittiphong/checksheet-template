import { useFormContext } from 'react-hook-form';
import A4Paper from '../components/UIcomponent/A4Paper';
import TableHeader from '../components/UIcomponent/TableHeader';
import InfoInputForm from '../components/UIcomponent/InfoInputForm';
import SignBox from '../components/UIcomponent/SignBox';

/**
 * CoverPage Component
 * หน้าปกของ Check Sheet รวม TableHeader, InfoInputForm, SignBox ภายใน A4Paper
 * 
 * @param {Object} props
 * @param {Object} props.headerData - ข้อมูลสำหรับ TableHeader
 */
function CoverPage({ headerData = {} }) {
    const { watch, setValue } = useFormContext();

    // Watch all relevant fields
    const formData = watch();

    // Wrapper to match InfoInputForm's expected onChange signature: (newFormData) => void
    // InfoInputForm returns the *entire* object, so we merge it back to form context
    const handleInfoChange = (arg1, arg2) => {
        // Handle (name, value) signature from InfoInputForm
        if (typeof arg1 === 'string') {
            const name = arg1;
            const value = arg2;

            if (name === 'machineNo') {
                setValue('machineNo', value, { shouldDirty: true });
                setValue('machine_no', value, { shouldDirty: true });
            } else {
                setValue(name, value, { shouldDirty: true });
            }
        }
        // Handle (updatesObject) signature from SignBox
        else if (typeof arg1 === 'object' && arg1 !== null) {
            Object.entries(arg1).forEach(([key, val]) => {
                if (key === 'machineNo') {
                    setValue('machineNo', val, { shouldDirty: true });
                    setValue('machine_no', val, { shouldDirty: true });
                } else {
                    setValue(key, val, { shouldDirty: true });
                }
            });
        }
    };

    return (
        <A4Paper innerPadding="p-4">
            {/* Main Title */}
            <h1 className="text-center text-3xl font-bold tracking-[0.3em] mb-8 text-black">
                COVER SHEET
            </h1>

            {/* Table Header */}
            <TableHeader
                docNumber={headerData.docNumber}
                version={headerData.version}
                dateOfIssue={headerData.dateOfIssue}
                approvalDate={headerData.approvalDate || 'N/A'}
                issuedBy={headerData.issuedBy}
                title={headerData.title}
            />

            {/* Info Input Form */}
            <InfoInputForm
                formData={formData}
                model={headerData.model} // Pass model explicitly from headerData
                onChange={handleInfoChange}
            />

            {/* Sign Boxes */}
            <SignBox
                formData={formData}
                onChange={handleInfoChange}
            />

            {/* Footer */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="text-lg font-medium text-black m-0">{headerData.company || 'Sodick ( Thailand ) Co., Ltd.'}</p>
            </div>
        </A4Paper>
    );
}

export default CoverPage;
