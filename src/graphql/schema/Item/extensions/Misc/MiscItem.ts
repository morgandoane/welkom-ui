import { gql } from '@apollo/client';
import { AppFragment } from '../../../../types';
import { Item, TinyItem, ItemFragment } from './../../Item';

export type MiscItem = Item;
export type TinyMiscItem = TinyItem;

export const TinyMiscItemFragment = new AppFragment(
    gql`
        fragment TinyMiscItemFragment on MiscItem {
            ...ItemFragment
        }
    `,
    [ItemFragment]
);

export const MiscItemFragment = new AppFragment(
    gql`
        fragment MiscItemFragment on MiscItem {
            ...ItemFragment
        }
    `,
    [ItemFragment]
);
