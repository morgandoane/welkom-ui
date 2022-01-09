import { getQueryHook } from './../../types';
import { Bol, BolFragment } from './../../schema/Bol/Bol';
import { gql } from '@apollo/client';
import { BaseFragment } from '../../fragments/BaseFragment';
import { AppFileFragment } from '../../schema/AppFile/AppFile';
import { FulfillmentFragment } from '../../schema/Fulfillment/Fulfillment';
import { VerificationFragment } from '../../schema/Verification/Verification';

export const BolQuery = gql`
    ${BolFragment}
    ${BaseFragment}
    ${FulfillmentFragment}
    ${AppFileFragment}
    ${VerificationFragment}
    query BolQuery($id: ObjectId!) {
        bol(id: $id) {
            ...BolFragment
        }
    }
`;

export interface BolRes {
    bol: Bol;
}

export interface BolArgs {
    id: string;
}

export const useBol = getQueryHook<BolRes, BolArgs>(BolQuery);
