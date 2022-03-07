import { gql } from '@apollo/client';
import { UpdatePackagingInput } from '../../../../inputsTypes';
import { getMutationHook } from '../../../../types';
import { PalletConfigurationFragment } from '../../../PalletConfiguration/PalletConfiguration';
import { TinyProfileFragment } from '../../../Profile/Profile';
import { UploadEnabledFragment } from '../../../UploadEnabled/UploadEnabled';
import { ItemFragment } from '../../Item';
import { PackagingFragment, Packaging } from './Packaging';

export const UpdatePackagingMutation = gql`
    ${PackagingFragment._document}
    ${TinyProfileFragment._document}
    ${ItemFragment._document}
    ${PalletConfigurationFragment._document}
    mutation UpdatePackagingMutation(
        $id: ObjectId!
        $data: UpdatePackagingInput!
    ) {
        updatePackaging(id: $id, data: $data) {
            ...PackagingFragment
        }
    }
`;

export const usePackagingUpdate = getMutationHook<
    { updatePackaging: Packaging },
    { id: string; data: UpdatePackagingInput }
>(UpdatePackagingMutation);
