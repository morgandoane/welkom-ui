import { Order, OrderFragment } from './Order';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';
import { UpdateOrderInput } from './UpdateOrderInput';
import { AddressFragment } from '../Address/Address';
import { BolContentFragment } from '../BolContent/BolContent';
import { TinyCompanyFragment } from '../Company/Company';
import { ContactFragment } from '../Contact/Contact';
import { TinyLocationFragment } from '../Location/Location';
import { OrderAppointmentFragment } from '../OrderAppointment/OrderAppointment';

export const UpdateOrderMutation = gql`
    ${OrderFragment._document}
    ${TinyCompanyFragment._document}
    ${OrderAppointmentFragment._document}
    ${ContactFragment._document}
    ${BolContentFragment._document}
    ${TinyLocationFragment._document}
    ${AddressFragment._document}
    mutation UpdateOrderMutation($id: ObjectId!, $data: UpdateOrderInput!) {
        updateOrder(id: $id, data: $data) {
            ...OrderFragment
        }
    }
`;

export const useOrderUpdate = getMutationHook<
    { updateOrder: Order },
    { id: string; data: UpdateOrderInput }
>(UpdateOrderMutation);
