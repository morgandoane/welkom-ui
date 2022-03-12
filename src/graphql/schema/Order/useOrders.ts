import { NamesFragment, NamesPluralFragment } from './../Names/Names';
import { TinyProfileFragment } from './../Profile/Profile';
import { TinyUnitFragment } from './../Unit/Unit';
import { ItemFragment } from './../Item/Item';
import { AddressFragment } from './../Address/Address';
import { Pagination } from '../../../utils/types/Pagination';
import { getFilterQueryHook } from '../../types';
import { TinyOrder, TinyOrderFragment } from './Order';
import { gql } from '@apollo/client';
import { TinyCompanyFragment } from '../Company/Company';
import { OrderAppointmentFragment } from '../OrderAppointment/OrderAppointment';
import { ContactFragment } from '../Contact/Contact';
import { BolContentFragment } from '../BolContent/BolContent';
import { TinyLocationFragment } from '../Location/Location';
import { OrderFilter } from './OrderFilter';

export const OrdersQuery = gql`
    ${TinyOrderFragment._document}
    ${TinyCompanyFragment._document}
    ${OrderAppointmentFragment._document}
    ${ContactFragment._document}
    ${BolContentFragment._document}
    ${TinyLocationFragment._document}
    ${AddressFragment._document}
    ${ItemFragment._document}
    ${TinyUnitFragment._document}
    ${TinyProfileFragment._document}
    ${NamesPluralFragment._document}
    query OrdersQuery($filter: OrderFilter!) {
        orders(filter: $filter) {
            count
            items {
                ...TinyOrderFragment
            }
        }
    }
`;

export const useOrders = getFilterQueryHook<
    { orders: Pagination<TinyOrder> },
    { filter: OrderFilter }
>(OrdersQuery);
