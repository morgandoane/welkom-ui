import { ItemFragment } from './../../Item';
import { Packaging, PackagingFragment } from './Packaging';
import { gql } from '@apollo/client';
import { getAtomicQueryHook } from '../../../../types';
import { TinyProfileFragment } from '../../../Profile/Profile';
import { PalletConfigurationFragment } from '../../../PalletConfiguration/PalletConfiguration';

export const PackagingQuery = gql`
    ${PackagingFragment._document}
    ${TinyProfileFragment._document}
    ${ItemFragment._document}
    ${PalletConfigurationFragment._document}
    query PackagingQuery($id: ObjectId!) {
        packaging(id: $id) {
            ...PackagingFragment
        }
    }
`;

export const usePackage =
    getAtomicQueryHook<{ packaging: Packaging }>(PackagingQuery);
