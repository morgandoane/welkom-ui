import { NamesFragment } from './../Names/Names';
import { QualityCheckFilter } from '../../inputsTypes';
import { Pagination } from '../../../utils/types/Pagination';
import { getFilterQueryHook } from '../../types';
import { TinyQualityCheck, TinyQualityCheckFragment } from './QualityCheck';
import { gql } from '@apollo/client';
import { TinyItemFragment } from '../Item/Item';

export const QualityChecksQuery = gql`
    ${TinyQualityCheckFragment._document}
    ${NamesFragment._document}
    ${TinyItemFragment._document}
    query QualityChecksQuery($filter: QualityCheckFilter!) {
        qualityChecks(filter: $filter) {
            count
            items {
                ...TinyQualityCheckFragment
            }
        }
    }
`;

export const useQualityChecks = getFilterQueryHook<
    { qualityChecks: Pagination<TinyQualityCheck> },
    { filter: QualityCheckFilter }
>(QualityChecksQuery);
