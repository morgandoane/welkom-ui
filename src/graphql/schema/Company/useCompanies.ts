import { ContactFragment } from './../Contact/Contact';
import { CompanyFilter } from './../../inputsTypes';
import { Pagination } from './../../../utils/types/Pagination';
import { getFilterQueryHook } from './../../types';
import { TinyCompany, TinyCompanyFragment } from './Company';
import { gql } from '@apollo/client';

export const CompaniesQuery = gql`
    ${TinyCompanyFragment._document}
    ${ContactFragment._document}
    query CompaniesQuery($filter: CompanyFilter!) {
        companies(filter: $filter) {
            count
            items {
                ...TinyCompanyFragment
            }
        }
    }
`;

export const useCompanies = getFilterQueryHook<
    { companies: Pagination<TinyCompany> },
    { filter: CompanyFilter }
>(CompaniesQuery);
