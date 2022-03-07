import { TinyProfileFragment } from './../../../Profile/Profile';
import { ItemFragment } from './../../Item';
import { TinyPackaging, TinyPackagingFragment } from './Packaging';
import { gql } from '@apollo/client';
import { PackagingFilter } from '../../../../inputsTypes';
import { getFilterQueryHook } from '../../../../types';
import { Pagination } from '../../../../../utils/types/Pagination';
import { PalletConfigurationFragment } from '../../../PalletConfiguration/PalletConfiguration';

export const PackagingQuery = gql`
    ${TinyPackagingFragment._document}
    ${ItemFragment._document}
    ${TinyProfileFragment._document}
    ${PalletConfigurationFragment._document}
    query PackagingQuery($filter: PackagingFilter!) {
        packagings(filter: $filter) {
            count
            items {
                ...TinyPackagingFragment
            }
        }
    }
`;

export const usePackaging = getFilterQueryHook<
    { packagings: Pagination<TinyPackaging> },
    { filter: PackagingFilter }
>(PackagingQuery);
