import { getQueryHook } from './../../types';
import { gql } from '@apollo/client';
import { BaseFragment } from '../../fragments/BaseFragment';
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

export const ItinerariesQuery = gql`
    ${BaseFragment}
    ${BolFragment}
    ${ItineraryFragment}
    ${FulfillmentFragment}
    ${AppFileFragment}
    ${VerificationFragment}
    ${TinyOrderFragment}
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
