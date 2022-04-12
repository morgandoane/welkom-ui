import { TinyUnitFragment } from './../Unit/Unit';
import { AppointmentFragment } from './../Appointment/Appointment';
import { BolAppointmentFragment } from './../BolAppointment/BolAppointment';
import { Itinerary, ItineraryFragment } from './Itinerary';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';
import { TinyProfileFragment } from '../Profile/Profile';
import { UploadEnabledFragment } from '../UploadEnabled/UploadEnabled';
import { ContactFragment } from '../Contact/Contact';
import { CreateItineraryInput } from './CreateItineraryInput';
import { TinyCompanyFragment } from '../Company/Company';
import { BolContentFragment } from '../BolContent/BolContent';
import { TinyOrderFragment } from '../Order/Order';
import { ItemFragment } from '../Item/Item';
import { OrderAppointmentFragment } from '../OrderAppointment/OrderAppointment';
import { NamesPluralFragment } from '../Names/Names';
import { TinyLocationFragment } from '../Location/Location';
import { AddressFragment } from '../Address/Address';

export const CreateItineraryMutation = gql`
    ${ItineraryFragment._document}
    ${UploadEnabledFragment._document}
    ${TinyProfileFragment._document}
    ${ContactFragment._document}
    ${TinyCompanyFragment._document}
    ${TinyOrderFragment._document}
    ${BolContentFragment._document}
    ${BolAppointmentFragment._document}
    ${AppointmentFragment._document}
    ${ItemFragment._document}
    ${OrderAppointmentFragment._document}
    ${TinyUnitFragment._document}
    ${TinyLocationFragment._document}
    ${NamesPluralFragment._document}
    ${AddressFragment._document}
    mutation CreateItineraryMutation($data: CreateItineraryInput!) {
        createItinerary(data: $data) {
            ...ItineraryFragment
        }
    }
`;

export const useItineraryCreation = getMutationHook<
    { createItinerary: Itinerary },
    { data: CreateItineraryInput }
>(CreateItineraryMutation);
