import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0006_V2-setting";
import FormEDMCoilMagnetCheck from "@/components/FormComponents/FormEDMCoilMagnetCheck";
import { useFormContext } from "react-hook-form";

function Page18() {
    const { control } = useFormContext();

    // Configuration for the three tables
    // Configuration for the three tables
    const magnetConfig = [
        { axis: 'X', specs: ['TM016SD-001', 'TM028SD-001', 'TM028SD-001'] },
        { axis: 'Y', specs: ['TM016SD-001', 'TM020SD-001', 'TM020SD-001', 'TM020SD-001'] },
        { axis: 'Z', specs: ['QUILL (WITH MAGNET) CM [AD55L]'] }
    ];

    const coilConfig = [
        { axis: 'X', specs: ['TC066GN-010'] },
        { axis: 'Y', specs: ['TC133EN-007'] },
        { axis: 'Z', specs: ['TC066GN-009', 'TC066GN-009'] }
    ];

    const scaleConfig = [
        { axis: 'X', specs: ['[AT1304A-700-S(559-510-04SD]'] },
        { axis: 'Y', specs: ['[AT1304A-500-S(559-508-04SD]'] },
        { axis: 'Z', specs: ['[AT1304A-500-S(559-508-04SD]'] }
    ];

    return (
        <A4Paper content={content} currentPage={18}>
            <div className="flex flex-col gap-2 p-1">
                <p className="text-sm font-bold uppercase mb-2">28. SPECIFICATION CHECK LIST </p>
                <FormEDMCoilMagnetCheck
                    name="page18.magnetData"
                    title="MAGNET PLATE SPEC"
                    config={magnetConfig}
                    defaultValue={{}}
                />
                <FormEDMCoilMagnetCheck
                    name="page18.coilData"
                    title="LINEAR COIL SPEC"
                    config={coilConfig}
                    defaultValue={{}}
                />
                <FormEDMCoilMagnetCheck
                    name="page18.scaleData"
                    title="LINEAR SCALE SPEC"
                    config={scaleConfig}
                    defaultValue={{}}
                />
            </div>
        </A4Paper>
    );
}

export default Page18;