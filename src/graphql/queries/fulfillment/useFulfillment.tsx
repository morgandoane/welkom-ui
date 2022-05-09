import { gql } from '@apollo/client';
import { AppFileFragment } from '../../schema/AppFile/AppFile';
import { BaseFragment } from '../../schema/Base/Base';
import {
    Fulfillment,
    FulfillmentFragment,
} from '../../schema/Fulfillment/Fulfillment';
import { VerificationFragment } from '../../schema/Verification/Verification';
import { getQueryHook } from '../../types';

export const FulfillmentQuery = gql`
    ${FulfillmentFragment}
    ${BaseFragment}
    ${AppFileFragment}
    ${VerificationFragment}
    query FulfillmentQuery($id: ObjectId!) {
        fulfillment(id: $id) {
            ...FulfillmentFragment
        }
    }
`;

export interface FulfillmentRes {
    fulfillment: Fulfillment;
}

export interface FulfillmentArgs {
    id: string;
}

export const useFulfillment = getQueryHook<FulfillmentRes, FulfillmentArgs>(
    FulfillmentQuery
);
