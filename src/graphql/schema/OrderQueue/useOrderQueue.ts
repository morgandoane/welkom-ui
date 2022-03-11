import { getQueryHook } from './../../types';
import { OrderQueue, OrderQueueFragment } from './OrderQueue';
import { gql } from '@apollo/client';
import { OrderQueueLineFragment } from '../OrderQueueLine/OrderQueueLine';

export const OrderQueueQuery = gql`
    ${OrderQueueFragment._document}
    ${OrderQueueLineFragment._document}
    query OrderQueueQuery {
        orderQueue {
            ...OrderQueueFragment
        }
    }
`;

export const useOrderQueue =
    getQueryHook<{ orderQueue: OrderQueue }>(OrderQueueQuery);
