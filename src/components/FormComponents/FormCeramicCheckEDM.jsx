import React from 'react';
import { useFormContext } from 'react-hook-form';
import CeramicCheckEDM from '@/components/PageComponent/CeramicCheckEDM';

const FormCeramicCheckEDM = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <CeramicCheckEDM
            name={name}
            control={control}
            {...props}
        />
    );
};

export default FormCeramicCheckEDM;
