import { Packaging, PackagingFragment } from './Packaging';
import { gql } from '@apollo/client';
import { CreatePackagingInput } from '../../../../inputsTypes';
import { getMutationHook } from '../../../../types';
import { TinyProfileFragment } from '../../../Profile/Profile';
import { ItemFragment } from '../../Item';

export const CreatePackagingMutation = gql`
    ${PackagingFragment._document}
    ${TinyProfileFragment._document}
    ${ItemFragment._document}
    mutation CreatePackagingMutation($data: CreatePackagingInput!) {
        createPackaging(data: $data) {
            ...PackagingFragment
        }
    }
`;

export const usePackagingCreation = getMutationHook<
    { createPackaging: Packaging },
    { data: CreatePackagingInput }
>(CreatePackagingMutation);
