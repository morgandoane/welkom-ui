import { cloneDeep } from '@apollo/client/utilities';
import { DesktopDatePicker } from '@mui/lab';
import {
    ButtonBase,
    Typography,
    useTheme,
    Popover,
    Box,
    TextField,
    Button,
} from '@mui/material/';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { dateFormats } from '../../../../../../../../utils/dateFormats';
import { DateRange } from '../../../../../../../../utils/types/DateRange';

export interface DateControlProps {
    value: DateRange | null;
    onChange: (value: DateRange | null) => void;
}

const DateControl = (props: DateControlProps): ReactElement => {
    const { value, onChange } = props;

    const { palette } = useTheme();

    const [focus, setFocus] = React.useState<{
        start: Date | null;
        end: Date | null;
        element: Element;
    } | null>(null);

    const error: boolean =
        !focus || !focus.start || !focus.end ? false : focus.end < focus.start;

    const getLabel = ({ start, end }: DateRange): string => {
        const startYear = start.getFullYear();
        const endYear = end.getFullYear();

        const startMonth = start.getMonth();
        const endMonth = end.getMonth();

        const startDate = start.getDate();
        const endDate = end.getDate();

        if (startYear !== endYear)
            return `${format(start, dateFormats.condensedDate)} - ${format(
                end,
                dateFormats.condensedDate
            )}`;

        if (startMonth !== endMonth)
            return `${format(start, 'LLL do')} - ${format(
                end,
                dateFormats.condensedDate
            )}`;

        if (startDate == endDate)
            return format(start, dateFormats.condensedDate);

        return `${format(start, 'LLL do')} - ${format(end, 'do, YYY')}`;
    };

    return (
        <React.Fragment>
            <ButtonBase
                onClick={(e) => {
                    setFocus({
                        start: value ? value.start : null,
                        end: value ? value.end : null,
                        element: e.currentTarget,
                    });
                }}
                sx={{ marginBottom: '2px' }}
            >
                <Typography
                    sx={{ color: !value ? palette.text.disabled : undefined }}
                >
                    {!value ? 'Delivery date(s)' : getLabel(value)}
                </Typography>
            </ButtonBase>
            <Popover
                open={Boolean(focus)}
                anchorEl={focus ? focus.element : null}
            >
                <Box p={2} sx={{ display: 'flex', flexFlow: 'column', gap: 1 }}>
                    <Box sx={{ paddingRight: 6 }}>
                        <Typography>Date Range</Typography>
                    </Box>
                    <DesktopDatePicker
                        maxDate={focus && focus.end ? focus.end : undefined}
                        label="Start"
                        inputFormat="MM/dd/yyyy"
                        value={focus ? focus.start : null}
                        onChange={(val: Date | null) => {
                            if (focus) setFocus({ ...focus, start: val });
                        }}
                        renderInput={(params) => (
                            <TextField
                                variant="standard"
                                {...params}
                                error={error}
                            />
                        )}
                    />
                    <DesktopDatePicker
                        minDate={focus && focus.start ? focus.start : undefined}
                        label="End"
                        inputFormat="MM/dd/yyyy"
                        value={focus ? focus.end : null}
                        onChange={(val: Date | null) => {
                            if (focus) setFocus({ ...focus, end: val });
                        }}
                        renderInput={(params) => (
                            <TextField
                                variant="standard"
                                {...params}
                                error={error}
                            />
                        )}
                    />
                    <Box sx={{ display: 'flex', paddingTop: 1, gap: 1 }}>
                        <Box sx={{ flex: 1 }} />
                        <Button
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setFocus(null);
                                onChange(null);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={
                                focus && focus.start && focus.end ? false : true
                            }
                            size="small"
                            onClick={() => {
                                if (focus && focus.start && focus.end) {
                                    const copy = cloneDeep(focus);
                                    setFocus(null);
                                    onChange({
                                        start: focus.start,
                                        end: focus.end,
                                    });
                                }
                            }}
                        >
                            Apply
                        </Button>
                    </Box>
                </Box>
            </Popover>
        </React.Fragment>
    );
};

export default DateControl;
