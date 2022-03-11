import { ItemFragment } from './../../Item';
import { Packaging, PackagingFragment } from './Packaging';
import { gql } from '@apollo/client';
import { getAtomicQueryHook } from '../../../../types';
import { TinyProfileFragment } from '../../../Profile/Profile';

export const PackagingQuery = gql`
    ${PackagingFragment._document}
    ${TinyProfileFragment._document}
    ${ItemFragment._document}
    query PackagingQuery($id: ObjectId!) {
        packaging(id: $id) {
            ...PackagingFragment
        }
    }
`;

export const usePackage =
    getAtomicQueryHook<{ packaging: Packaging }>(PackagingQuery);
