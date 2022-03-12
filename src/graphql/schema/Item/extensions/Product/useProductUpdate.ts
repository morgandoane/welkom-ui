import { gql } from '@apollo/client';
import { UpdateProductInput } from '../../../../inputsTypes';
import { getMutationHook } from '../../../../types';
import { TinyCompanyFragment } from '../../../Company/Company';
import { ContactFragment } from '../../../Contact/Contact';
import { TinyProfileFragment } from '../../../Profile/Profile';
import { ItemFragment } from '../../Item';
import { ProductFragment, Product } from './Product';

export const UpdateProductMutation = gql`
    ${ProductFragment._document}
    ${TinyProfileFragment._document}
    ${ItemFragment._document}
    ${TinyCompanyFragment._document}
    ${ContactFragment._document}
    mutation UpdateProductMutation($id: ObjectId!, $data: UpdateProductInput!) {
        updateProduct(id: $id, data: $data) {
            ...ProductFragment
        }
    }
`;

export const useProductUpdate = getMutationHook<
    { updateProduct: Product },
    { id: string; data: UpdateProductInput }
>(UpdateProductMutation);
