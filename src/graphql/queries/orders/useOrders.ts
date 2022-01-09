import { TinyCompany } from './../../schema/Company/Company';
import { getQueryHook } from './../../types';
import { OrderFilter } from '../../schema/Order/OrderFilter';
import { gql } from '@apollo/client';
import { Pagination } from '../../schema/Pagination/Pagination';

export interface TinyOrder {
    _id: string;
    code: string;
    vendor?: TinyCompany | null;
    customer?: TinyCompany | null;
    contents: {
        item: {
            _id: string;
            english: string;
        };
        quantity: number;
        unit: {
            _id: string;
            english: string;
        };
    }[];
}

export const TinyOrderFragment = gql`
    fragment TinyOrderFragment on Order {
        _id
        code
        vendor {
            _id
            name
        }
        customer {
            _id
            name
        }
        contents {
            item {
                _id
                english
            }
            quantity
            unit {
                _id
                english
            }
        }
    }
`;

export const TinyOrders = gql`
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
    orders: Pagination<TinyOrder>;
}

export interface OrdersArgs {
    filter: OrderFilter;
}

export const useOrders = getQueryHook<OrdersRes, OrdersArgs>(TinyOrders);
