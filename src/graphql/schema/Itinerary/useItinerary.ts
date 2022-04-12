import { ContactFragment } from '../Contact/Contact';
import { Itinerary, ItineraryFragment } from './Itinerary';
import { getAtomicQueryHook } from '../../types';
import { gql } from '@apollo/client';
import { UploadEnabledFragment } from '../UploadEnabled/UploadEnabled';
import { TinyProfileFragment } from '../Profile/Profile';
import { AddressFragment } from '../Address/Address';
import { AppointmentFragment } from '../Appointment/Appointment';
import { BolAppointmentFragment } from '../BolAppointment/BolAppointment';
import { BolContentFragment } from '../BolContent/BolContent';
import { TinyCompanyFragment } from '../Company/Company';
import { ItemFragment } from '../Item/Item';
import { TinyLocationFragment } from '../Location/Location';
import { NamesPluralFragment } from '../Names/Names';
import { TinyOrderFragment } from '../Order/Order';
import { OrderAppointmentFragment } from '../OrderAppointment/OrderAppointment';
import { TinyUnitFragment } from '../Unit/Unit';

export const ItineraryQuery = gql`
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
    query ItineraryQuery($id: ObjectId!) {
        itinerary(id: $id) {
            ...ItineraryFragment
        }
    }
`;

export const useItinerary =
    getAtomicQueryHook<{ itinerary: Itinerary }>(ItineraryQuery);
