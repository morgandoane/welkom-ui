import { UpdateVerificationInput } from './../../schema/Verification/VerificationInput';
import { BaseFragment } from './../../fragments/BaseFragment';
import {
    Verification,
    VerificationFragment,
} from './../../schema/Verification/Verification';
import { getMutationHook } from './../../types';
import { gql } from '@apollo/client';

export const UpdateVericiation = gql`
    ${BaseFragment}
    ${VerificationFragment}
    mutation UpdateVerification(
        $data: UpdateVerificationInput!
        $id: ObjectId!
    ) {
        updateVerification(data: $data, id: $id) {
            ...VerificationFragment
        }
    }
`;

export interface UpdateVericationRes {
    updateVerification: Verification;
}

export interface UpdateVericationArgs {
    id: string;
    data: UpdateVerificationInput;
}

export const useVerificationUpdate = getMutationHook<
    UpdateVericationRes,
    UpdateVericationArgs
>(UpdateVericiation);
