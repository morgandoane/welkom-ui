import { gql } from '@apollo/client';
import { getQueryHook } from '../../types';
import {
    OrderQueue,
    OrderQueueFragment,
} from '../../schema/OrderQueue/OrderQueue';
import { OrderQueueLineFragment } from '../../schema/OrderQueue/OrderQueueLine';

export const OrderQueueQuery = gql`
    ${OrderQueueFragment}
    ${OrderQueueLineFragment}
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
