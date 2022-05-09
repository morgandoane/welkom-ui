import { gql } from '@apollo/client';
import { Permission } from '../../../auth/Permission';
import { Base, TinyBase } from '../Base/Base';
import { TinyCompany } from '../Company/Company';
import { TinyProfile } from '../Profile/Profile';

export interface Team extends Base {
    name: string;
    company: TinyCompany;
    permissions: Permission[];
    members: TinyProfile[];
}

export interface TinyTeam extends TinyBase {
    name: string;
    company: TinyCompany;
    permissions: Permission[];
    members: TinyProfile[];
}

export const TeamFragment = gql`
    fragment TeamFragment on Team {
        ...BaseFragment
        name
        company {
            ...TinyCompanyFragment
        }
        permissions
        members {
            ...TinyProfileFragment
        }
    }
`;

export const TinyTeamFragment = gql`
    fragment TinyTeamFragment on Team {
        ...TinyBaseFragment
        name
        company {
            ...TinyCompanyFragment
        }
        permissions
        members {
            ...TinyProfileFragment
        }
    }
`;
