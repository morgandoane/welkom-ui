import { VerificationFragment } from './../../schema/Verification/Verification';
import { AppFileFragment } from './../../schema/AppFile/AppFile';
import { BaseFragment } from './../../fragments/BaseFragment';
import { BolFragment } from './../../schema/Bol/Bol';
import { getQueryHook } from './../../types';
import { Pagination } from './../../schema/Pagination/Pagination';
import { gql } from '@apollo/client';
import { Bol } from '../../schema/Bol/Bol';
import { BolFilter } from '../../schema/Bol/BolFilter';
import { FulfillmentFragment } from '../../schema/Fulfillment/Fulfillment';

export const BolsQuery = gql`
    ${BolFragment}
    ${BaseFragment}
    ${FulfillmentFragment}
    ${AppFileFragment}
    ${VerificationFragment}
    query Bols($filter: BolFilter!) {
        bols(filter: $filter) {
            count
            items {
                ...BolFragment
            }
        }
    }
`;

export interface BolsArgs {
    filter: BolFilter;
}

export interface BolsRes {
    bols: Pagination<Bol>;
}

export const useBols = getQueryHook<BolsRes, BolsArgs>(BolsQuery);
