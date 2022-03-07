import { Contact, ContactFragment } from './../Contact/Contact';
import { CompanyFilter } from './../../inputsTypes';
import { AppFragment, getQueryHook } from './../../types';
import { gql } from '@apollo/client';
import { Identified } from './../Base/Base';
import {
    UploadEnabled,
    UploadEnabledFragment,
} from './../UploadEnabled/UploadEnabled';

export interface Company extends UploadEnabled {
    name: string;
    contacts: Contact[];
}

export interface TinyCompany extends Identified {
    name: string;
}

export const CompanyFragment = new AppFragment(
    gql`
        fragment CompanyFragment on Company {
            ...UploadEnabledFragment
            name
            contacts {
                ...ContactFragment
            }
        }
    `,
    [UploadEnabledFragment, ContactFragment]
);

export const TinyCompanyFragment = new AppFragment(
    gql`
        fragment TinyCompanyFragment on Company {
            _id
            name
        }
    `,
    []
);
