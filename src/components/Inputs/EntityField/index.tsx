import { QueryResult } from '@apollo/client';
import MenuItem from '@mui/material/MenuItem';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import React, { ReactElement } from 'react';

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

    return (
        <TextField
            error={Boolean(error)}
            helperText={error ? error.message : undefined}
            select
            {...rest}
        >
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
