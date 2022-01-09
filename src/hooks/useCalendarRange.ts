import React from 'react';
import { getMonthRange, useMonthRange } from './useMonthRange';
import { addDays, getDay } from 'date-fns';
import { DateRangeInput } from '../graphql/schema/DateRange/DateRange';

export const getCalendarRange = (
    origin: Date,
    index: number
): DateRangeInput => {
    const { start: mStart, end: mEnd } = getMonthRange(origin, index);
    const start = addDays(mStart, 0 - getDay(mStart));
    const end = addDays(mEnd, 7 - getDay(mEnd));

    return {
        start,
        end,
    };
};

export const useCalendarRange = (
    initial_index = 0
): [
    index: number,
    setIndex: (value: number) => void,
    range: DateRangeInput,
    now: Date
] => {
    const [index, setIndex, { start: mStart, end: mEnd }, now] =
        useMonthRange(initial_index);

    const range = getCalendarRange(now, index);

    return [index, setIndex, range, now];
};
