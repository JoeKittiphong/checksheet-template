import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';

import imgSubPanel from '@/assets/FAWI0002_V3/image-35.JPG';

function Page33() {
    return (
        <A4Paper content={content} currentPage={33}>
            <div>

                {/* 34. Pipe Terminal Check */}
                <div className="flex flex-col gap-2">
                    <SectionTitle>34. Pipe Terminal Check</SectionTitle>
                    <div className="ml-5 flex flex-col gap-3">
                        <FormItemCheck
                            name="p33_pipe_free_check"
                            label={<span className="text-sm">"Press "FREE" button at Sub Panel hold for 10 second ==&gt; "Guide" on CNT is not show."</span>}
                        />
                        <FormItemCheck
                            name="p33_pipe_power_off_check"
                            label={
                                <span className="text-sm">
                                    When power off and take off hose of air regulator (Supply Tank)
                                    ==&gt; "Guide" on CNT is not show and Pipe Terminal is not drop.
                                </span>
                            }
                        />
                        <div className="flex flex-col gap-1">
                            <FormItemCheck
                                name="p33_pipe_sensor_check"
                                label={<span className="text-sm">Pipe Terminal Up-Down sensor check</span>}
                            />
                            <div className="ml-10 text-xs flex flex-col gap-1 italic">
                                <p>- Pipe Terminal UP =&gt; Check #87100 Upper Limit = 1</p>
                                <p>- Pipe Terminal DOWN =&gt; Check #87101 Lower Limit = 1</p>
                            </div>
                        </div>
                        <FormItemCheck
                            name="p33_pipe_speed_check"
                            label={
                                <div className="text-sm">
                                    <p>Open Speed Controller 1 round (2 pc : Pipe Up & Pipe Down ==&gt; in Z-Side Box L)</p>
                                    <p>(STD : Up 1.0~1.5 sec, Down 1.0~1.5 sec)</p>
                                </div>
                            }
                        />

                        <div className="mt-2 flex justify-end pr-10">
                            <FormCheckedBox name="p33_pipe_sig" label="Checked by :" />
                        </div>
                    </div>
                </div>

                {/* 35. Sub Panel Test */}
                <div className="flex flex-col gap-2">
                    <SectionTitle>35. Sub Panel Test (ทดสอบกดปุ่มที่ Sub Panel เพื่อ Check function การทำงาน)</SectionTitle>

                    <div className="ml-5 mt-2 flex gap-0 items-start">
                        <FormQuickTable
                            className="w-full"
                            columns={[
                                { header: 'WIRE', key: 'wire', width: '90px', render: (val) => val && <FormItemCheck name={val.name} label={<span className="text-[10px]">{val.label}</span>} /> },
                                { header: 'AWT', key: 'awt', width: '100px', render: (val) => val && <FormItemCheck name={val.name} label={<span className="text-[10px]">{val.label}</span>} /> },
                                { header: 'AWT JET', key: 'jet', width: '75px', render: (val) => val && <FormItemCheck name={val.name} label={<span className="text-[10px]">{val.label}</span>} /> },
                                { header: 'TANK FILL', key: 'fill', width: '75px', render: (val) => val && <FormItemCheck name={val.name} label={<span className="text-[10px]">{val.label}</span>} /> },
                                { header: 'AWT PIPE', key: 'pipe', width: '75px', render: (val) => val && <FormItemCheck name={val.name} label={<span className="text-[10px]">{val.label}</span>} /> },
                                { header: 'TANK DRAIN', key: 'drain', width: '75px', render: (val) => val && <FormItemCheck name={val.name} label={<span className="text-[10px]">{val.label}</span>} /> },
                                { header: 'TANK DOOR', key: 'door', width: '75px', render: (val) => val && <FormItemCheck name={val.name} label={<span className="text-[10px]">{val.label}</span>} /> },
                                {
                                    header: '',
                                    key: 'img',
                                    rowGroup: true,
                                    width: '120px',
                                    render: () => <img src={imgSubPanel} alt="Sub Panel Reference" className="w-full object-contain" />
                                },
                            ]}
                            data={[
                                {
                                    wire: { name: 'p33_btn_stop', label: 'STOP' },
                                    awt: { name: 'p33_btn_icut', label: 'I CUT' },
                                    jet: { name: 'p33_btn_jet_off', label: 'OFF' },
                                    fill: { name: 'p33_btn_fill_off', label: 'OFF' },
                                    pipe: { name: 'p33_btn_pipe_air', label: 'AIR' },
                                    drain: { name: 'p33_btn_drain_open', label: 'OPEN' },
                                    door: { name: 'p33_btn_door_open', label: 'OPEN' },
                                    img: 'PANEL'
                                },
                                {
                                    wire: { name: 'p33_btn_run', label: 'RUN' },
                                    awt: { name: 'p33_btn_iithread', label: 'II THREAD' },
                                    jet: { name: 'p33_btn_jet_on', label: 'ON' },
                                    fill: { name: 'p33_btn_fill_on', label: 'ON' },
                                    pipe: { name: 'p33_btn_pipe_free', label: 'FREE' },
                                    drain: { name: 'p33_btn_drain_close', label: 'CLOSE' },
                                    door: { name: 'p33_btn_door_close', label: 'CLOSE' },
                                    img: 'PANEL'
                                },
                                {
                                    wire: { name: 'p33_btn_feed', label: 'FEED' },
                                    awt: null, jet: null, fill: null, pipe: null, drain: null, door: null,
                                    img: 'PANEL'
                                },
                            ]}
                        />
                    </div>

                    <div className="mt-8 flex justify-end pr-10 mb-2">
                        <FormCheckedBox name="p33_subpanel_sig" label="Checked by :" />
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page33;