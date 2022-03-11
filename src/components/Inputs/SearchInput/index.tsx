import {
    IconButton,
    InputAdornment,
    TextField,
    TextFieldProps,
    SxProps,
    Theme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdClear, MdSearch } from 'react-icons/md';

export interface SearchInputProps
    extends Omit<TextFieldProps, 'onChange' | 'value'> {
    value: string;
    onChange: (value: string) => void;
    sx?: SxProps<Theme>;
}

const threshold = 500;

const SearchInput = (props: SearchInputProps): ReactElement => {
    const [value, setValue] = React.useState('');
    const [timer, setTimer] = React.useState<number | null>(null);

    const {
        value: val,
        onChange,
        placeholder = 'Search',
        variant = 'standard',
        InputProps = {
            disableUnderline: true,
            startAdornment: (
                <InputAdornment position="start">
                    <MdSearch />
                </InputAdornment>
            ),
            endAdornment: value ? (
                <InputAdornment position="end">
                    <IconButton
                        size="small"
                        onClick={() => {
                            setValue('');
                            setTimer(0);
                        }}
                    >
                        <MdClear />
                    </IconButton>
                </InputAdornment>
            ) : undefined,
        },
        sx = {},
        ...rest
    } = props;

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTimer((t) =>
                t == null ? null : t == 0 ? 0 : t - threshold / 4
            );
        }, threshold / 4);
        return () => clearInterval(interval);
    }, []);

    React.useEffect(() => {
        if (timer == 0) {
            if (val !== value) onChange(value);
            setTimer(null);
        }
    }, [timer, value, onChange, val]);

    return (
        <TextField
            sx={sx}
            fullWidth
            placeholder={placeholder}
            variant={variant}
            value={value}
            onChange={(e) => {
                setValue(e.target.value || '');
                setTimer(threshold);
            }}
            InputProps={InputProps}
            {...rest}
        />
    );
};

export default SearchInput;
