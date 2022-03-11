import { OrderAppointmentInput } from './../OrderAppointment/OrderAppointmentInput';

export interface CreateOrderInput {
    po: string;
    customer: string;
    vendor: string;
    appointments: OrderAppointmentInput[];
}
