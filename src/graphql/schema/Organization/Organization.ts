import { AppFragment } from './../../types';
import { TinyCompany, TinyCompanyFragment } from './../Company/Company';
import { Base } from './../Base/Base';
import { gql } from '@apollo/client';

export interface Organization extends Base {
    name: string;
    companies: TinyCompany[];
}

export const OrganizationFragment = new AppFragment(
    gql`
        fragment OrganizationFragment on Organization {
            name
            companies {
                ...TinyCompanyFragment
            }
        }
    `,
    [TinyCompanyFragment]
);
