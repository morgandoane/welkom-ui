import { pad } from './pad';

export type Time = number;
export type Meridian = 'AM' | 'PM';

export const getTime = (value: Time): string => {
    const minutes = value % 60;
    const hours = (value - minutes) / 60;
    const meridian: Meridian = hours + minutes / 60 > 12 ? 'PM' : 'AM';

    return `${hours > 12 ? hours - 12 : hours}:${pad(minutes, 2)} ${meridian}`;
};
