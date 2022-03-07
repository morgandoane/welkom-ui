import { AppFragment } from './../../types';
import { gql } from '@apollo/client';

export interface Names {
    english: string;
    spanish: string;
}

export interface NamesPlural extends Names {
    english_plural: string;
    spanish_plural: string;
}

export const NamesFragment = new AppFragment(
    gql`
        fragment NamesFragment on Names {
            english
            spanish
        }
    `,
    []
);

export const NamesPluralFragment = new AppFragment(
    gql`
        fragment NamesFragment on NamesPlural {
            english
            spanish
            english_plural
            spanish_plural
        }
    `,
    []
);
