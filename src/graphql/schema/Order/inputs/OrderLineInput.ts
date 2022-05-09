import { AppointmentInput } from '../../Appointment/AppointmentInput';
import { ContentInput } from '../../Content/ContentInput';

export interface OrderLineInput {
    appointment: AppointmentInput;
    contents: ContentInput[];
}
