import { Batch, BatchFragment } from './../../schema/Batch/Batch';
import { getQueryHook } from '../../types';
import { gql } from '@apollo/client';
import { BaseFragment } from '../../schema/Base/Base';

export const BatchQuery = gql`
    ${BaseFragment}
    ${BatchFragment}
    query BatchQuery($id: ObjectId!) {
        batch(id: $id) {
            ...BatchFragment
        }
    }
`;

export interface BatchRes {
    batch: Batch;
}

export interface BatchArgs {
    id: string;
}

export const useBatch = getQueryHook<BatchRes, BatchArgs>(BatchQuery);
