import { InputAdornment, TextField } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdSearch } from 'react-icons/md';

export type SearchFieldProps = {
    value: string;
    onChange: (val: string) => void;
    label: string;
    disabled?: boolean;
    naked?: boolean;
};

const SearchField = (props: SearchFieldProps): ReactElement => {
    const { value, onChange, label, naked = false } = props;

    return (
        <TextField
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <MdSearch />
                    </InputAdornment>
                ),
                ...(naked ? { disableUnderline: true } : {}),
            }}
            variant={naked ? 'standard' : 'filled'}
            fullWidth
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={naked ? label : undefined}
            label={!naked ? label : undefined}
        />
    );
};

export default SearchField;
