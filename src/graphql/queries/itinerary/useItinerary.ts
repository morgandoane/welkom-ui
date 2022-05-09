import {
    Itinerary,
    ItineraryFragment,
} from './../../schema/Itinerary/Itinerary';
import { gql } from '@apollo/client';
import { getQueryHook } from './../../types';
import { BaseFragment } from '../../schema/Base/Base';

export const ItineraryQuery = gql`
    ${BaseFragment}
    ${ItineraryFragment}
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
