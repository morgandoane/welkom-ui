import { AppFragment } from './../../types';
import { gql } from '@apollo/client';
import { Identified } from './../Base/Base';
import { TinyLocation, TinyLocationFragment } from './../Location/Location';
import {
    UploadEnabled,
    UploadEnabledFragment,
} from './../UploadEnabled/UploadEnabled';

export interface ProductionLine extends UploadEnabled {
    name: string;
    location: TinyLocation;
}

export interface TinyProductionLine extends Identified {
    name: string;
    location: TinyLocation;
}

export const ProductionLineFragment = new AppFragment(
    gql`
        fragment ProductionLineFragment on ProductionLine {
            ...UploadEnabledFragment
            name
            location {
                ...TinyLocationFragment
            }
        }
    `,
    [TinyLocationFragment, UploadEnabledFragment]
);

export const TinyProductionLineFragment = new AppFragment(
    gql`
        fragment TinyProductionLineFragment on ProductionLine {
            _id
            name
            location {
                ...TinyLocationFragment
            }
        }
    `,
    [TinyLocationFragment]
);
