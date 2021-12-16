import { AddressFragment } from "./../../fragments/AddressFragment";
import { BaseFragment } from "./../../fragments/BaseFragment";
import { gql, QueryHookOptions, QueryResult, useQuery } from "@apollo/client";
import { Company } from "../../schema/Company/Company";

export const CompanyQuery = gql`
  ${BaseFragment}
  ${AddressFragment}
  query CompanyQuery($id: ObjectId!) {
    company(id: $id) {
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
        given_name
        family_name
        email_on_order
        cc_on_order
        email
        phone
      }
      files {
        id
        name
        date_created
        created_by {
          user_id
          email
          name
        }
      }
    }
  }
`;

export const useCompany = (
  options: QueryHookOptions<{ company: Company }, { id: string }>
): QueryResult<{ company: Company }, { id: string }> =>
  useQuery(CompanyQuery, options);
