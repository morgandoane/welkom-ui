import { getMutationHook } from '../../types';
import { OrderQueueFragment } from './OrderQueue';
import { gql } from '@apollo/client';
import { OrderQueueLineFragment } from '../OrderQueueLine/OrderQueueLine';

export const ProcessOrderQueueMutation = gql`
    ${OrderQueueFragment._document}
    ${OrderQueueLineFragment._document}
    mutation ProcessOrderQueue {
        processOrderQueue
    }
`;

export const useOrderQueueProcess = getMutationHook<{
    updateOrderQueue: boolean;
}>(ProcessOrderQueueMutation);
