import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0003_V2-setting";
import FormEDMBodyCheckTable from "@/components/FormComponents/FormEDMBodyCheckTable";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import { useFormContext } from "react-hook-form";

// Images
import image27_2 from "@/assets/FAMB0003_V2/image-27-2.png";

function Page21() {
    const { control } = useFormContext();

    const defaultBodyRows = [
        {
            no: 9,
            partName: "MAGNET PLATE X",
            points: [{ check: "CS 6X25", qty: 8, torque: 150 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 10,
            partName: "ARM(X) TO SADDLE",
            points: [{ check: "CS 8X40", qty: 16, torque: 250 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 11,
            partName: "TABEL TO BED",
            points: [{ check: "CS 12X80", qty: 6, torque: 600 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 12,
            partName: "CERAMIC BASE",
            points: [{ check: "CS 8X45", qty: 8, torque: 200 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 13,
            partName: "HEAD TO ARM (X) (FRONT)",
            points: [{ check: "CS 8X30", qty: 8, torque: 250 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 14,
            partName: "HEAD TO ARM (X) (BACK)",
            points: [{ check: "CS 8X40", qty: 4, torque: 250 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 15,
            partName: "LM-GUIDE SLIDE TANK",
            points: [{ check: "CS 6X25", qty: 26, torque: 150 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        }
    ];

    return (
        <A4Paper content={content} currentPage={21}>
            <p className="text-sm font-bold">27. TORQUE CHECK (2/2)</p>
            <div className="flex justify-center mb-5">
                <img src={image27_2} alt="page21" className="w-150" />
            </div>
            <div className="flex flex-col gap-4">
                <FormEDMBodyCheckTable
                    name="page21.bodyRows"
                    defaultValue={defaultBodyRows}
                />
            </div>
            <div className="flex justify-between mt-5">
                <p className="text-sm">** DOBLE CHECK BY LEADER UP</p>
                <FormChecknumber
                    name="page21.torqueWrenchNo"
                    label="TORQUE NO."
                />
            </div>
        </A4Paper>
    );
}

export default Page21;
