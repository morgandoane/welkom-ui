import { BaseFragment } from './../../fragments/BaseFragment';
import { BolFragment } from '../../schema/Bol/Bol';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';
import { Itinerary, ItineraryFragment } from '../../schema/Itinerary/Itinerary';
import { TinyOrderFragment } from '../../queries/orders/useOrders';
import { AppFileFragment } from '../../schema/AppFile/AppFile';
import { FulfillmentFragment } from '../../schema/Fulfillment/Fulfillment';
import { VerificationFragment } from '../../schema/Verification/Verification';

const UpdateItinerary = gql`
    ${BaseFragment}
    ${BolFragment}
    ${ItineraryFragment}
    ${FulfillmentFragment}
    ${TinyOrderFragment}
    ${AppFileFragment}
    ${VerificationFragment}
    mutation UpdateItinerary($id: ObjectId!, $data: UpdateItineraryInput!) {
        updateItinerary(id: $id, data: $data) {
            ...ItineraryFragment
        }
    }
`;

export interface UpdateItineraryRes {
    updateItinerary: Itinerary;
}

export interface UpdateItineraryInput {
    orders?: string[];
    code?: string;
    carrier?: string | null;
    deleted: boolean;
}

export interface UpdateItineraryArgs {
    id: string;
    data: UpdateItineraryInput;
}

export const useItineraryUpdate = getMutationHook<
    UpdateItineraryRes,
    UpdateItineraryArgs
>(UpdateItinerary);
