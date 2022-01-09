import { addMonths, endOfMonth, startOfMonth } from 'date-fns';
import React from 'react';
import { DateRangeInput } from './../graphql/schema/DateRange/DateRange';

export const getMonthRange = (origin: Date, index: number): DateRangeInput => {
    const indexed = addMonths(origin, index);

    const start = startOfMonth(indexed);
    const end = endOfMonth(indexed);

    return { start, end };
};

export const useMonthRange = (
    initial_index = 0
): [
    index: number,
    setIndex: (value: number) => void,
    range: DateRangeInput,
    now: Date
] => {
    const [index, setIndex] = React.useState(initial_index);

    const [now, setNow] = React.useState<Date>(new Date());

    const range = getMonthRange(now, index);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return [index, (i) => setIndex(i), range, now];
};
