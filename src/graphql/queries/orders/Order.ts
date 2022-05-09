import { getQueryHook } from './../../types';
import { Order, OrderFragment } from './../../schema/Order/Order';
import { gql } from '@apollo/client';
import { BaseFragment } from '../../schema/Base/Base';

export const OrderQuery = gql`
    ${BaseFragment}
    ${OrderFragment}
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
