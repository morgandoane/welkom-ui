import { ItemFragment } from '../../Item';
import { Product, ProductFragment } from './Product';
import { gql } from '@apollo/client';
import { getAtomicQueryHook } from '../../../../types';
import { TinyProfileFragment } from '../../../Profile/Profile';
import { PalletConfigurationFragment } from '../../../PalletConfiguration/PalletConfiguration';
import { TinyCompanyFragment } from '../../../Company/Company';

export const ProductQuery = gql`
    ${ProductFragment._document}
    ${TinyProfileFragment._document}
    ${ItemFragment._document}
    ${PalletConfigurationFragment._document}
    ${TinyCompanyFragment._document}
    query ProductQuery($id: ObjectId!) {
        product(id: $id) {
            ...ProductFragment
        }
    }
`;

export const useProduct =
    getAtomicQueryHook<{ product: Product }>(ProductQuery);