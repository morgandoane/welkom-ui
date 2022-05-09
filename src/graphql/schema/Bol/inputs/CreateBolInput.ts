import { Ref } from '../../../types';
import { AppointmentInput } from '../../Appointment/AppointmentInput';
import { ContentInput } from '../../Content/ContentInput';
import { Itinerary } from '../../Itinerary/Itinerary';
import { BolDocumentationInput } from './BolDocumentationInput';

export interface CreateBolInput {
    itinerary: Ref<Itinerary>;
    from: AppointmentInput;
    to: AppointmentInput;
    contents: ContentInput[];
    documentation?: BolDocumentationInput | null;
}
