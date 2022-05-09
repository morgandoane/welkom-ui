import {
    TinyCompany,
    TinyCompanyFragment,
} from './../../schema/Company/Company';
import { gql, QueryHookOptions, QueryResult, useQuery } from '@apollo/client';
import { PaginationResult } from '../../schema/Pagination/Pagination';
import { CompanyFilter } from '../../schema/Company/inputs/CompanyFilter';
import { TinyBaseFragment } from '../../schema/Base/Base';

export const TinyCompanies = gql`
    ${TinyBaseFragment}
    ${TinyCompanyFragment}
    query TinyCompanies($filter: CompanyFilter!) {
        companies(filter: $filter) {
            count
            items {
                ...TinyCompanyFragment
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
        { companies: PaginationResult<TinyCompany> },
        { filter: CompanyFilter }
    >
): QueryResult<
    { companies: PaginationResult<TinyCompany> },
    { filter: CompanyFilter }
> => useQuery(TinyCompanies, options);

export const useMyCompanies = (
    options?: QueryHookOptions<{
        myCompanies: TinyCompany[];
    }>
): QueryResult<{
    myCompanies: TinyCompany[];
}> => useQuery(TinyCompanies);
