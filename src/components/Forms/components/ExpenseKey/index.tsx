import { MenuItem, TextField } from '@mui/material';
import React, { ReactElement } from 'react';
import {
    ExpenseKey,
    expenseLabels,
} from '../../../../graphql/schema/Expense/Expense';

export interface ExpenseKeyFieldProps {
    label?: string;
    naked?: boolean;
    value: ExpenseKey | null;
    onChange: (key: ExpenseKey | null) => void;
}

const ExpenseKeyField = (props: ExpenseKeyFieldProps): ReactElement => {
    const { label = 'Expense Type', naked = true, value, onChange } = props;

    return (
        <TextField
            fullWidth
            variant={naked ? 'standard' : 'filled'}
            InputProps={naked ? { disableUnderline: true } : undefined}
            label={naked ? undefined : label}
            placeholder={!naked ? undefined : label}
            value={value || '_'}
            onChange={(e) => {
                onChange(
                    e.target.value && e.target.value !== '_'
                        ? (e.target.value as ExpenseKey)
                        : null
                );
            }}
            select
        >
            <MenuItem value={'_'}>Any</MenuItem>
            {Object.keys(ExpenseKey).map((key) => (
                <MenuItem value={key} key={'key_' + key}>
                    {expenseLabels[key as ExpenseKey]}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default ExpenseKeyField;
