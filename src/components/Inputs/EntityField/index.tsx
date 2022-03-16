import { QueryResult } from '@apollo/client';
import { IconButton, InputAdornment, useTheme } from '@mui/material/';
import MenuItem from '@mui/material/MenuItem';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import React, { ReactElement } from 'react';
import { MdClear } from 'react-icons/md';

export interface EntityFieldProps<T, Args, Res>
    extends Omit<TextFieldProps, 'value' | 'onChange'> {
    getData: (res: Res) => T[];
    hook: (options: { variables?: Args }) => QueryResult<Res, Args>;
    value: string;
    onChange: (value: string) => void;
    getProps: (d: T) => { id: string; label: string; disabled?: boolean };
    variables: Args;
}

const EntityField = <T, Args, Res>(
    props: EntityFieldProps<T, Args, Res>
): ReactElement => {
    const { getData, hook, value, onChange, getProps, variables, ...rest } =
        props;

    const { data, error, loading } = hook({ variables });

    const items = data ? getData(data) : [];

    const { palette } = useTheme();

    return (
        <TextField
            sx={
                value == ''
                    ? {
                          color: palette.text.secondary,
                          '.MuiSelect-icon': {
                              display: 'none',
                          },
                      }
                    : {
                          '.MuiSelect-icon': {
                              display: 'none',
                          },
                      }
            }
            inputProps={{
                sx: value == '' ? { color: palette.text.disabled } : {},
            }}
            value={value || rest.placeholder || 'Select'}
            onChange={(e) => onChange(e.target.value || '')}
            error={Boolean(error) || (!loading && items.length == 0)}
            helperText={
                error
                    ? error.message
                    : !loading && items.length == 0
                    ? 'No data'
                    : undefined
            }
            select
            {...rest}
        >
            <MenuItem disabled value={rest.placeholder || 'Select'}>
                {rest.placeholder || 'Select'}
            </MenuItem>
            {items.map((item) => {
                const { id, label, disabled } = getProps(item);
                return (
                    <MenuItem value={id} disabled={disabled} key={'item_' + id}>
                        {label}
                    </MenuItem>
                );
            })}
        </TextField>
    );
};

export default EntityField;
