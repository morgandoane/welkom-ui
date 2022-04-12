import { AppFragment } from './../../types';
import { TinyLocation } from './../Location/Location';
import { TinyCompany } from './../Company/Company';
import { gql } from '@apollo/client';
import { Identified } from '../Base/Base';

export interface Appointment extends Identified {
    date: Date;
    time: number | null;
    company: TinyCompany;
    location: TinyLocation | null;
}

export const AppointmentFragment = new AppFragment(
    gql`
        fragment AppointmentFragment on Appointment {
            _id
            date
            time
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
