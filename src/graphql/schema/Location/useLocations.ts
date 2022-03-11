import { ContactFragment } from './../Contact/Contact';
import { LocationFilter } from '../../inputsTypes';
import { Pagination } from '../../../utils/types/Pagination';
import { getFilterQueryHook } from '../../types';
import { TinyLocation, TinyLocationFragment } from './Location';
import { gql } from '@apollo/client';
import { AddressFragment } from '../Address/Address';
import { TinyCompanyFragment } from '../Company/Company';

export const LocationsQuery = gql`
    ${TinyLocationFragment._document}
    ${TinyCompanyFragment._document}
    ${AddressFragment._document}
    ${ContactFragment._document}
    query LocationsQuery($filter: LocationFilter!) {
        locations(filter: $filter) {
            count
            items {
                ...TinyLocationFragment
            }
        }
    }
`;

export const useLocations = getFilterQueryHook<
    { locations: Pagination<TinyLocation> },
    { filter: LocationFilter }
>(LocationsQuery);
