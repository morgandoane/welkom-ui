import { gql } from '@apollo/client';
import { OrderQueueLine } from './OrderQueueLine';

export interface OrderQueue {
    lines: OrderQueueLine[];
}

export const OrderQueueFragment = gql`
    fragment OrderQueueFragment on OrderQueue {
        lines {
            ...OrderQueueLineFragment
        }
    }
`;
