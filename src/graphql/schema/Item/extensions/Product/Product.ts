import { AppFragment } from './../../../../types';
import { ItemFragment, TinyItem } from './../../Item';
import { TinyCompany, TinyCompanyFragment } from './../../../Company/Company';
import { Item } from '../../Item';
import { gql } from '@apollo/client';

export interface Product extends Item {
    upc: string;
    company: TinyCompany;
}

export interface TinyProduct extends TinyItem {
    upc: string;
    company: TinyCompany;
}

export const TinyProductFragment = new AppFragment(
    gql`
        fragment TinyProductFragment on Product {
            ...ItemFragment
            upc
            company {
                ...TinyCompanyFragment
            }
        }
    `,
    [ItemFragment, TinyCompanyFragment]
);

export const ProductFragment = new AppFragment(
    gql`
        fragment ProductFragment on Product {
            ...ItemFragment
            upc
            company {
                ...TinyCompanyFragment
            }
        }
    `,
    [ItemFragment, TinyCompanyFragment]
);
