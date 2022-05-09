import { getQueryHook } from './../../types';
import { gql } from '@apollo/client';
import { AppFileFragment } from '../../schema/AppFile/AppFile';
import { BolFragment } from '../../schema/Bol/Bol';
import { FulfillmentFragment } from '../../schema/Fulfillment/Fulfillment';
import {
    ItineraryFragment,
    TinyItinerary,
} from '../../schema/Itinerary/Itinerary';
import { VerificationFragment } from '../../schema/Verification/Verification';
import { TinyOrderFragment } from '../orders/useOrders';
import { ItineraryFilter } from '../../schema/Itinerary/inputs/ItineraryFilter';
import { PaginationResult } from '../../schema/Pagination/Pagination';
import { BaseFragment, TinyBaseFragment } from '../../schema/Base/Base';

export const ItinerariesQuery = gql`
    ${TinyBaseFragment}
    query ItinerariesQuery($filter: ItineraryFilter!) {
        itineraries(filter: $filter) {
            count
            items {
                ...ItineraryFragment
            }
        }
    }
`;

export interface ItinerariesRes {
    itineraries: PaginationResult<TinyItinerary>;
}

export interface ItinerariesArgs {
    filter: ItineraryFilter;
}

export const useItineraries = getQueryHook<ItinerariesRes, ItinerariesArgs>(
    ItinerariesQuery
);
