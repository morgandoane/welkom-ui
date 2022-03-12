import { Order, OrderFragment } from './Order';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';
import { CreateOrderInput } from './CreateOrderInput';
import { AddressFragment } from '../Address/Address';
import { BolContentFragment } from '../BolContent/BolContent';
import { TinyCompanyFragment } from '../Company/Company';
import { ContactFragment } from '../Contact/Contact';
import { TinyLocationFragment } from '../Location/Location';
import { OrderAppointmentFragment } from '../OrderAppointment/OrderAppointment';

export const CreateOrderMutation = gql`
    ${OrderFragment._document}
    ${TinyCompanyFragment._document}
    ${OrderAppointmentFragment._document}
    ${ContactFragment._document}
    ${BolContentFragment._document}
    ${TinyLocationFragment._document}
    ${AddressFragment._document}
    mutation CreateOrderMutation($data: CreateOrderInput!) {
        createOrder(data: $data) {
            ...OrderFragment
        }
    }
`;

export const useOrderCreation = getMutationHook<
    { createOrder: Order },
    { data: CreateOrderInput }
>(CreateOrderMutation);
