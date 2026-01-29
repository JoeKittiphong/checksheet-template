import { useKeypad } from '../../context/KeypadContext';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';

/**
 * InfoInputForm Component
 * ฟอร์มกรอกข้อมูลเครื่องจักร: Model, Spec, Machine No., Controller No., Start/Finish Date, Option
 */
function InfoInputForm({
    formData = {},
    model = "", // Receive model from props
    onChange = () => { }
}) {
    const { openKeypad, isKeypadEnabled } = useKeypad();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Add validation
    const { register } = useFormContext();
    useEffect(() => {
        register('machineNo', { required: true });
        register('controllerNo', { required: true });
        // register('startDate', { required: true }); // Start/Finish Date might be optional? User didn't specify.
        // Usually Machine No is critical. I'll require Machine/Controller No for now.
    }, [register]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    const handleInputClick = (name, value, label) => {
        if (isMobile || isKeypadEnabled) {
            openKeypad(name, value, { label, mode: 'text' });
        }
    };

    const bgGreenLight = 'bg-green-200';

    return (
        <div className="mt-12 flex justify-center">
            <table className="w-[65%] border-collapse table-fixed">
                <colgroup>
                    <col style={{ width: '40%' }} />
                    <col style={{ width: '60%' }} />
                </colgroup>
                <tbody>
                    {/* Model Row */}
                    <tr>
                        <td className="text-right pr-4 py-2 font-medium text-sm">MODEL:</td>
                        <td className={`border-b border-black ${bgGreenLight} p-0 h-9 relative`}>
                            <div className="w-full h-full flex items-center justify-center font-medium text-sm">
                                {model || formData.model || ''}
                            </div>
                        </td>
                    </tr>



                    {/* Machine No Row */}
                    <tr>
                        <td className="text-right pr-4 py-2 font-medium text-sm">MACHINE NO:</td>
                        <td className={`border-b border-black ${bgGreenLight} p-0 h-9`}>
                            <input
                                type="text"
                                name="machineNo"
                                value={formData.machineNo || ''}
                                readOnly={isMobile}
                                inputMode={isMobile ? "none" : "text"}
                                onClick={(e) => { isMobile && e.target.blur(); handleInputClick('machineNo', formData.machineNo || '', 'MACHINE NO'); }}
                                onFocus={(e) => { isMobile && e.target.blur(); isMobile && handleInputClick('machineNo', formData.machineNo || '', 'MACHINE NO'); }}
                                onChange={handleChange}
                                className="w-full h-full bg-transparent text-center outline-none font-medium text-sm cursor-pointer"
                                placeholder="Enter Machine No."
                            />
                        </td>
                    </tr>

                    {/* Controller No Row */}
                    <tr>
                        <td className="text-right pr-4 py-2 font-medium text-sm">CONTROLLER NO.</td>
                        <td className={`border-b border-black ${bgGreenLight} p-0 h-9`}>
                            <input
                                type="text"
                                name="controllerNo"
                                value={formData.controllerNo || ''}
                                readOnly={isMobile}
                                inputMode={isMobile ? "none" : "text"}
                                onClick={(e) => { isMobile && e.target.blur(); handleInputClick('controllerNo', formData.controllerNo || '', 'CONTROLLER NO'); }}
                                onFocus={(e) => { isMobile && e.target.blur(); isMobile && handleInputClick('controllerNo', formData.controllerNo || '', 'CONTROLLER NO'); }}
                                onChange={handleChange}
                                className="w-full h-full bg-transparent text-center outline-none font-medium text-sm cursor-pointer"
                                placeholder="Enter Controller No."
                            />
                        </td>
                    </tr>

                    {/* Start Date */}
                    <tr>
                        <td className="text-right pr-4 py-2 font-medium text-sm">START DATE :</td>
                        <td className="border-b border-black bg-yellow-300 p-0 h-9 relative flex items-center justify-center">
                            <input
                                type="date"
                                name="startDate"
                                style={{ textAlign: 'center', textAlignLast: 'center' }}
                                className="w-full h-full bg-transparent outline-none font-medium text-sm cursor-pointer text-center [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                value={formData.startDate || ''}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>

                    {/* Finish Date */}
                    <tr>
                        <td className="text-right pr-4 py-2 font-medium text-sm">FINISH DATE:</td>
                        <td className="border-b border-black bg-yellow-300 p-0 h-9 relative flex items-center justify-center">
                            <input
                                type="date"
                                name="finishDate"
                                style={{ textAlign: 'center', textAlignLast: 'center' }}
                                className="w-full h-full bg-transparent outline-none font-medium text-sm cursor-pointer text-center [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                value={formData.finishDate || ''}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>

                    {/* Options (Multiple Rows) */}
                    <tr>
                        <td className="text-right pr-4 py-2 font-medium text-sm align-top pt-2">OPTION:</td>
                        <td className="border-b border-black p-0">
                            <div className="flex flex-col">
                                <input name="option1" readOnly={isMobile} inputMode={isMobile ? "none" : "text"} onChange={handleChange} onClick={(e) => { isMobile && e.target.blur(); handleInputClick('option1', formData.option1 || '', 'OPTION 1'); }} onFocus={(e) => { isMobile && e.target.blur(); isMobile && handleInputClick('option1', formData.option1 || '', 'OPTION 1'); }} value={formData.option1 || ''} className="w-full bg-yellow-300 border-b border-black border-dotted h-8 px-2 outline-none cursor-pointer" />
                                <input name="option2" readOnly={isMobile} inputMode={isMobile ? "none" : "text"} onChange={handleChange} onClick={(e) => { isMobile && e.target.blur(); handleInputClick('option2', formData.option2 || '', 'OPTION 2'); }} onFocus={(e) => { isMobile && e.target.blur(); isMobile && handleInputClick('option2', formData.option2 || '', 'OPTION 2'); }} value={formData.option2 || ''} className="w-full bg-yellow-300 border-b border-black border-dotted h-8 px-2 outline-none cursor-pointer" />
                                <input name="option3" readOnly={isMobile} inputMode={isMobile ? "none" : "text"} onChange={handleChange} onClick={(e) => { isMobile && e.target.blur(); handleInputClick('option3', formData.option3 || '', 'OPTION 3'); }} onFocus={(e) => { isMobile && e.target.blur(); isMobile && handleInputClick('option3', formData.option3 || '', 'OPTION 3'); }} value={formData.option3 || ''} className="w-full bg-yellow-300 border-b border-black border-dotted h-8 px-2 outline-none cursor-pointer" />
                                <input name="option4" readOnly={isMobile} inputMode={isMobile ? "none" : "text"} onChange={handleChange} onClick={(e) => { isMobile && e.target.blur(); handleInputClick('option4', formData.option4 || '', 'OPTION 4'); }} onFocus={(e) => { isMobile && e.target.blur(); isMobile && handleInputClick('option4', formData.option4 || '', 'OPTION 4'); }} value={formData.option4 || ''} className="w-full bg-yellow-300 border-b border-black border-dotted h-8 px-2 outline-none cursor-pointer" />
                                <input name="option5" readOnly={isMobile} inputMode={isMobile ? "none" : "text"} onChange={handleChange} onClick={(e) => { isMobile && e.target.blur(); handleInputClick('option5', formData.option5 || '', 'OPTION 5'); }} onFocus={(e) => { isMobile && e.target.blur(); isMobile && handleInputClick('option5', formData.option5 || '', 'OPTION 5'); }} value={formData.option5 || ''} className="w-full bg-yellow-300 h-8 px-2 outline-none cursor-pointer" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default InfoInputForm;
