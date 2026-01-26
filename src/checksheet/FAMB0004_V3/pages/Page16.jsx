import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import FormTableEntoDual from "@/components/FormComponents/FormTableEntoDual";
import EntoSideSelector from "@/components/UIcomponent/EntoSideSelector";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import { useFormContext, Controller } from "react-hook-form";

// Images
import image23_1 from "@/assets/FAMB0004_V3/image-23-1.png";
import image23_2 from "@/assets/FAMB0004_V3/image-23-2.png";
import image23_3 from "@/assets/FAMB0004_V3/image-23-3.png";

function Page16() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={16}>
            <div>
                <p className="text-sm font-bold">23. ENTORO DATA CHECK ( Side 1 & Side 2 )</p>

                <div className="flex p-2">
                    {/* Block 1 (S/L, S/R) */}
                    <div className="flex-1">
                        <p className="w-full text-center font-bold">SIDE</p>
                        <div className="flex mb-5 ml-10">
                            <img src={image23_1} alt="page16" className="w-16" />
                            <FormChecknumber
                                name="page16.entoNo1"
                                label="ENTO No."
                            />
                        </div>
                        <div className="flex flex-col gap-2 ml-10 mb-5">
                            <Controller
                                name="page16.slSelector"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <EntoSideSelector
                                        ref={field.ref}
                                        label="S/L :"
                                        value={field.value ?? ''}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            <Controller
                                name="page16.srSelector"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <EntoSideSelector
                                        ref={field.ref}
                                        label="S/R :"
                                        value={field.value ?? ''}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>

                        <div className="ml-5">
                            <FormTableEntoDual
                                name="page16.entoData1"
                                maxValue={4}
                                maxDiff={7}
                                defaultValue={{ left: { a: [], b: [] }, right: { a: [], b: [] } }}
                            />
                        </div>
                    </div>

                    {/* Block 2 (F/L, F/R) */}
                    <div className="flex-1">
                        <p className="w-full text-center font-bold">FRONT</p>
                        <div className="flex mb-5">
                            <img src={image23_2} alt="page16" className="w-16" />
                            <FormChecknumber
                                name="page16.dialGaugeNo2"
                                label="Dial gauge No."
                            />
                        </div>
                        <div className="flex flex-col gap-2 ml-10 mb-5">
                            <Controller
                                name="page16.flSelector"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <EntoSideSelector
                                        ref={field.ref}
                                        label="F/L :"
                                        value={field.value ?? ''}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            <Controller
                                name="page16.frSelector"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <EntoSideSelector
                                        ref={field.ref}
                                        label="F/R :"
                                        value={field.value ?? ''}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>

                        <div className="ml-5">
                            <FormTableEntoDual
                                name="page16.entoData2"
                                maxValue={10}
                                maxDiff={5}
                                formula="A-B"
                                defaultValue={{ left: { a: [], b: [] }, right: { a: [], b: [] } }}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-between ml-10 mr-20">
                    <img src={image23_3} alt="page16" className="w-80 h-full" />
                    <FormCheckedBox name="page16.checkedInfo23" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page16;
