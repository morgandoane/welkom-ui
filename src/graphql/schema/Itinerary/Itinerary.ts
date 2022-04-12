import { ItineraryStatus } from './ItineraryStatus';
import { BolAppointmentFragment } from './../BolAppointment/BolAppointment';
import { AppFragment } from './../../types';
import { TinyCompanyFragment } from './../Company/Company';
import { Identified } from './../Base/Base';
import {
    UploadEnabled,
    UploadEnabledFragment,
} from './../UploadEnabled/UploadEnabled';
import { TinyCompany } from '../Company/Company';
import { gql } from '@apollo/client';
import { BolContent, BolContentFragment } from '../BolContent/BolContent';
import { Appointment, AppointmentFragment } from '../Appointment/Appointment';
import { TinyOrder, TinyOrderFragment } from '../Order/Order';

export interface TinyItineraryBol extends Identified {
    code: string | null;
    contents: BolContent[];
    from: Appointment;
    to: Appointment;
}

export interface Itinerary extends UploadEnabled {
    code: string | null;
    carrier: TinyCompany | null;
    bols: TinyItineraryBol[];
    order_link: TinyOrder | null;
    status: ItineraryStatus;
}

export interface TinyItinerary extends Identified {
    code: string | null;
    carrier: TinyCompany | null;
    bols: TinyItineraryBol[];
    order_link: TinyOrder | null;
    status: ItineraryStatus;
}

export const ItineraryFragment = new AppFragment(
    gql`
        fragment ItineraryFragment on Itinerary {
            ...UploadEnabledFragment
            code
            status
            order_link {
                ...TinyOrderFragment
            }
            carrier {
                ...TinyCompanyFragment
            }
            bols {
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
        }
    `,
    [
        UploadEnabledFragment,
        TinyCompanyFragment,
        BolContentFragment,
        AppointmentFragment,
        BolAppointmentFragment,
        TinyOrderFragment,
    ]
);

export const TinyItineraryFragment = new AppFragment(
    gql`
        fragment TinyItineraryFragment on Itinerary {
            _id
            code
            status
            order_link {
                ...TinyOrderFragment
            }
            carrier {
                ...TinyCompanyFragment
            }
            bols {
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
        }
    `,
    [
        TinyCompanyFragment,
        BolContentFragment,
        AppointmentFragment,
        BolAppointmentFragment,
        TinyOrderFragment,
    ]
);
