import { ItemFragment } from '../../Item';
import { MiscItem, MiscItemFragment } from './MiscItem';
import { gql } from '@apollo/client';
import { getAtomicQueryHook } from '../../../../types';
import { TinyProfileFragment } from '../../../Profile/Profile';
import { PalletConfigurationFragment } from '../../../PalletConfiguration/PalletConfiguration';

export const MiscItemQuery = gql`
    ${MiscItemFragment._document}
    ${TinyProfileFragment._document}
    ${ItemFragment._document}
    ${PalletConfigurationFragment._document}
    query MiscItemQuery($id: ObjectId!) {
        miscItem(id: $id) {
            ...MiscItemFragment
        }
    }
`;

export const useMiscItem =
    getAtomicQueryHook<{ miscItem: MiscItem }>(MiscItemQuery);
