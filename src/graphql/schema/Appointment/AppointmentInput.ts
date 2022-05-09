import { Ref } from '../../types';
import { Company } from '../Company/Company';
import { Location } from '../Location/Location';

export interface AppointmentInput {
    date: Date;
    company: Ref<Company>;
    location?: Ref<Location> | null;
    time?: number | null;
}
