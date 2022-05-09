import { gql } from '@apollo/client';
import { Address } from '../Address/Address';
import { Base, TinyBase } from '../Base/Base';
import { TinyCompany } from '../Company/Company';

export interface Location extends Base {
    name: string;
    company: TinyCompany;
    address?: Address;
}

export interface TinyLocation extends TinyBase {
    name: string;
    company: TinyCompany;
    address?: Address;
}

export type CompanyLocation = Omit<TinyLocation, 'company'>;

export const LocationFragment = gql`
    fragment LocationFragment on Location {
        ...BaseFragment
        name
        company {
            ...TinyCompanyFragment
        }
        address {
            ...AddressFragment
        }
    }
`;

export const TinyLocationFragment = gql`
    fragment TinyLocationFragment on Location {
        ...TinyBaseFragment
        name
        company {
            ...TinyCompanyFragment
        }
        address {
            ...AddressFragment
        }
    }
`;

export const CompanyLocationFragment = gql`
    fragment CompanyLocationFragment on Location {
        ...TinyBaseFragment
        name
        address {
            ...AddressFragment
        }
    }
`;
