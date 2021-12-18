import { AppFileFragment } from "./../../schema/AppFile/AppFile";
import { BaseFragment } from "../../fragments/BaseFragment";
import {
  gql,
  MutationHookOptions,
  MutationTuple,
  useMutation,
} from "@apollo/client";
import { Item } from "../../schema/Item/Item";
import { UpdateItemInput } from "../../schema/Item/ItemInput";

const UpdateItemMutation = gql`
  ${BaseFragment}
  ${AppFileFragment}
  mutation UpdateItemMutation($id: ObjectId!, $data: UpdateItemInput!) {
    updateItem(id: $id, data: $data) {
      ...BaseFragment
      english
      spanish
      unit_class
      files {
        ...AppFileFragment
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
