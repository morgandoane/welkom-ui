import { ItemContentInput } from '../Content/ContentInputs';

export interface BolAppointmentInput {
    company: string;
    location?: string;
    date: Date;
}

export interface CreateBolInput {
    itinerary: string;
    code: string;
    from: BolAppointmentInput;
    to: BolAppointmentInput;
    contents: ItemContentInput[];
}

export interface UpdateBolInput {
    code: string;
    from: BolAppointmentInput;
    to: BolAppointmentInput;
    contents: ItemContentInput[];
    deleted?: boolean;
}
