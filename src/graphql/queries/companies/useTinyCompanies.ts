import { TinyCompany } from './../../schema/Company/Company';
import { gql, QueryHookOptions, QueryResult, useQuery } from '@apollo/client';
import { CompanyFilter } from '../../schema/Company/CompanyFilter';
import { Pagination } from '../../schema/Pagination/Pagination';

export const TinyCompanies = gql`
    query TinyCompanies($filter: CompanyFilter!) {
        companies(filter: $filter) {
            count
            items {
                _id
                name
                created_by {
                    user_id
                    name
                    email
                    picture
                    given_name
                    family_name
                }
                modified_by {
                    user_id
                    name
                    email
                }
                date_modified
                date_created
                contacts {
                    _id
                    given_name
                    family_name
                    email
                    email_on_order
                    cc_on_order
                    phone
                }
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
