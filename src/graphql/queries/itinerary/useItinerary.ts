import { FulfillmentFragment } from './../../schema/Fulfillment/Fulfillment';
import { BaseFragment } from './../../fragments/BaseFragment';
import {
    Itinerary,
    ItineraryFragment,
} from './../../schema/Itinerary/Itinerary';
import { BolFragment } from './../../schema/Bol/Bol';
import { gql } from '@apollo/client';
import { getQueryHook } from './../../types';
import { AppFileFragment } from '../../schema/AppFile/AppFile';
import { VerificationFragment } from '../../schema/Verification/Verification';

export const ItineraryQuery = gql`
    ${BaseFragment}
    ${BolFragment}
    ${ItineraryFragment}
    ${FulfillmentFragment}
    ${AppFileFragment}
    ${VerificationFragment}
    query ItineraryQuery($id: ObjectId!) {
        itinerary(id: $id) {
            ...ItineraryFragment
        }
    }
`;

export interface ItineraryRes {
    itinerary: Itinerary;
}

export interface ItineraryArgs {
    id: string;
}

export const useItinerary = getQueryHook<ItineraryRes, ItineraryArgs>(
    ItineraryQuery
);
