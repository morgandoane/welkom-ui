import { AppFileFragment } from "./../../schema/AppFile/AppFile";
import { BaseFragment } from "../../fragments/BaseFragment";
import {
  gql,
  MutationHookOptions,
  MutationTuple,
  useMutation,
} from "@apollo/client";
import { Item } from "../../schema/Item/Item";
import { CreateItemInput } from "../../schema/Item/ItemInput";

const CreateItemMutation = gql`
  ${BaseFragment}
  ${AppFileFragment}
  mutation CreateItemMutation($data: CreateItemInput!) {
    createItem(data: $data) {
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

export interface CreateItemArgs {
  data: CreateItemInput;
}

export interface CreateItemRes {
  createItem: Item;
}

export const useItemCreation = (
  options?: MutationHookOptions<CreateItemRes, CreateItemArgs>
): MutationTuple<CreateItemRes, CreateItemArgs> =>
  useMutation(CreateItemMutation, options);
