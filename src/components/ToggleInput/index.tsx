import {
    Box,
    ClickAwayListener,
    MenuItem,
    TextField,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import FocusedLine from '../FocusLine';
import TextFormField from '../Forms/components/TextFormField';

export interface ToggleInputProps<T> {
    options: T[];
    optionValue: T;
    onOptionChange: (option: T) => void;
    getOptionData: (d: T) => { id: string; value: string };
    value: string | null;
    onChange: (val: string | null) => void;
    label: string;
}

const ToggleInput = <T,>(props: ToggleInputProps<T>): ReactElement => {
    const {
        options,
        optionValue,
        getOptionData,
        onOptionChange,
        value,
        onChange,
        label,
    } = props;

    const { palette, shape } = useTheme();

    const [focused, setFocused] = React.useState(false);

    return (
        <Box sx={{ width: '100%' }} onClick={() => setFocused(true)}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    background: palette.action.hover,
                    ':hover': { background: palette.action.focus },

                    gap: 2,
                    borderTopLeftRadius: shape.borderRadius,
                    borderTopRightRadius: shape.borderRadius,
                }}
            >
                <Box
                    sx={{
                        borderRight: `1px solid ${palette.divider}`,
                        padding: 1.5,
                    }}
                >
                    <TextField
                        onBlur={() => setFocused(false)}
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        fullWidth
                        value={getOptionData(optionValue).value}
                        select
                        onChange={(e) => {
                            const { value } = e.target;
                            const match = options.find(
                                (op) => getOptionData(op).value === value
                            );
                            if (match) onOptionChange(match);
                        }}
                        onClick={() => setFocused(true)}
                        onFocusCapture={() => setFocused(true)}
                        onSelectCapture={() => setFocused(false)}
                    >
                        {options.map((op) => {
                            const { id, value: val } = getOptionData(op);
                            return (
                                <MenuItem
                                    onClick={() => {
                                        setFocused(true);
                                    }}
                                    value={val}
                                    key={id}
                                >
                                    {val}
                                </MenuItem>
                            );
                        })}
                    </TextField>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <TextFormField
                        onBlur={() => setFocused(false)}
                        naked
                        label={label}
                        value={value}
                        onChange={(val) => onChange(val)}
                    />
                </Box>
            </Box>
            <FocusedLine focused={focused} />
        </Box>
    );
};

export default ToggleInput;
