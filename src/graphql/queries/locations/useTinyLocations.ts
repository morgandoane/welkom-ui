import { gql } from '@apollo/client';
import { TinyBaseFragment } from '../../schema/Base/Base';
import { LocationFilter } from '../../schema/Location/inputs/LocationFilter';
import {
    TinyLocation,
    TinyLocationFragment,
} from '../../schema/Location/Location';
import { PaginationResult } from '../../schema/Pagination/Pagination';
import { getQueryHook } from './../../types';

export const TinyLocations = gql`
    ${TinyBaseFragment}
    ${TinyLocationFragment}
    query TinyLocations($filter: LocationFIlter!) {
        locations(filter: $filter) {
            count
            items {
                ...TinyLocationFragment
            }
        }
    }
`;

export interface TinyLocationsRes {
    locations: PaginationResult<TinyLocation>;
}

export interface TinyLocationsArgs {
    filter: LocationFilter;
}

export const useTinyLocations = getQueryHook<
    TinyLocationsRes,
    TinyLocationsArgs
>(TinyLocations);
