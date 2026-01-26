import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import FormEDMCoilMagnetCheck from "@/components/FormComponents/FormEDMCoilMagnetCheck";
import { useFormContext } from "react-hook-form";

function Page22() {
    const { control } = useFormContext();

    // Configuration for the three tables
    const magnetConfig = [
        { axis: 'X', specs: ['TM0016SD-001', 'TM028SD-001', 'TM028SD-001'] },
        { axis: 'Y', specs: ['TM0016SD-001', 'TM0016SD-001', 'TM0016SD-001', 'TM0016SD-001', 'TM028SD-001', 'TM028SD-001'] },
        { axis: 'Z', specs: ['MAGNET PLATE(QUILL)[AG60l]'] }
    ];

    const coilConfig = [
        { axis: 'X', specs: ['TC066GN-010'] },
        { axis: 'Y', specs: ['TC066GN-010', 'TC066GN-010'] },
        { axis: 'Z', specs: ['TC066GN-009', 'TC066GN-009'] }
    ];

    const scaleConfig = [
        { axis: 'X', specs: ['LC485 ML670'] },
        { axis: 'Y', specs: ['LC485 ML470'] },
        { axis: 'Z', specs: ['LC485 ML420'] }
    ];

    return (
        <A4Paper content={content} currentPage={22}>
            <div className="flex flex-col gap-2 p-1">
                <p className="text-sm font-bold uppercase mb-2">28. SPECIFICATION CHECK LIST </p>
                <FormEDMCoilMagnetCheck
                    name="page22.magnetData"
                    title="MAGNET PLATE SPEC"
                    config={magnetConfig}
                    defaultValue={{}}
                />
                <FormEDMCoilMagnetCheck
                    name="page22.coilData"
                    title="LINEAR COIL SPEC"
                    config={coilConfig}
                    defaultValue={{}}
                />
                <FormEDMCoilMagnetCheck
                    name="page22.scaleData"
                    title="LINEAR SCALE SPEC"
                    config={scaleConfig}
                    defaultValue={{}}
                />
            </div>
        </A4Paper>
    );
}

export default Page22;
