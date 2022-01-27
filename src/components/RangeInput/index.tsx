import { Box } from '@mui/system';
import { getMonth } from 'date-fns';
import React, { ReactElement } from 'react';

export type RangeInputValue =
    | { start: Date; end: Date }
    | { start: Date; end: null }
    | { start: null; end: null };

export interface RangeInputProps {
    value: RangeInputValue;
    onChange: (value: RangeInputValue) => void;
}

const RangeInput = (props: RangeInputProps): ReactElement => {
    const { value, onChange } = props;

    const [view, setView] = React.useState<[number, number]>([
        getMonth(value.start ? value.start : new Date()),
        getMonth(
            value.end
                ? value.end
                : getMonth(value.start ? value.start : new Date())
        ),
    ]);

    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex' }}>
                <Box></Box>
            </Box>
            <Box sx={{ display: 'flex' }}></Box>
        </Box>
    );
};

export default RangeInput;
