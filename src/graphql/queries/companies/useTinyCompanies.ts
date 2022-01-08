import { TinyCompany } from "./../../schema/Company/Company";
import { gql, QueryHookOptions, QueryResult, useQuery } from "@apollo/client";
import { CompanyFilter } from "../../schema/Company/CompanyFilter";
import { Pagination } from "../../schema/Pagination/Pagination";

export const TinyCompanies = gql`
  query TinyCompanies($filter: CompanyFilter!) {
    companies(filter: $filter) {
      count
      items {
        _id
        name
      }
    }
  }
`;

export const MyTinyCompanies = gql`
  query MyTinyCompanies {
    myCompanies {
      _id
      name
    }
  }
`;

export const useTinyCompanies = (
  options?: QueryHookOptions<
    { companies: Pagination<TinyCompany> },
    { filter: CompanyFilter }
  >
): QueryResult<
  { companies: Pagination<TinyCompany> },
  { filter: CompanyFilter }
> => useQuery(TinyCompanies, options);

export const useMyCompanies = (
  options?: QueryHookOptions<{
    myCompanies: TinyCompany[];
  }>
): QueryResult<{
  myCompanies: TinyCompany[];
}> => useQuery(TinyCompanies);
