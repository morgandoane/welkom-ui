import { gql } from '@apollo/client';
import { AppFragment } from '../../types';
import { Base } from '../Base/Base';
import {
    OrderQueueLine,
    OrderQueueLineFragment,
} from './../OrderQueueLine/OrderQueueLine';

export interface OrderQueue extends Base {
    lines: OrderQueueLine[];
}

export const OrderQueueFragment = new AppFragment(
    gql`
        fragment OrderQueueFragment on OrderQueue {
            _id
            lines {
                ...OrderQueueLineFragment
            }
        }
    `,
    [OrderQueueLineFragment]
);
