import { BolContentInput } from '../../inputsTypes';

export interface OrderAppointmentInput {
    contents: BolContentInput[];
    date: Date | null;
    location: string | null;
    time: number | null;
}
