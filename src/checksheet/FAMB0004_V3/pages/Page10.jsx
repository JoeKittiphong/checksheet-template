import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import CeramicCheckEDM from "@/components/PageComponent/CeramicCheckEDM";
import { useFormContext, Controller } from "react-hook-form";
import Checknumber from "@/components/UIcomponent/Checknumber";
import CheckedBox from "@/components/UIcomponent/CheckedBox";
import EDMLevelCeramic from "@/components/PageComponent/EDMLevelCeramic";

// Images
import image17 from "@/assets/FAMB0004_V3/image-17.png";

function Page10() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={10}>
            <div>
                <p className="text-sm font-bold mb-5">16.  CERAMIC BASE CHECK</p>
                <div className="ml-10">
                    <Controller
                        name="page10.ceramicData"
                        control={control}
                        defaultValue={{
                            tl: '', tc: '', tr: '',
                            ml: '', mc: '', mr: '',
                            bl: '', br: ''
                        }}
                        render={({ field }) => (
                            <CeramicCheckEDM
                                data={field.value}
                                onChange={field.onChange}
                                standard={{ min: -10, max: 10 }}
                                parallelStandard={5}
                            />
                        )}
                    />
                    <div className="flex justify-between ml-30 mr-10">
                        <div className="mt-5 space-y-2">
                            <Controller
                                name="page10.dialGaugeNo"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Checknumber
                                        label="Dial gauge No."
                                        value={field.value ?? ''}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            <Controller
                                name="page10.ceramicBaseNo"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Checknumber
                                        label="Ceramic base No."
                                        value={field.value ?? ''}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                        <Controller
                            name="page10.checkedInfo16"
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
                <p className="text-sm font-bold mb-5 mt-10">17. LEVELING CERAMIC BASE CHECK</p>
                <div>
                    <div>
                        <div className="flex">
                            <img src={image17} alt="page10" className="w-80 mb-10 ml-5 mr-10" />
                            <Controller
                                name="page10.levelCeramicData"
                                control={control}
                                defaultValue={{
                                    x: {
                                        tl: '', tc: '', tr: '',
                                        ml: '', mr: '',
                                        bl: '', bc: '', br: ''
                                    },
                                    y: {
                                        tl: '', tc: '', tr: '',
                                        ml: '', mr: '',
                                        bl: '', bc: '', br: ''
                                    }
                                }}
                                render={({ field }) => (
                                    <EDMLevelCeramic
                                        dataX={field.value?.x}
                                        dataY={field.value?.y}
                                        onChangeX={(val) => field.onChange({ ...field.value, x: val })}
                                        onChangeY={(val) => field.onChange({ ...field.value, y: val })}
                                        standardX={20}
                                        standardY={20}
                                    />
                                )}
                            />
                        </div>
                        <div className="mt-5 flex justify-between ml-30 mr-10">
                            <Controller
                                name="page10.levelingGuageNo"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Checknumber
                                        label="Leveling gauge No."
                                        value={field.value ?? ''}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            <Controller
                                name="page10.checkedInfo17"
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
                </div>
            </div>
        </A4Paper>
    );
}

export default Page10;

