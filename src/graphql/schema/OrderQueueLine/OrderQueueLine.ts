import { gql } from '@apollo/client';
import { AppFragment } from '../../types';

export interface OrderQueueLine {
    po: string | null;
    customer: string | null;
    vendor: string | null;
    destination: string | null;
    item: string | null;
    unit: string | null;
    quantity: number | null;
    date: Date | null;
    time: number | null;
}

export const OrderQueueLineFragment = new AppFragment(
    gql`
        fragment OrderQueueLineFragment on OrderQueueLine {
            po
            customer
            vendor
            destination
            item
            unit
            quantity
            date
            time
        }
    `,
    []
);
