import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0008_V1-setting";
import FormEDMBodyCheckTable from "@/components/FormComponents/FormEDMBodyCheckTable";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import { useFormContext } from "react-hook-form";

// Images
import image27_2 from "@/assets/FAMB0008_V1/FAMB0008-23-2.PNG"; // Fallback from image-30

function Page17() {
    const { control } = useFormContext();

    const defaultBodyRows = [
        {
            no: 8,
            partName: "Stopper Block XY",
            points: [{ check: "CS M12x40", qty: 4, torque: 600 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 9,
            partName: "Linear Coil X",
            points: [{ check: "CS M6x25", qty: 18, torque: 150 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 10,
            partName: "Magnet Plate X",
            points: [{ check: "CS M6x25", qty: 16, torque: 150 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 11,
            partName: "Arm(X) to Saddle",
            points: [{ check: "CS M8x55", qty: 24, torque: 250 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 12,
            partName: "Head to Arm(X) Front",
            points: [{ check: "CS M12x40", qty: 8, torque: 600 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        }
    ];

    return (
        <A4Paper content={content} currentPage={17}>
            <p className="text-sm font-bold">27. TORQUE CHECK (2/2)</p>
            <div className="flex justify-center mb-5">
                <img src={image27_2} alt="page21" className="w-150" />
            </div>
            <div className="flex flex-col gap-4">
                <FormEDMBodyCheckTable
                    name="Page17.bodyRows"
                    defaultValue={defaultBodyRows}
                />
            </div>
            <div className="flex justify-between mt-5">
                <p className="text-sm">** DOBLE CHECK BY LEADER UP</p>
                <FormChecknumber
                    name="Page17.torqueWrenchNo"
                    label="TORQUE NO."
                />
            </div>
        </A4Paper>
    );
}

export default Page17;

