import { AppFragment } from './../../types';
import { AddressFragment } from './../Address/Address';
import { Identified } from './../Base/Base';
import { TinyCompany, TinyCompanyFragment } from './../Company/Company';
import {
    UploadEnabled,
    UploadEnabledFragment,
} from './../UploadEnabled/UploadEnabled';
import { Address } from '../Address/Address';
import { gql } from '@apollo/client';

export interface Location extends UploadEnabled {
    company: TinyCompany;
    label: string;
    address: Address | null;
}

export interface TinyLocation extends Identified {
    company: TinyCompany;
    label: string;
    address: Address | null;
}

export const LocationFragment = new AppFragment(
    gql`
        fragment LocationFragment on Location {
            ...UploadEnabledFragment
            company {
                ...TinyCompanyFragment
            }
            label
            address {
                ...AddressFragment
            }
        }
    `,
    [UploadEnabledFragment, TinyCompanyFragment, AddressFragment]
);

export const TinyLocationFragment = new AppFragment(
    gql`
        fragment TinyLocationFragment on Location {
            _id
            company {
                ...TinyCompanyFragment
            }
            label
            address {
                ...AddressFragment
            }
        }
    `,
    [TinyCompanyFragment, AddressFragment]
);
