import { gql } from '@apollo/client';
import { Ref } from '../../types';
import { Company } from '../Company/Company';
import { Item } from '../Item/Item';
import { Unit } from '../Unit/Unit';

export interface OrderQueueLine {
    item: Ref<Item> | null;
    quantity: number | null;
    unit: Ref<Unit> | null;
    code: string | null;
    vendor: Ref<Company> | null;
    destination: Ref<Location> | null;
    date: Date | null;
    time: number | null;
}

export const OrderQueueLineFragment = gql`
    fragment OrderQueueLineFragment on OrderQueueLine {
        item
        quantity
        unit
        code
        vendor
        destination
        date
        time
    }
`;
