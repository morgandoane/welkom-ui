import { BaseFragment } from '../../fragments/BaseFragment';
import {
    Fulfillment,
    FulfillmentFragment,
} from '../../schema/Fulfillment/Fulfillment';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';
import { UpdateFulfillmentInput } from '../../schema/Fulfillment/FulfillmentInput';
import { AppFileFragment } from '../../schema/AppFile/AppFile';
import { VerificationFragment } from '../../schema/Verification/Verification';

export const UpdateFulfillment = gql`
    ${FulfillmentFragment}
    ${BaseFragment}
    ${AppFileFragment}
    ${VerificationFragment}
    mutation UpdateFulfillment($id: ObjectId!, $data: UpdateFulfillmentInput!) {
        updateFulfillment(id: $id, data: $data) {
            ...FulfillmentFragment
        }
    }
`;

export interface UpdateFulfillmentRes {
    createFulfillment: Fulfillment;
}

export interface UpdateFulfillmentArgs {
    data: UpdateFulfillmentInput;
}

export const useFulfillmentUpdate = getMutationHook(UpdateFulfillment);
