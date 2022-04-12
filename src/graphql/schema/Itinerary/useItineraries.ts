import { TinyBolFragment } from './../Bol/Bol';
import { ItineraryScheduleFragment } from './../ItinerarySchedule/ItinerarySchedule';
import { gql } from '@apollo/client';
import { Pagination } from '../../../utils/types/Pagination';
import { getQueryHook } from '../../types';
import { AddressFragment } from '../Address/Address';
import { AppointmentFragment } from '../Appointment/Appointment';
import { BolAppointmentFragment } from '../BolAppointment/BolAppointment';
import { BolContentFragment } from '../BolContent/BolContent';
import { TinyCompanyFragment } from '../Company/Company';
import { ContactFragment } from '../Contact/Contact';
import { ItemFragment } from '../Item/Item';
import { TinyLocationFragment } from '../Location/Location';
import { NamesPluralFragment } from '../Names/Names';
import { TinyProfileFragment } from '../Profile/Profile';
import { TinyUnitFragment } from '../Unit/Unit';
import { TinyItinerary, TinyItineraryFragment } from './Itinerary';
import { ItineraryFilter } from './ItineraryFilter';
import { TinyOrderFragment } from '../Order/Order';
import { OrderAppointmentFragment } from '../OrderAppointment/OrderAppointment';

export const ItinerariesQuery = gql`
    ${TinyItineraryFragment._document}
    ${TinyCompanyFragment._document}
    ${BolContentFragment._document}
    ${AppointmentFragment._document}
    ${ItemFragment._document}
    ${TinyUnitFragment._document}
    ${NamesPluralFragment._document}
    ${TinyProfileFragment._document}
    ${ContactFragment._document}
    ${TinyLocationFragment._document}
    ${AddressFragment._document}
    ${BolAppointmentFragment._document}
    ${TinyOrderFragment._document}
    ${OrderAppointmentFragment._document}
    query ItinerariesQuery($filter: ItineraryFilter!) {
        itineraries(filter: $filter) {
            count
            items {
                ...TinyItineraryFragment
            }
        }
    }
`;

export const useItineraries = getQueryHook<
    { itineraries: Pagination<TinyItinerary> },
    { filter: ItineraryFilter }
>(ItinerariesQuery);
