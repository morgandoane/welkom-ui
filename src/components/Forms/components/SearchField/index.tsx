import { InputAdornment, TextField } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdSearch } from 'react-icons/md';
import { TextFormFieldProps } from '../TextFormField';

export type SearchFieldProps = TextFormFieldProps;

const threshold = 350;

const SearchField = (props: SearchFieldProps): ReactElement => {
    const { value, onChange, label, naked = false } = props;

    const [val, setVal] = React.useState('');

    const [count, setCount] = React.useState(threshold);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if (count !== 0 && val !== value) {
                setCount(count - threshold / 5);
            } else {
                if (val !== value) onChange(val);
            }
        }, threshold / 5);

        return () => clearTimeout(timeout);
    }, [count, onChange, val, value]);

    React.useEffect(() => {
        setCount(threshold);
    }, [val]);

    return (
        <TextField
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <MdSearch />
                    </InputAdornment>
                ),
            }}
            variant={naked ? 'standard' : 'filled'}
            fullWidth
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder={naked ? label : ''}
            label={!naked ? label : ''}
        />
    );
};

export default SearchField;
