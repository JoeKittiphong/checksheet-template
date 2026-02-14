import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0006_V2-setting";
import FormEDMBodyCheckTable from "@/components/FormComponents/FormEDMBodyCheckTable";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import { useFormContext } from "react-hook-form";

// Images
import image27 from "@/assets/FAMB0006_V2/FAMB0005-22-1.PNG";

function Page16() {
    const { control } = useFormContext();

    const defaultBodyRows = [
        {
            no: 1,
            partName: "BED-U TO BED-L",
            points: [{ check: "CS 20X75", qty: 6, torque: 2500 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 2,
            partName: "LM-GUIDE Y",
            points: [
                { check: "CS 8X30", qty: 26, torque: 250 },
                { check: "H.S.CTSK[M6X18(SCM)]", qty: 26, torque: 50 }
            ],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 3,
            partName: "LM-GUIDE X",
            points: [
                { check: "CS 8X30", qty: 30, torque: 250 },
                { check: "H.S.CTSK[M6X18(SCM)]", qty: 30, torque: 50 }
            ],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 4,
            partName: "LINEAR COIL Y",
            points: [{ check: "CS 6X25", qty: 10, torque: 150 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 5,
            partName: "TABLE TO BED-L",
            points: [{ check: "CS 8X45", qty: 16, torque: 250 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 6,
            partName: "MAGNET Y",
            points: [{ check: "CS 6X25", qty: 24, torque: 150 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 7,
            partName: "MAGNET X",
            points: [{ check: "CS 6X25", qty: 8, torque: 150 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        }
    ];

    return (
        <A4Paper content={content} currentPage={16}>
            <div className="flex flex-col gap-4">
                <p className="text-sm font-bold uppercase">27. TORQUE CHECK (1/2)</p>
                <div className="flex justify-center">
                    <img src={image27} alt="page16" className="w-150" />
                </div>
                <FormEDMBodyCheckTable
                    name="page16.bodyRows"
                    defaultValue={defaultBodyRows}
                />
                <div className="flex justify-between">
                    <p className="text-sm">** DOBLE CHECK BY LEADER UP</p>
                    <FormChecknumber
                        name="page16.torqueWrenchNo"
                        label="TORQUE NO."
                    />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page16;