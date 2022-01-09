import { OrderQueueContentFragment } from '../../schema/OrderQueue/OrderQueueContentFragment';
import { gql } from '@apollo/client';
import { getQueryHook } from '../../types';
import { OrderQueue } from '../../schema/OrderQueue/OrderQueue';

export const OrderQueueQuery = gql`
    ${OrderQueueContentFragment}
    query OrderQueueQuery {
        orderQueue {
            _id
            contents {
                ...OrderQueueContentFragment
            }
        }
    }
`;

export interface OrderQueueRes {
    orderQueue: OrderQueue | null;
}

export const useOrderQueue = getQueryHook<OrderQueueRes>(OrderQueueQuery);
