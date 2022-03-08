import { MiscItem, MiscItemFragment } from './MiscItem';
import { gql } from '@apollo/client';
import { CreateMiscItemInput } from '../../../../inputsTypes';
import { getMutationHook } from '../../../../types';
import { TinyProfileFragment } from '../../../Profile/Profile';
import { PalletConfigurationFragment } from '../../../PalletConfiguration/PalletConfiguration';
import { ItemFragment } from '../../Item';

export const CreateMiscItemMutation = gql`
    ${MiscItemFragment._document}
    ${TinyProfileFragment._document}
    ${ItemFragment._document}
    ${PalletConfigurationFragment._document}
    mutation CreateMiscItemMutation($data: CreateMiscItemInput!) {
        createMiscItem(data: $data) {
            ...MiscItemFragment
        }
    }
`;

export const useMiscItemCreation = getMutationHook<
    { createMiscItem: MiscItem },
    { data: CreateMiscItemInput }
>(CreateMiscItemMutation);
