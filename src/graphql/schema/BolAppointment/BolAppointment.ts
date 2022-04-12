import { gql } from '@apollo/client';
import { AppFragment } from '../../types';
import { Appointment } from '../Appointment/Appointment';

export type BolAppointment = Appointment;

export const BolAppointmentFragment = new AppFragment(
    gql`
        fragment BolAppointmentFragment on BolAppointment {
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
