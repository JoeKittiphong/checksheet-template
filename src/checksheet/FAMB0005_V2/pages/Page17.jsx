import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0005_V2-setting";
import FormEDMBodyCheckTable from "@/components/FormComponents/FormEDMBodyCheckTable";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import { useFormContext } from "react-hook-form";

// Images
import image27_2 from "@/assets/FAMB0005_V2/image-22-2.PNG";

function Page17() {
    const { control } = useFormContext();

    const defaultBodyRows = [
        {
            no: 8,
            partName: "LINEAR COIL X",
            points: [{ check: "CS 6X25", qty: 10, torque: 150 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 9,
            partName: "MAGNET PLATE X",
            points: [{ check: "CS 6X25", qty: 8, torque: 150 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 10,
            partName: "ARM(X) TO BED-U",
            points: [{ check: "CS 8X35", qty: 16, torque: 250 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 11,
            partName: "HEAD TO ARM(X) FRONT",
            points: [{ check: "CS 8X30", qty: 8, torque: 250 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 12,
            partName: "CERAMIC BASE",
            points: [{ check: "CS 8X45", qty: 8, torque: 200 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        }
    ];

    return (
        <A4Paper content={content} currentPage={17}>
            <p className="text-sm font-bold">27. TORQUE CHECK (2/2)</p>
            <div className="flex justify-center mb-5">
                <img src={image27_2} alt="page17" className="w-150" />
            </div>
            <div className="flex flex-col gap-4">
                <FormEDMBodyCheckTable
                    name="page17.bodyRows"
                    defaultValue={defaultBodyRows}
                />
            </div>
            <div className="flex justify-between mt-5">
                <p className="text-sm">** DOBLE CHECK BY LEADER UP</p>
                <FormChecknumber
                    name="page17.torqueWrenchNo"
                    label="TORQUE NO."
                />
            </div>
        </A4Paper>
    );
}

export default Page17;