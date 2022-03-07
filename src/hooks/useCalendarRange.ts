import React from 'react';
import { getMonthRange, getDayRange, getWeekRange } from './useMonthRange';
import { addDays, getDay } from 'date-fns';
import { DateRange } from '../utils/types/DateRange';

export type CalendarView = 'day' | 'week' | 'month';

export const getCalendarRange = (
    origin: Date,
    index: number,
    view: CalendarView
): DateRange => {
    const { start: mStart, end: mEnd } =
        view == 'day'
            ? getDayRange(origin, index)
            : view == 'week'
            ? getWeekRange(origin, index)
            : getMonthRange(origin, index);
    const start =
        view == 'month' ? addDays(mStart, 0 - getDay(mStart)) : mStart;
    const end = view == 'month' ? addDays(mEnd, 7 - getDay(mEnd)) : mEnd;

    return {
        start,
        end,
    };
};

export const useCalendarRange = (
    view: CalendarView,
    initial_index = 0
): [
    index: number,
    setIndex: (value: number) => void,
    range: DateRange,
    now: Date
] => {
    const [now, setNow] = React.useState<Date>(new Date());
    const [index, setIndex] = React.useState(initial_index);
    const range = getCalendarRange(now, index, view);
    return [index, setIndex, range, now];
};
