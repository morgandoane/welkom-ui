import { SxProps, TextField, TextFieldProps, Theme } from '@mui/material';
import React, { ReactElement } from 'react';

export interface TextFormFieldProps {
    value: string | null;
    onChange: (val: string | null) => void;
    label: string;
    disabled?: boolean;
    naked?: boolean;
    onBlur?: () => void;
    autoFocus?: boolean;
    size?: TextFieldProps['size'];
    sx?: SxProps<Theme>;
}

const TextFormField = (props: TextFormFieldProps): ReactElement => {
    const {
        autoFocus = false,
        value,
        onChange,
        onBlur,
        label,
        disabled,
        naked = false,
        size = 'medium',
        sx = {},
    } = props;

    return (
        <TextField
            size={size}
            autoFocus={autoFocus}
            onBlur={onBlur}
            disabled={disabled}
            fullWidth
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            label={naked ? undefined : label}
            placeholder={!naked ? undefined : label}
            variant={naked ? 'standard' : undefined}
            InputProps={naked ? { disableUnderline: true, sx } : { sx }}
        />
    );
};

export default TextFormField;
