import { TinyCompany } from './../../schema/Company/Company';
import { gql, QueryHookOptions, QueryResult, useQuery } from '@apollo/client';
import { CompanyFilter } from '../../schema/Company/CompanyFilter';
import { Pagination } from '../../schema/Pagination/Pagination';

export const Vendors = gql`
    query Vendors($filter: CompanyFilter!) {
        companies(filter: $filter) {
            count
            items {
                _id
                name
            }
        }
    }
`;

export const useVendors = (
    options?: QueryHookOptions<
        { companies: Pagination<TinyCompany> },
        { filter: CompanyFilter }
    >
): QueryResult<
    { companies: Pagination<TinyCompany> },
    { filter: CompanyFilter }
> => useQuery(Vendors, options);

export const useMyCompanies = (
    options?: QueryHookOptions<{
        myCompanies: TinyCompany[];
    }>
): QueryResult<{
    myCompanies: TinyCompany[];
}> => useQuery(Vendors);
