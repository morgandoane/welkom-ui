import { Product, ProductFragment } from './Product';
import { gql } from '@apollo/client';
import { CreateProductInput } from '../../../../inputsTypes';
import { getMutationHook } from '../../../../types';
import { TinyProfileFragment } from '../../../Profile/Profile';
import { ItemFragment } from '../../Item';
import { TinyCompanyFragment } from '../../../Company/Company';

export const CreateProductMutation = gql`
    ${ProductFragment._document}
    ${TinyProfileFragment._document}
    ${ItemFragment._document}
    ${TinyCompanyFragment._document}
    mutation CreateProductMutation($data: CreateProductInput!) {
        createProduct(data: $data) {
            ...ProductFragment
        }
    }
`;

export const useProductCreation = getMutationHook<
    { createProduct: Product },
    { data: CreateProductInput }
>(CreateProductMutation);
