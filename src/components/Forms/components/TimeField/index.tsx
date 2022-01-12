import { Box, Slider, TextField, Typography } from '@mui/material';
import { format, getHours, getMinutes, setHours, setMinutes } from 'date-fns';
import React, { ReactElement } from 'react';
import { dateFormats } from '../../../../utils/dateFormats';

export interface TimeFieldProps {
    value: Date | null;
    onChange: (date: Date) => void;
    label?: string;
    step?: number;
}

const TimeField = (props: TimeFieldProps): ReactElement => {
    const { value, label = 'Time', onChange } = props;

    return (
        <Box>
            <Typography>
                {value ? format(value, dateFormats.time) : '00:00'}
            </Typography>
            <Slider
                value={
                    !value
                        ? 0
                        : getHours(value) * 2 + (getMinutes(value) == 0 ? 0 : 1)
                }
                step={1}
                min={0}
                max={47}
                onChange={(e, d) => {
                    const step = d instanceof Array ? d[0] : d;
                    const hours = Math.floor(step / 2);
                    const minutes = (step % 2) * 30;
                    const date = setMinutes(
                        setHours(value ? value : new Date(), hours),
                        minutes
                    );

                    onChange(date);
                }}
            />
        </Box>
    );
};

export default TimeField;
