import { BaseFragment } from "../../fragments/BaseFragment";
import { ContactInput } from "../../schema/Contact/ContactInputs";
import { Contact } from "../../schema/Contact/Contact";
import {
  gql,
  MutationHookOptions,
  MutationTuple,
  useMutation,
} from "@apollo/client";

export interface UpdateContactRes {
  updateContact: Contact;
}

export interface UpdateContactArgs {
  id: string;
  data: ContactInput;
}

export const UpdateContact = gql`
  mutation UpdateContact($id: ObjectId!, $data: ContactInput!) {
    updateContact(data: $data, id: $id) {
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

export const useContactUpdate = (
  options?: MutationHookOptions<UpdateContactRes, UpdateContactArgs>
): MutationTuple<UpdateContactRes, UpdateContactArgs> =>
  useMutation(UpdateContact, options);
