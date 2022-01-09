import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import { DateRangeInput } from '../../../../graphql/schema/DateRange/DateRange';
import DateField from '../DateField';

export interface DateRangeFieldProps {
    value: DateRangeInput | null;
    onChange: (val: DateRangeInput | null) => void;
    naked?: boolean;
}

const DateRangeField = (props: DateRangeFieldProps): ReactElement => {
    const { value, onChange, naked = false } = props;

    return (
        <Box sx={{ display: 'flex', gap: 4 }}>
            <DateField
                naked={naked}
                value={value ? value.start : null}
                onChange={(start) => {
                    if (value && start) {
                        onChange({
                            ...value,
                            start,
                        });
                    }
                }}
            />
            <DateField
                naked={naked}
                value={value ? value.end : null}
                onChange={(end) => {
                    if (value && end) {
                        onChange({
                            ...value,
                            end,
                        });
                    }
                }}
            />
        </Box>
    );
};

export default DateRangeField;
