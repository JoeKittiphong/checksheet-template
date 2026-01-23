import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0002v2-setting";
import CheckedBox from "@/components/UIcomponent/CheckedBox";
import { useFormContext, Controller } from "react-hook-form";

// Images
import image13 from "@/assets/FAMB0002V2/image-13.png";

function Page8() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={8}>
            <div>
                <p className="text-sm font-bold mb-10">13. Check การประกอบ Magnet plate X </p>
                <div className="flex flex-col justify-center items-center">
                    <img src={image13} alt="page8" className="w-150 mb-5" />
                    <Controller
                        name="page8.checkedInfo13"
                        control={control}
                        defaultValue={{ name: '', date: '' }}
                        render={({ field }) => (
                            <CheckedBox
                                name={field.value?.name ?? ''}
                                date={field.value?.date ?? ''}
                                onNameChange={(val) => field.onChange({ ...field.value, name: val })}
                                onDateChange={(val) => field.onChange({ ...field.value, date: val })}
                            />
                        )}
                    />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page8;
