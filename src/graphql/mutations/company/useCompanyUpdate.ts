import { AddressFragment } from "./../../fragments/AddressFragment";
import { BaseFragment } from "./../../fragments/BaseFragment";
import {
  gql,
  MutationHookOptions,
  MutationTuple,
  useMutation,
} from "@apollo/client";
import { Company } from "../../schema/Company/Company";
import { UpdateCompanyInput } from "../../schema/Company/CompanyInput";

const UpdateCompanyMutation = gql`
  ${BaseFragment}
  ${AddressFragment}
  mutation UpdateCompanyMutation($id: ObjectId!, $data: UpdateCompanyInput!) {
    updateCompany(id: $id, data: $data) {
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

export interface UpdateCompanyArgs {
  id: string;
  data: UpdateCompanyInput;
}

export interface UpdateCompanyRes {
  createCompany: Company;
}

export const useCompanyUpdate = (
  options?: MutationHookOptions<UpdateCompanyRes, UpdateCompanyArgs>
): MutationTuple<UpdateCompanyRes, UpdateCompanyArgs> =>
  useMutation(UpdateCompanyMutation, options);
