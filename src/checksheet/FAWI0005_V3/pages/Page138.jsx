
import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';

function Page138() {
    return (
        <A4Paper content={content} currentPage={138}>
            <div className="font-sans text-xs px-4">
                <div className="mb-2">
                    <p className="">A list of gathering settings is attached as a function to clarify processing conditions.</p>
                    <p className="">If you have any questions about process adjustment, rs.</p>
                    <p className="">please contact the EDW Section of the Condition Development Division after setting the following gathers.</p>
                    <h2 className="font-bold text-lg underline">For STD, STD2, and ACR2 adjustment processing</h2>
                    <div className="font-mono text-[12px] space-y-1 ml-4">
                        <p>//Gathering Settings</p>
                        <p>#69618=0</p>
                        <p>#69619=910</p>
                        <p>#69620=190000,Right,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69621=1900069,Left,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69622=1900070,Left,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69623=57014,Left,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69624=57002,Left,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69625=57203,Left,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69626=108011,Left,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69627=66441,Left,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69628=66541,Left,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69629=66961,Left,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69630=1900064,Left,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69631=87032,Left,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69632=87132,Left,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69633=87036,Left,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69634=87134,Left,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69635=0,None,Time[msec],DBL,FFFFFFFF,1.0</p>
                    </div>

                    <h2 className="font-bold text-lg underline">For STD3 machining adjustment</h2>
                    <div className="font-mono text-[12px] space-y-1 ml-4">
                        <p>//Gathering Settings</p>
                        <p>#69618=0</p>
                        <p>#69619=1000</p>
                        <p>#69620=190000,Right,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69621=1900069,Right,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69622=1900070,Right,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69623=89452,Right,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69624=89451,Right,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69625=171257,Right,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69626=66961,Right,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69627=66441,Right,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69628=66541,Right,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69629=57002,Right,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69630=1900064,Right,Time[msec],DBL,FFFFFFFF,1.0</p>
                        <p>#69631=80008,Right,Time[msec],UINT,10,0.0625,0</p>
                        <p>#69632=80008,Right,Time[msec],UINT,10,0.0625,0</p>
                        <p>#69633=80009,Left,Time[msec],UINT,7FE0,0.125,0</p>
                        <p>#69634=80009,Left,Time[msec],UINT,FFFFFFFF,1.0</p>
                        <p>#69635=106900,Left,Time[msec],DBL,FFFFFFFF,1.0</p>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page138;