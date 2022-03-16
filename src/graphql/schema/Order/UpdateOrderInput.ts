import { OrderAppointmentInput } from './../OrderAppointment/OrderAppointmentInput';

export interface UpdateOrderInput {
    po: string;
    customer: string;
    vendor: string;
    deleted?: boolean;
    appointments: OrderAppointmentInput[];
}
