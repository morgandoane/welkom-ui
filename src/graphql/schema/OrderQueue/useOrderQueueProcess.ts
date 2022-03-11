import { getMutationHook } from '../../types';
import { gql } from '@apollo/client';

export const ProcessOrderQueueMutation = gql`
    mutation ProcessOrderQueue {
        processOrderQueue
    }
`;

export const useOrderQueueProcess = getMutationHook<{
    processOrderQueue: boolean;
}>(ProcessOrderQueueMutation);
