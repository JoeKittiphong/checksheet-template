import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0008_V1-setting";
import FormEDMCoilMagnetCheck from "@/components/FormComponents/FormEDMCoilMagnetCheck";
import { useFormContext } from "react-hook-form";

function Page18() {
    const { control } = useFormContext();

    // Configuration for the three tables
    // Configuration for the three tables
    const magnetConfig = [
        { axis: 'X', specs: ['TM028SD-001', 'TM028SD-001', 'TM028SD-001', 'TM028SD-001', 'TM028SD-001'] },
        { axis: 'Y', specs: ['TM020SD-001', 'TM020SD-001', 'TM020SD-001', 'TM020SD-001', 'TM028SD-001', 'TM028SD-001', 'TM028SD-001', 'TM028SD-001'] },
        { axis: 'Z', specs: ['TM164QB-001'] }
    ];

    const coilConfig = [
        { axis: 'X', specs: ['TC133EN-003'] },
        { axis: 'Y', specs: ['TC133EN-007', 'TC133EN-007'] },
        { axis: 'Z', specs: ['TC133EN-006', 'TC133EN-006'] }
    ];

    const scaleConfig = [
        { axis: 'X', specs: ['LC485 ML1240'] },
        { axis: 'Y', specs: ['LC485 ML670'] },
        { axis: 'Z', specs: ['LC485 ML570'] }
    ];

    return (
        <A4Paper content={content} currentPage={18}>
            <div className="flex flex-col gap-2 p-1">
                <p className="text-sm font-bold uppercase mb-2">28. SPECIFICATION CHECK LIST </p>
                <FormEDMCoilMagnetCheck
                    name="Page18.magnetData"
                    title="MAGNET PLATE SPEC"
                    config={magnetConfig}
                    defaultValue={{}}
                />
                <FormEDMCoilMagnetCheck
                    name="Page18.coilData"
                    title="LINEAR COIL SPEC"
                    config={coilConfig}
                    defaultValue={{}}
                />
                <FormEDMCoilMagnetCheck
                    name="Page18.scaleData"
                    title="LINEAR SCALE SPEC"
                    config={scaleConfig}
                    defaultValue={{}}
                />
            </div>
        </A4Paper>
    );
}

export default Page18;

