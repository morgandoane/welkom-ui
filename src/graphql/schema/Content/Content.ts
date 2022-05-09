import { gql } from '@apollo/client';
import { TinyItem } from '../Item/Item';
import { TinyUnit } from '../Unit/Unit';

export interface Content {
    item: TinyItem;
    client_unit: TinyUnit;
    client_qty: number;
    base_qty: number;
}

export const ContentFragment = gql`
    fragment ContentFragment on Content {
        item {
            ...TinyItemFragment
        }
        client_unit {
            ...TinyUnitFragment
        }
        client_qty
        base_qty
    }
`;
