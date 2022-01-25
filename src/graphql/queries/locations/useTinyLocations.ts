import { ProductionLine } from './../../schema/ProductionLine/ProductionLine';
import { LocationFIlter as LocationFilter } from './../../schema/Location/LocationFilter';
import { gql } from '@apollo/client';
import { getQueryHook } from './../../types';
import { Pagination } from '../../schema/Pagination/Pagination';

export const TinyLocationFragment = gql`
    fragment TinyLocationFragment on Location {
        _id
        label
        address {
            city
        }
        company {
            _id
            name
        }
        production_lines {
            _id
            name
        }
    }
`;

export const TinyLocations = gql`
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

export interface TinyLocation {
    _id: string;
    label?: string | null;
    address?: {
        city: string;
    } | null;
    company: {
        _id: string;
        name: string;
    };
    production_lines: ProductionLine[];
}

export interface TinyLocationsRes {
    locations: Pagination<TinyLocation>;
}

export interface TinyLocationsArgs {
    filter: LocationFilter;
}

export const useTinyLocations = getQueryHook<
    TinyLocationsRes,
    TinyLocationsArgs
>(TinyLocations);
