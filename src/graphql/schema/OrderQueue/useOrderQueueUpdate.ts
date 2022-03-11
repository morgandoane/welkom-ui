import { getMutationHook } from './../../types';
import { OrderQueue, OrderQueueFragment } from './OrderQueue';
import { gql } from '@apollo/client';
import { OrderQueueLineFragment } from '../OrderQueueLine/OrderQueueLine';
import { OrderQueueInput } from './OrderQueueInput';

export const OrderQueueQuery = gql`
    ${OrderQueueFragment._document}
    ${OrderQueueLineFragment._document}
    mutation UpdateOrderQueue($data: OrderQueueInput!) {
        updateOrderQueue(data: $data) {
            ...OrderQueueFragment
        }
    }
`;

export const useOrderQueueUpdate = getMutationHook<
    { updateOrderQueue: OrderQueue },
    { data: OrderQueueInput }
>(OrderQueueQuery);
