import {
    addMonths,
    addWeeks,
    endOfMonth,
    endOfWeek,
    startOfMonth,
    startOfWeek,
    addDays,
    startOfDay,
    endOfDay,
} from 'date-fns';
import React from 'react';
import { DateRangeInput } from './../graphql/schema/DateRange/DateRange';

export const getMonthRange = (origin: Date, index: number): DateRangeInput => {
    const indexed = addMonths(origin, index);

    const start = startOfMonth(indexed);
    const end = endOfMonth(indexed);

    return { start, end };
};

export const getWeekRange = (origin: Date, index: number): DateRangeInput => {
    const indexed = addWeeks(origin, index);

    const start = startOfWeek(indexed);
    const end = endOfWeek(indexed);

    return { start, end };
};

export const getDayRange = (origin: Date, index: number): DateRangeInput => {
    const indexed = addDays(origin, index);

    const start = startOfDay(indexed);
    const end = endOfDay(indexed);

    return { start, end };
};
