import { BaseFragment } from './../../fragments/BaseFragment';
import { ContactInput } from './../../schema/Contact/ContactInputs';
import { Contact } from './../../schema/Contact/Contact';
import {
    gql,
    MutationHookOptions,
    MutationTuple,
    useMutation,
} from '@apollo/client';

export interface CreateContactRes {
    createContact: Contact;
}

export interface CreateContactArgs {
    company: string;
    data: ContactInput;
}

export const CreateContact = gql`
    mutation CreateContact($company: ObjectId!, $data: ContactInput!) {
        createContact(company: $company, data: $data) {
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

export const useContactCreation = (
    options?: MutationHookOptions<CreateContactRes, CreateContactArgs>
): MutationTuple<CreateContactRes, CreateContactArgs> =>
    useMutation(CreateContact, options);
