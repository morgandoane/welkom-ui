import { FormControlLabel, Switch } from '@mui/material';
import React, { ReactElement } from 'react';

export interface BooleanFieldProps {
    value: boolean | null;
    onChange: (val: boolean | null) => void;
    label?: string;
    disabled?: boolean;
}

const BooleanField = (props: BooleanFieldProps): ReactElement => {
    const { value, onChange, label, disabled = false } = props;

    return (
        <FormControlLabel
            control={
                <Switch
                    disabled={disabled}
                    onClick={() => onChange(!(value == null ? false : value))}
                    checked={value == null ? false : value}
                    value={value == null ? false : value}
                />
            }
            label={label ? label : ''}
        />
    );
};

export default BooleanField;
