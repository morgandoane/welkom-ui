import { gql } from '@apollo/client';
import { AppFragment } from './../../types';
import { Identified } from './../Base/Base';
import {
    OrderQueuePreference,
    OrderQueuePreferenceFragment,
} from './categories/OrderQueuePreference';

export interface UserPreference extends Identified {
    orderQueue: OrderQueuePreference | null;
}

export const UserPreferenceFragment = new AppFragment(
    gql`
        fragment UserPreferenceFragment on UserPreference {
            orderQueue {
                ...OrderQueuePreferenceFragment
            }
        }
    `,
    [OrderQueuePreferenceFragment]
);
