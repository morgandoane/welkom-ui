import { AppFragment } from './../../types';
import { TinyLocation } from './../Location/Location';
import { TinyCompany } from './../Company/Company';
import { gql } from '@apollo/client';
import { Identified } from '../Base/Base';

export interface Appointment extends Identified {
    date: Date;
    time_sensitive: boolean;
    company: TinyCompany | null;
    location: TinyLocation | null;
}

export const AppointmentFragment = new AppFragment(
    gql`
        fragment AppointmentFragment on Appointment {
            _id
            date
            time_sensitive
            company {
                ...TinyCompanyFragment
            }
            location {
                ...TinyLocationFragment
            }
        }
    `,
    []
);
