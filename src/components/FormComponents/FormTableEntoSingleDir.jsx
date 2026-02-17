import React from 'react';
import { useFormContext } from 'react-hook-form';
import EntoTableSingleDir from '../common/EntoTableSingleDir';

const FormTableEntoSingleDir = ({ name, sections, ...props }) => {
    const { control } = useFormContext();

    // Default sections if not provided (e.g. Z1, Z2)
    const defaultSections = sections || [{ cols: ['Z1', 'Z2'] }];

    return (
        <EntoTableSingleDir
            name={name}
            control={control}
            sections={defaultSections}
            {...props}
        />
    );
};

export default FormTableEntoSingleDir;
