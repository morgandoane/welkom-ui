import { VerificationFragment } from './../../schema/Verification/Verification';
import { FulfillmentFragment } from './../../schema/Fulfillment/Fulfillment';
import { BolFragment } from './../../schema/Bol/Bol';
import { ItineraryFragment } from './../../schema/Itinerary/Itinerary';
import { AppFileFragment } from './../../schema/AppFile/AppFile';
import { OrderFragment } from './OrderFragment';
import { getQueryHook } from './../../types';
import { Order } from './../../schema/Order/Order';
import { BaseFragment } from './../../fragments/BaseFragment';
import { gql } from '@apollo/client';

export const OrderQuery = gql`
    ${BaseFragment}
    ${OrderFragment}
    ${BolFragment}
    ${AppFileFragment}
    ${ItineraryFragment}
    ${FulfillmentFragment}
    ${VerificationFragment}
    query OrderQuery($id: ObjectId!) {
        order(id: $id) {
            ...OrderFragment
        }
    }
`;

export interface OrderRes {
    order: Order;
}

export interface OrderArgs {
    id: string;
}

export const useOrder = getQueryHook<OrderRes, OrderArgs>(OrderQuery);
