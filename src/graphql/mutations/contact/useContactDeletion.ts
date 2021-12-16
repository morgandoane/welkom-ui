import { BaseFragment } from "../../fragments/BaseFragment";
import { ContactInput } from "../../schema/Contact/ContactInputs";
import { Contact } from "../../schema/Contact/Contact";
import {
  gql,
  MutationHookOptions,
  MutationTuple,
  useMutation,
} from "@apollo/client";

export interface DeleteContactRes {
  deleteContact: Contact;
}

export interface DeleteContactArgs {
  id: string;
}

export const DeleteContact = gql`
  mutation DeleteContact($id: ObjectId!) {
    deleteContact(id: $id) {
      _id
      email_on_order
      cc_on_order
      given_name
      family_name
      email
      phone
    }
  }
`;

export const useContactDeletion = (
  options?: MutationHookOptions<DeleteContactRes, DeleteContactArgs>
): MutationTuple<DeleteContactRes, DeleteContactArgs> =>
  useMutation(DeleteContact, options);
