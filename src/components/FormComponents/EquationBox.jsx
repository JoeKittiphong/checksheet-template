import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import FormItemCheck from './FormItemCheck';
import FormInputCheckSTD from './FormInputCheckSTD';

// Smart component to handle equation logic and rendering
const EquationBox = ({
    labelLeft,
    labelRight,
    labelResult,
    operator,
    nameLeft,
    nameRight,
    nameResult,
    minStd,
    maxStd,
    stdText,
    className
}) => {
    const { watch, setValue } = useFormContext();

    // Watch values
    const valLeft = watch(nameLeft);
    const valRight = watch(nameRight);

    useEffect(() => {
        // Only calculate if both inputs are valid numbers
        const numLeft = parseFloat(valLeft);
        const numRight = parseFloat(valRight);

        if (!isNaN(numLeft) && !isNaN(numRight)) {
            let result = '';
            if (operator === '-') {
                result = (numLeft - numRight);
            } else if (operator === '+') {
                result = (numLeft + numRight);
            } else if (operator === '*' || operator === 'x' || operator === 'X') {
                result = (numLeft * numRight);
                if (!Number.isInteger(result)) result = result.toFixed(2); // Auto limit decimals for float
            } else if (operator === '÷' && numRight !== 0) {
                result = (numLeft / numRight).toFixed(2); // Changed to 2 decimals based on Page 43 needs
            }

            // Update result field
            // Note: In React Hook Form, setting value triggers re-render if needed,
            // but we rely on FormInputCheckSTD to display it.
            if (result !== '') {
                setValue(nameResult, result);
            }
        } else if (valLeft === '' || valRight === '') {
            setValue(nameResult, ''); // Clear result if inputs are cleared
        }
    }, [valLeft, valRight, operator, setValue, nameResult]);

    return (
        <div className={`border border-black flex items-center justify-between ${className || ''}`}>
            {/* Left Operand */}
            <div className="flex flex-col items-center w-[30%]">
                <span className="text-xs mb-1">{labelLeft}</span>
                <div className="w-full">
                    <FormItemCheck
                        name={`ignore_${nameLeft}`} // Dummy
                        showCheckbox={false}
                        input={{
                            name: nameLeft,
                            width: "100%",
                            className: "!text-center !w-full"
                        }}
                        className="w-full justify-center"
                    />
                </div>
            </div>

            {/* Operator */}
            <span className="text-2xl font-bold">{operator}</span>

            {/* Right Operand */}
            <div className="flex flex-col items-center w-[30%]">
                <span className="text-xs mb-1">{labelRight}</span>
                <div className="w-full">
                    <FormItemCheck
                        name={`ignore_${nameRight}`} // Dummy
                        showCheckbox={false}
                        input={{
                            name: nameRight,
                            width: "100%",
                            className: "!text-center !w-full"
                        }}
                        className="w-full justify-center"
                    />
                </div>
            </div>

            {/* Result */}
            <span className="text-2xl font-bold">=</span>
            <div className="flex flex-col items-center w-[30%]">
                <span className="text-xs mb-1">{labelResult}</span>
                <div className="flex flex-col w-full relative">
                    {/* Use FormInputCheckSTD for validation */}
                    <div className="w-full h-8">
                        <FormInputCheckSTD
                            name={nameResult}
                            label={null} // No internal label
                            minStd={minStd}
                            maxStd={maxStd}
                            showLabel={false}
                            className="!w-full !text-center !h-8 !m-0"
                            inputClassName="!text-center !h-8"
                        />
                    </div>
                    {stdText && <span className="text-[10px] mt-1 absolute bottom-0 right-0">{stdText}</span>}
                </div>
            </div>
        </div>
    );
};

export default EquationBox;
