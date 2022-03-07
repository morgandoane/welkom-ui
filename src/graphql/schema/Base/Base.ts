import { AppFragment } from './../../types';
import { gql } from '@apollo/client';
import { TinyProfile, TinyProfileFragment } from './../Profile/Profile';
import { createBaseFragment } from '../../unionHandling/BaseUnion';

export interface Identified {
    _id: string;
}

export interface Base extends Identified {
    date_created: Date;
    created_by: TinyProfile;
    deleted: boolean;
    note?: string;
}

export interface TinyBase extends Identified {
    date_created: Date;
}

export const BaseFragment = new AppFragment(
    gql(String.raw`
        fragment BaseFragment on BaseUnion {
        ${createBaseFragment()}
        }
`),
    [TinyProfileFragment]
);
