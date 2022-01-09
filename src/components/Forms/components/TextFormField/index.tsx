import { TextField } from '@mui/material';
import React, { ReactElement } from 'react';

export interface TextFormFieldProps {
    value: string | null;
    onChange: (val: string | null) => void;
    label: string;
    disabled?: boolean;
    naked?: boolean;
}

const TextFormField = (props: TextFormFieldProps): ReactElement => {
    const { value, onChange, label, disabled, naked = false } = props;

    return (
        <TextField
            disabled={disabled}
            fullWidth
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            label={naked ? undefined : label}
            placeholder={!naked ? undefined : label}
            variant={naked ? 'standard' : undefined}
            InputProps={naked ? { disableUnderline: true } : undefined}
        />
    );
};

export default TextFormField;
