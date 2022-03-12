import { TinyCompanyFragment } from './../../../Company/Company';
import { TinyProfileFragment } from '../../../Profile/Profile';
import { ItemFragment } from '../../Item';
import { TinyProduct, TinyProductFragment } from './Product';
import { gql } from '@apollo/client';
import { ProductFilter } from '../../../../inputsTypes';
import { getFilterQueryHook } from '../../../../types';
import { Pagination } from '../../../../../utils/types/Pagination';
import { ContactFragment } from '../../../Contact/Contact';

export const ProductQuery = gql`
    ${TinyProductFragment._document}
    ${ItemFragment._document}
    ${TinyProfileFragment._document}
    ${TinyCompanyFragment._document}
    ${ContactFragment._document}
    query ProductQuery($filter: ProductFilter!) {
        products(filter: $filter) {
            count
            items {
                ...TinyProductFragment
            }
        }
    }
`;

export const useProducts = getFilterQueryHook<
    { products: Pagination<TinyProduct> },
    { filter: ProductFilter }
>(ProductQuery);