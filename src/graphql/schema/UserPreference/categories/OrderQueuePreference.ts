import { gql } from '@apollo/client';
import { AppFragment } from '../../../types';

class ItemPreference {
    item!: string;
    tally!: number;
    vendor!: string;
    quantity!: number;
    unit!: string;
    time!: number | null;
}

export class OrderQueuePreference {
    items!: ItemPreference[];
}

export const OrderQueuePreferenceFragment = new AppFragment(
    gql`
        fragment OrderQueuePreferenceFragment on OrderQueuePreference {
            items {
                item
                tally
                vendor
                quantity
                unit
                time
            }
        }
    `,
    []
);
