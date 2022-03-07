import { AppFragment } from './../../../../types';
import { gql } from '@apollo/client';
import { Item, ItemFragment, TinyItem } from './../../Item';
import { UploadEnabledFragment } from '../../../UploadEnabled/UploadEnabled';

export type Packaging = Item;
export type TinyPackaging = TinyItem;

export const TinyPackagingFragment = new AppFragment(
    gql`
        fragment TinyPackagingFragment on Packaging {
            ...ItemFragment
        }
    `,
    [ItemFragment]
);

export const PackagingFragment = new AppFragment(
    gql`
        fragment PackagingFragment on Packaging {
            ...ItemFragment
        }
    `,
    [ItemFragment]
);
