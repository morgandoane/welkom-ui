import { TinyProfile, TinyProfileFragment } from './../Profile/Profile';
import { AppFragment } from './../../types';
import { DesignLocation, DesignCategory } from '../../inputsTypes';
import {
    UploadEnabled,
    UploadEnabledFragment,
} from './../UploadEnabled/UploadEnabled';
import { gql } from '@apollo/client';

export interface TinyDesign {
    _id: string;
    part_number: string;
    location: DesignLocation;
    category: DesignCategory;
    description?: string | null;
    created_by: TinyProfile;
    date_created: Date;
}

export interface Design extends UploadEnabled {
    part_number: string;
    location: DesignLocation;
    category: DesignCategory;
    parent?: TinyDesign;
    description?: string | null;
}

export const DesignFragment = new AppFragment(
    gql`
        fragment DesignFragment on Design {
            part_number
            location
            category
            description
            ...UploadEnabledFragment
        }
    `,
    [UploadEnabledFragment]
);

export const TinyDesignFragment = new AppFragment(
    gql`
        fragment TinyDesignFragment on Design {
            _id
            part_number
            location
            category
            description
            date_created
            created_by {
                ...TinyProfileFragment
            }
        }
    `,
    [TinyProfileFragment]
);
