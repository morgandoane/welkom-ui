import { getQueryHook } from './../../types';
import { ItineraryFilter } from './../../schema/Itinerary/ItineraryFilter';
import { ItineraryList } from './../../schema/Itinerary/ItineraryList';
import { gql } from '@apollo/client';
import { BaseFragment } from '../../fragments/BaseFragment';
import { AppFileFragment } from '../../schema/AppFile/AppFile';
import { BolFragment } from '../../schema/Bol/Bol';
import { FulfillmentFragment } from '../../schema/Fulfillment/Fulfillment';
import { ItineraryFragment } from '../../schema/Itinerary/Itinerary';
import { VerificationFragment } from '../../schema/Verification/Verification';
import { TinyOrderFragment } from '../orders/useOrders';

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
    itineraries: ItineraryList;
}

export interface ItinerariesArgs {
    filter: ItineraryFilter;
}

export const useItineraries = getQueryHook<ItinerariesRes, ItinerariesArgs>(
    ItinerariesQuery
);
