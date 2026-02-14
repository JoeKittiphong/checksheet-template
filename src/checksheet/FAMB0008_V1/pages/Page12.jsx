import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0008_V1-setting";
import FormTableEntoDual from "@/components/FormComponents/FormTableEntoDual";
import EntoSideSelector from "@/components/UIcomponent/EntoSideSelector";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import { useFormContext, Controller } from "react-hook-form";

// Images
import image23_1 from "@/assets/FAMB0004_V3/image-25-1.PNG";
import image23_2 from "@/assets/FAMB0004_V3/image-25-2.PNG";
import image23_3 from "@/assets/FAMB0004_V3/image-25-3.PNG";

function Page12() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={12}>
            <div>
                <p className="text-sm font-bold">23. ENTORO DATA CHECK ( Side 1 & Side 2 )</p>

                <div className="flex">
                    {/* Block 1 (S/L, S/R) */}
                    <div className="flex-1">
                        <p className="w-full text-center font-bold">SIDE</p>
                        <div className="flex mb-1 ml-10">
                            <img src={image23_1} alt="page16" className="w-16" />
                            <FormChecknumber
                                name="Page12.entoNo1"
                                label="ENTO No."
                            />
                        </div>
                        <div className="flex flex-col gap-2 ml-10 mb-1">
                            <Controller
                                name="Page12.slSelector"
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
                                name="Page12.srSelector"
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
                                name="Page12.entoData1"
                                rowCount={26}
                                maxValue={4}
                                maxDiff={7}
                                defaultValue={{ left: { a: [], b: [] }, right: { a: [], b: [] } }}
                            />
                        </div>
                    </div>

                    {/* Block 2 (F/L, F/R) */}
                    <div className="flex-1">
                        <p className="w-full text-center font-bold">FRONT</p>
                        <div className="flex mb-1">
                            <img src={image23_2} alt="page16" className="w-16" />
                            <FormChecknumber
                                name="Page12.dialGaugeNo2"
                                label="Dial gauge No."
                            />
                        </div>
                        <div className="flex flex-col gap-2 ml-10 mb-1">
                            <Controller
                                name="Page12.flSelector"
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
                                name="Page12.frSelector"
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
                                name="Page12.entoData2"
                                rowCount={26}
                                maxValue={10}
                                maxDiff={5}
                                formula="A-B"
                                defaultValue={{ left: { a: [], b: [] }, right: { a: [], b: [] } }}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-between ml-10 mr-20">
                    <img src={image23_3} alt="page16" className="w-50 h-full" />
                    <FormCheckedBox name="Page12.checkedInfo23" className="w-40 h-25" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page12;

