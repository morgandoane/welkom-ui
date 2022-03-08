import { NamesFragment, NamesPluralFragment } from './../Names/Names';
import { UnitFilter } from '../../inputsTypes';
import { Pagination } from '../../../utils/types/Pagination';
import { getFilterQueryHook } from '../../types';
import { TinyUnit, TinyUnitFragment } from './Unit';
import { gql } from '@apollo/client';

export const UnitsQuery = gql`
    ${TinyUnitFragment._document}
    ${NamesPluralFragment._document}
    query UnitsQuery($filter: UnitFilter!) {
        units(filter: $filter) {
            count
            items {
                ...TinyUnitFragment
            }
        }
    }
`;

export const useUnits = getFilterQueryHook<
    { units: Pagination<TinyUnit> },
    { filter: UnitFilter }
>(UnitsQuery);
