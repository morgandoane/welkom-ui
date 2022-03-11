import { BolContentInput } from '../../inputsTypes';

export interface OrderAppointmentInput {
    contents: BolContentInput[];
    date: Date;
    deleted: boolean;
    location: string | null;
}
