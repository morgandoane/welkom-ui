import { gql } from '@apollo/client';
import { TinyCompany } from '../Company/Company';
import { TinyLocation } from '../Location/Location';

export interface Appointment {
    date: Date;
    company: TinyCompany;
    location?: TinyLocation | null;
    time?: number | null;
}

export const AppointmentFragment = gql`
    fragment AppointmentFragment on Appointment {
        date
        company {
            ...TinyCompanyFragment
        }
        location {
            ...TinyLocationFragment
        }
        time
    }
`;
