import { TextField, TextFieldProps } from '@mui/material';
import React, { ReactElement } from 'react';

export interface NumberFieldProps {
    label: string;
    value: number | null;
    onChange: (val: number | null) => void;
    naked?: boolean;
    size?: TextFieldProps['size'];
}

const NumberField = (props: NumberFieldProps): ReactElement => {
    const { label, value, naked = false, onChange, size = 'medium' } = props;

    return (
        <TextField
            size={size}
            fullWidth
            type="number"
            value={value == null ? '' : value}
            onChange={(e) =>
                onChange(
                    e.target.value
                        ? parseFloat(e.target.value.replace(',', ''))
                        : null
                )
            }
            label={!naked ? label : undefined}
            placeholder={naked ? label : undefined}
            variant={naked ? 'standard' : undefined}
            InputProps={
                naked
                    ? {
                          disableUnderline: true,
                      }
                    : undefined
            }
        />
    );
};

export default NumberField;
