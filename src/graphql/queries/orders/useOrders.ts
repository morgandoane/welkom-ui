import { getQueryHook } from './../../types';
import { gql } from '@apollo/client';
import { TinyOrder, TinyOrderFragment } from '../../schema/Order/Order';
import { TinyBaseFragment } from '../../schema/Base/Base';
import { PaginationResult } from '../../schema/Pagination/Pagination';
import { OrderFilter } from '../../schema/Order/inputs/OrderFilter';

export const TinyOrders = gql`
    ${TinyBaseFragment}
    ${TinyOrderFragment}
    query TinyOrders($filter: OrderFilter!) {
        orders(filter: $filter) {
            count
            items {
                ...TinyOrderFragment
            }
        }
    }
`;

export interface OrdersRes {
    orders: PaginationResult<TinyOrder>;
}

export interface OrdersArgs {
    filter: OrderFilter;
}

export const useOrders = getQueryHook<OrdersRes, OrdersArgs>(TinyOrders);
