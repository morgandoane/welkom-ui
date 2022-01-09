import { AddressFragment } from './../../fragments/AddressFragment';
import { BaseFragment } from './../../fragments/BaseFragment';
import {
    gql,
    MutationHookOptions,
    MutationTuple,
    useMutation,
} from '@apollo/client';
import { Company } from '../../schema/Company/Company';
import { CreateCompanyInput } from '../../schema/Company/CompanyInput';

const CreateCompanyMutation = gql`
    ${BaseFragment}
    ${AddressFragment}
    mutation CreateCompanyMutation($data: CreateCompanyInput!) {
        createCompany(data: $data) {
            ...BaseFragment
            name
            locations {
                ...BaseFragment
                address {
                    ...AddressFragment
                }
                label
            }
            contacts {
                ...BaseFragment
                email_on_order
                cc_on_order
                given_name
                family_name
                email
                phone
            }
        }
    }
`;

export interface CreateCompanyArgs {
    data: CreateCompanyInput;
}

export interface CreateCompanyRes {
    createCompany: Company;
}

export const useCompanyCreation = (
    options?: MutationHookOptions<CreateCompanyRes, CreateCompanyArgs>
): MutationTuple<CreateCompanyRes, CreateCompanyArgs> =>
    useMutation(CreateCompanyMutation, options);
