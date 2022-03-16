import { NamesPluralFragment } from './../Names/Names';
import { TinyUnitFragment } from './../Unit/Unit';
import { ItemFragment } from './../Item/Item';
import { TinyProfileFragment } from './../Profile/Profile';
import { UploadEnabledFragment } from './../UploadEnabled/UploadEnabled';
import { getAtomicQueryHook } from '../../types';
import { gql } from '@apollo/client';
import { OrderFragment, Order } from './Order';
import { TinyCompanyFragment } from '../Company/Company';
import { OrderAppointmentFragment } from '../OrderAppointment/OrderAppointment';
import { ContactFragment } from '../Contact/Contact';
import { BolContentFragment } from '../BolContent/BolContent';
import { TinyLocationFragment } from '../Location/Location';
import { AddressFragment } from '../Address/Address';

export const OrderQuery = gql`
    ${UploadEnabledFragment._document}
    ${TinyProfileFragment._document}
    ${ItemFragment._document}
    ${TinyUnitFragment._document}
    ${NamesPluralFragment._document}
    ${TinyProfileFragment._document}
    ${OrderFragment._document}
    ${TinyCompanyFragment._document}
    ${OrderAppointmentFragment._document}
    ${ContactFragment._document}
    ${BolContentFragment._document}
    ${TinyLocationFragment._document}
    ${AddressFragment._document}
    query OrderQuery($id: ObjectId!) {
        order(id: $id) {
            ...OrderFragment
        }
    }
`;

export const useOrder = getAtomicQueryHook<{ order: Order }>(OrderQuery);
