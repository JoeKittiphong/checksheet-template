import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0003_V2-setting";
import { useFormContext, Controller } from "react-hook-form";
import EDMCoilMagnetCheck from "@/components/PageComponent/EDMCoilMagnetCheck";

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

                <Controller
                    name="page22.magnetData"
                    control={control}
                    defaultValue={{}}
                    render={({ field }) => (
                        <EDMCoilMagnetCheck
                            title="MAGNET PLATE SPEC"
                            config={magnetConfig}
                            data={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />

                <Controller
                    name="page22.coilData"
                    control={control}
                    defaultValue={{}}
                    render={({ field }) => (
                        <EDMCoilMagnetCheck
                            title="LINEAR COIL SPEC"
                            config={coilConfig}
                            data={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />

                <Controller
                    name="page22.scaleData"
                    control={control}
                    defaultValue={{}}
                    render={({ field }) => (
                        <EDMCoilMagnetCheck
                            title="LINEAR SCALE SPEC"
                            config={scaleConfig}
                            data={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>
        </A4Paper>
    );
}

export default Page22;

