import { gql } from '@apollo/client';
import { UpdateMiscItemInput } from '../../../../inputsTypes';
import { getMutationHook } from '../../../../types';
import { TinyProfileFragment } from '../../../Profile/Profile';
import { ItemFragment } from '../../Item';
import { MiscItemFragment, MiscItem } from './MiscItem';

export const UpdateMiscItemMutation = gql`
    ${MiscItemFragment._document}
    ${TinyProfileFragment._document}
    ${ItemFragment._document}
    mutation UpdateMiscItemMutation(
        $id: ObjectId!
        $data: UpdateMiscItemInput!
    ) {
        updateMiscItem(id: $id, data: $data) {
            ...MiscItemFragment
        }
    }
`;

export const useMiscItemUpdate = getMutationHook<
    { updateMiscItem: MiscItem },
    { id: string; data: UpdateMiscItemInput }
>(UpdateMiscItemMutation);
