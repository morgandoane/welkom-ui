import { gql } from '@apollo/client';
import { TinyBase, Base } from '../Base/Base';
import { CompanyLocation } from '../Location/Location';

export interface Company extends Base {
    name: string;
    locations: CompanyLocation[];
}

export interface TinyCompany extends TinyBase {
    name: string;
    locations: CompanyLocation[];
}

export const CompanyFragment = gql`
    fragment CompanyFragment on Company {
        ...BaseFragment
        name
        locations {
            ...CompanyLocationFragment
        }
    }
`;

export const TinyCompanyFragment = gql`
    fragment TinyCompanyFragment on Company {
        ...TinyBaseFragment
        name
        locations {
            ...CompanyLocationFragment
        }
    }
`;
