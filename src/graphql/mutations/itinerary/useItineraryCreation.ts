import { BolFragment } from './../../schema/Bol/Bol';
import { gql } from '@apollo/client';
import { getMutationHook } from './../../types';
import { Itinerary, ItineraryFragment } from '../../schema/Itinerary/Itinerary';
import { BaseFragment } from '../../fragments/BaseFragment';

const CreateItinerary = gql`
    ${BaseFragment}
    ${BolFragment}
    ${ItineraryFragment}
    mutation CreateItinerary($data: CreateItineraryInput!) {
        createItinerary(data: $data) {
            ...ItineraryFragment
        }
    }
`;

export interface CreateItineraryRes {
    createItinerary: Itinerary;
}

export interface CreateItineraryInput {
    orders: string[];
    code: string;
    carrier?: string;
}

export interface CreateItineraryArgs {
    data: CreateItineraryInput;
}

export const useItineraryCreation = getMutationHook<
    CreateItineraryRes,
    CreateItineraryArgs
>(CreateItinerary);
