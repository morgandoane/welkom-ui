import { gql, QueryHookOptions, QueryResult, useQuery } from '@apollo/client';
import { Company, CompanyFragment } from '../../schema/Company/Company';

export const CompanyQuery = gql`
    ${CompanyFragment}
    query CompanyQuery($id: ObjectId!) {
        company(id: $id) {
            ...CompanyFragment
        }
    }
`;

export const useCompany = (
    options: QueryHookOptions<{ company: Company }, { id: string }>
): QueryResult<{ company: Company }, { id: string }> =>
    useQuery(CompanyQuery, options);
