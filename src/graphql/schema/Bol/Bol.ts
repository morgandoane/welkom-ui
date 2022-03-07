import { AppFragment } from './../../types';
import { Identified } from './../Base/Base';
import { TinyItinerary, TinyItineraryFragment } from './../Itinerary/Itinerary';
import { Appointment } from '../Appointment/Appointment';
import { BolContent, BolContentFragment } from './../BolContent/BolContent';
import {
    UploadEnabled,
    UploadEnabledFragment,
} from './../UploadEnabled/UploadEnabled';
import { gql } from '@apollo/client';

export interface Bol extends UploadEnabled {
    itinerary: TinyItinerary;
    code: string | null;
    contents: BolContent[];
    from: Appointment;
    to: Appointment;
}

export interface TinyBol extends Identified {
    itinerary: TinyItinerary;
    code: string | null;
    contents: BolContent[];
    from: Appointment;
    to: Appointment;
}

export const BolFragment = new AppFragment(
    gql`
        fragment BolFragment on Bol {
            ...UploadEnabledFragment
            itinerary {
                ...TinyItineraryFragment
            }
            code
            contents {
                ...BolContentFragment
            }
            from
            to
        }
    `,
    [UploadEnabledFragment, TinyItineraryFragment, BolContentFragment]
);

export const TinyBolFragment = new AppFragment(
    gql`
        fragment TinyBolFragment on Bol {
            _id
            itinerary {
                ...TinyItineraryFragment
            }
            code
            contents {
                ...BolContentFragment
            }
            from
            to
        }
    `,
    [UploadEnabledFragment, TinyItineraryFragment, BolContentFragment]
);
