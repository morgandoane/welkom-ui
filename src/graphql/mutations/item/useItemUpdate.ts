import { AppFileFragment } from './../../schema/AppFile/AppFile';
import { AddressFragment } from '../../fragments/AddressFragment';
import { BaseFragment } from '../../fragments/BaseFragment';
import {
    gql,
    MutationHookOptions,
    MutationTuple,
    useMutation,
} from '@apollo/client';
import { Item } from '../../schema/Item/Item';
import { UpdateItemInput } from '../../schema/Item/ItemInput';

const UpdateItemMutation = gql`
    ${BaseFragment}
    ${AppFileFragment}
    mutation UpdateItemMutation($id: ObjectId!, $data: UpdateItemInput!) {
        updateItem(id: $id, data: $data) {
            ...BaseFragment
            english
            spanish
            unit_class
            upc
            type
            files {
                ...AppFileFragment
            }
            conversions {
                ...BaseFragment
                from
                to
                from_per_to
            }
        }
    }
`;

export interface UpdateItemArgs {
    id: string;
    data: UpdateItemInput;
}

export interface UpdateItemRes {
    createItem: Item;
}

export const useItemUpdate = (
    options?: MutationHookOptions<UpdateItemRes, UpdateItemArgs>
): MutationTuple<UpdateItemRes, UpdateItemArgs> =>
    useMutation(UpdateItemMutation, options);
