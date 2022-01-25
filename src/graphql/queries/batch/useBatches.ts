import { ProductionLineFragment } from './../../schema/ProductionLine/ProductionLine';
import { TinyProceduralLotFragment } from './../../schema/Lot/Lot';
import { getQueryHook } from './../../types';
import { BatchFilter } from './../../schema/Batch/BatchFilter';
import { BatchList } from './../../schema/Batch/BatchList';
import { TinyBatchFragment } from './../../schema/Batch/Batch';
import { gql } from '@apollo/client';
import { TinyItemFragment } from '../items/useTinyItems';
import { TinyLocationFragment } from '../locations/useTinyLocations';

export const BatchesQuery = gql`
    ${TinyBatchFragment}
    ${TinyProceduralLotFragment}
    ${TinyItemFragment}
    ${ProductionLineFragment}
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
    batches: BatchList;
}

export interface BatchesArgs {
    filter: BatchFilter;
}

export const useBatches = getQueryHook<BatchesRes, BatchesArgs>(BatchesQuery);
