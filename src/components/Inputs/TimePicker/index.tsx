import Box from '@mui/material/Box';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { format, setHours, setMinutes } from 'date-fns';
import React, { ReactElement } from 'react';

export interface TimePickerProps
    extends Omit<TextFieldProps, 'value' | 'onChange'> {
    value: number | null;
    onChange: (value: number | null) => void;
    touch: () => void;
}

const TimePicker = (props: TimePickerProps): ReactElement => {
    const { value, onChange, touch, ...rest } = props;

    const minutes = value == null ? null : value % 60;
    const hours =
        value == null || minutes == null ? null : (value - minutes) / 60;

    const parsedValue =
        hours == null || minutes == null
            ? ''
            : setMinutes(setHours(new Date(), hours), minutes);

    return (
        <TextField
            value={
                rest.disabled
                    ? 'Time'
                    : parsedValue
                    ? format(parsedValue, 'HH:mm')
                    : ''
            }
            {...rest}
            type={rest.disabled ? undefined : 'time'}
            inputProps={{ step: '900' }}
            onChange={(e) => {
                touch();
                if (!e.target.value) {
                    onChange(null);
                } else {
                    const [hours, minutes] = e.target.value.split(':');
                    const hoursParsed = parseInt(hours);
                    const minutesParsed = parseInt(minutes);
                    if (!isNaN(hoursParsed) && !isNaN(minutesParsed)) {
                        const newVal = hoursParsed * 60 + minutesParsed;
                        console;
                        onChange(newVal);
                    }
                }
            }}
        />
    );
};

export default TimePicker;
