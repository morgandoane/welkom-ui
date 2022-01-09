import { TextField } from '@mui/material';
import React, { ReactElement } from 'react';

export interface NumberFieldProps {
    label: string;
    value: number | null;
    onChange: (val: number | null) => void;
    naked?: boolean;
}

const NumberField = (props: NumberFieldProps): ReactElement => {
    const { label, value, naked = false, onChange } = props;

    return (
        <TextField
            fullWidth
            value={
                value == null
                    ? ''
                    : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
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
