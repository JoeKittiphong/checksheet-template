import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0008_V1-setting";
import FormEDMBodyCheckTable from "@/components/FormComponents/FormEDMBodyCheckTable";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import { useFormContext } from "react-hook-form";

// Images
import image27 from "@/assets/FAMB0008_V1/FAMB0008-23-1.PNG"; // Fallback from image-29

function Page16() {
    const { control } = useFormContext();

    const defaultBodyRows = [
        {
            no: 1,
            partName: "LM-Guide Y",
            points: [
                { check: "CS M12x40", qty: 51, torque: 600 },
                { check: "H.S.CTSK M8x20 SCM", qty: 51, torque: 100 }
            ],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 2,
            partName: "Magnet Plate Y",
            points: [{ check: "CS M6x25", qty: 56, torque: 150 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 3,
            partName: "Linear Coil Y",
            points: [{ check: "CS M6x30", qty: 36, torque: 150 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 4,
            partName: "Stopper Block XY",
            points: [{ check: "CS M12x40", qty: 4, torque: 600 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 5,
            partName: "Saddle to Bed",
            points: [{ check: "CS M10x50", qty: 24, torque: 450 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 6,
            partName: "LM-Guide X",
            points: [
                { check: "CS M8x35", qty: 52, torque: 250 },
                { check: "H.S.CTSK M6x18 SCM", qty: 52, torque: 50 }
            ],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        },
        {
            no: 7,
            partName: "Magnet Plate X",
            points: [{ check: "CS M6x25", qty: 24, torque: 150 }],
            actionBy: '', actionDate: '', doubleBy: '', doubleDate: ''
        }
    ];

    return (
        <A4Paper content={content} currentPage={16}>
            <div className="flex flex-col gap-4">
                <p className="text-sm font-bold uppercase">27. TORQUE CHECK (1/2)</p>
                <div className="flex justify-center">
                    <img src={image27} alt="page20" className="w-150" />
                </div>
                <FormEDMBodyCheckTable
                    name="Page16.bodyRows"
                    defaultValue={defaultBodyRows}
                />
                <div className="flex justify-between">
                    <p className="text-sm">** DOBLE CHECK BY LEADER UP</p>
                    <FormChecknumber
                        name="Page16.torqueWrenchNo"
                        label="TORQUE NO."
                    />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page16;

