import { getMutationHook } from './../../types';
import { gql } from '@apollo/client';

export const CancelOrders = gql`
    mutation CancelOrders($ids: [ObjectId!]!) {
        cancelOrders(ids: $ids)
    }
`;

export interface CancelOrdersArgs {
    ids: string[];
}

export interface CancelOrdersRes {
    cancelOrders: boolean;
}

export const useOrderCancelation = getMutationHook<
    CancelOrdersRes,
    CancelOrdersArgs
>(CancelOrders);
