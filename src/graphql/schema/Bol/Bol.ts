import { AppointmentFragment } from './../Appointment/Appointment';
import { BolAppointmentFragment } from './../BolAppointment/BolAppointment';
import { AppFragment } from './../../types';
import { Identified } from './../Base/Base';
import { Appointment } from '../Appointment/Appointment';
import { BolContent, BolContentFragment } from './../BolContent/BolContent';
import {
    UploadEnabled,
    UploadEnabledFragment,
} from './../UploadEnabled/UploadEnabled';
import { gql } from '@apollo/client';

export interface Bol extends UploadEnabled {
    code: string | null;
    contents: BolContent[];
    from: Appointment;
    to: Appointment;
}

export interface TinyBol extends Identified {
    code: string | null;
    contents: BolContent[];
    from: Appointment;
    to: Appointment;
}

export const BolFragment = new AppFragment(
    gql`
        fragment BolFragment on Bol {
            ...UploadEnabledFragment
            code
            contents {
                ...BolContentFragment
            }
            from {
                ...AppointmentFragment
            }
            to {
                ...BolAppointmentFragment
            }
        }
    `,
    [
        UploadEnabledFragment,
        BolContentFragment,
        AppointmentFragment,
        BolAppointmentFragment,
    ]
);

export const TinyBolFragment = new AppFragment(
    gql`
        fragment TinyBolFragment on Bol {
            _id
            code
            contents {
                ...BolContentFragment
            }
            from {
                ...AppointmentFragment
            }
            to {
                ...BolAppointmentFragment
            }
        }
    `,
    [BolContentFragment, AppointmentFragment, BolAppointmentFragment]
);
