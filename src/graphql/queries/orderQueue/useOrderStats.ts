import { getQueryHook } from './../../types';
import { TinyItemFragment } from './../items/useTinyItems';
import { OrderStatisticFilter } from './../../schema/OrderStatistic/OrderStatisticsFilter';
import { gql } from '@apollo/client';
import { OrderStatistic } from '../../schema/OrderStatistic/OrderStatistic';

export const OrderStats = gql`
    ${TinyItemFragment}
    query ($filter: OrderStatisticFilter!) {
        orderStatistics(filter: $filter) {
            ranges {
                month
                quantitys {
                    unit_class
                    quantity
                }
            }
            item {
                ...TinyItemFragment
            }
        }
    }
`;

export interface OrderStatsArgs {
    filter: OrderStatisticFilter;
}

export interface OrderStatsRes {
    orderStatistics: OrderStatistic[];
}

export const useOrderStats = getQueryHook<OrderStatsRes, OrderStatsArgs>(
    OrderStats
);
