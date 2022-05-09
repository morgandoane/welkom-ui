import { getQueryHook } from './../../types';
import { TinyBatch, TinyBatchFragment } from './../../schema/Batch/Batch';
import { gql } from '@apollo/client';
import { TinyItemFragment } from '../items/useTinyItems';
import { TinyLocationFragment } from '../locations/useTinyLocations';
import { PaginationResult } from '../../schema/Pagination/Pagination';
import { BatchFilter } from '../../schema/Batch/inputs/BatchFilter';

export const BatchesQuery = gql`
    ${TinyBatchFragment}
    ${TinyItemFragment}
    ${TinyLocationFragment}
    query BatchesQuery($filter: BatchFilter!) {
        batches(filter: $filter) {
            count
            items {
                ...TinyBatchFragment
            }
        }
    }
`;

export interface BatchesRes {
    batches: PaginationResult<TinyBatch>;
}

export interface BatchesArgs {
    filter: BatchFilter;
}

export const useBatches = getQueryHook<BatchesRes, BatchesArgs>(BatchesQuery);
