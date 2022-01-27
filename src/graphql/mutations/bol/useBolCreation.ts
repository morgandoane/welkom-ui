import { VerificationFragment } from './../../schema/Verification/Verification';
import { AppFileFragment } from './../../schema/AppFile/AppFile';
import { BaseFragment } from './../../fragments/BaseFragment';
import { FulfillmentFragment } from './../../schema/Fulfillment/Fulfillment';
import { CreateBolInput } from './../../schema/Bol/BolInput';
import { Bol, BolFragment } from './../../schema/Bol/Bol';
import { gql } from '@apollo/client';
import { getMutationHook } from './../../types';

export const CreateBol = gql`
    ${BolFragment}
    ${FulfillmentFragment}
    ${BaseFragment}
    ${AppFileFragment}
    ${VerificationFragment}
    mutation CreateBol($data: CreateBolInput!) {
        createBol(data: $data) {
            ...BolFragment
        }
    }
`;

export interface CreateBolRes {
    createBol: Bol;
}

export interface CreateBolArgs {
    data: CreateBolInput;
}

export const useBolCreation = getMutationHook<CreateBolRes, CreateBolArgs>(
    CreateBol
);
