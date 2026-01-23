import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0003_V2-setting";
import EDMBodyCheckTable from "@/components/PageComponent/EDMBodyCheckTable";
import { useFormContext, Controller } from "react-hook-form";
import Checknumber from "@/components/UIcomponent/Checknumber";

// Images
import image27 from "@/assets/FAMB0003_V2/image-27.png";

function Page20() {
    const { control } = useFormContext();

    const defaultBodyRows = [
        {
            no: 1,
            partName: "LM-GUIDE Y",
            points: [
                { check: "CS 6X25", qty: 26, torque: 150 },
                { check: "H.S.CTSK[M6X18(SCM)]", qty: 26, torque: 50 }
            ],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 2,
            partName: "MAGNET Y",
            points: [{ check: "CS 6X25", qty: 16, torque: 150 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 3,
            partName: "LINEAR COIL Y",
            points: [{ check: "CS 6X25", qty: 20, torque: 150 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 4,
            partName: "SADDLE TO BED",
            points: [{ check: "CS 8X35", qty: 24, torque: 250 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 5,
            partName: "MAGNET Y",
            points: [{ check: "CS 6X25", qty: 16, torque: 150 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 6,
            partName: "LM-GUIDE X",
            points: [
                { check: "CS 8X25", qty: 26, torque: 250 },
                { check: "H.S.CTSK[M6X18(SCM)]", qty: 26, torque: 50 }
            ],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 7,
            partName: "MAGNET X",
            points: [{ check: "CS 6X25", qty: 8, torque: 150 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 8,
            partName: "LINEAR COIL X",
            points: [{ check: "CS 6X25", qty: 10, torque: 150 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        }
    ];

    return (
        <A4Paper content={content} currentPage={20}>
            <div className="flex flex-col gap-4">
                <p className="text-sm font-bold uppercase">27. TORQUE CHECK (1/2)</p>
                <div className="flex justify-center">
                    <img src={image27} alt="page20" className="w-150" />
                </div>
                <Controller
                    name="page20.bodyRows"
                    control={control}
                    defaultValue={defaultBodyRows}
                    render={({ field }) => (
                        <EDMBodyCheckTable
                            rows={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <div className="flex justify-between">
                    <p className="text-sm">** DOBLE CHECK BY LEADER UP</p>
                    <Controller
                        name="page20.torqueWrenchNo"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Checknumber
                                label="TORQUE NO."
                                value={field.value ?? ''}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page20;

