import { AppFragment } from './../../types';
import { Identified } from './../Base/Base';
import { TinyLocation, TinyLocationFragment } from './../Location/Location';
import { TinyCompany, TinyCompanyFragment } from './../Company/Company';
import {
    UploadEnabled,
    UploadEnabledFragment,
} from './../UploadEnabled/UploadEnabled';
import { Permission } from '../../../auth/Permission';
import { gql } from '@apollo/client';
import { TinyProfileFragment } from '../Profile/Profile';

export interface Team extends UploadEnabled {
    name: string;
    company: TinyCompany;
    location: TinyLocation | null;
    permissions: Permission[];
    members: string[];
}

export interface TinyTeam extends Identified {
    name: string;
    company: TinyCompany;
    location: TinyLocation | null;
    permissions: Permission[];
    members: string[];
}

export const TeamFragment = new AppFragment(
    gql`
        fragment TeamFragment on Team {
            ...UploadEnabledFragment
            name
            company {
                ...TinyCompanyFragment
            }
            location {
                ...TinyLocationFragment
            }
            permissions
            members
        }
    `,
    [
        UploadEnabledFragment,
        TinyCompanyFragment,
        TinyLocationFragment,
        TinyProfileFragment,
    ]
);

export const TinyTeamFragment = new AppFragment(
    gql`
        fragment TinyTeamFragment on Team {
            _id
            name
            company {
                ...TinyCompanyFragment
            }
            location {
                ...TinyLocationFragment
            }
            permissions
            members
        }
    `,
    [TinyCompanyFragment, TinyLocationFragment, TinyProfileFragment]
);
