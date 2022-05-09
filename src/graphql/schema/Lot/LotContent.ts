import { gql } from '@apollo/client';
import { TinyUnit } from '../Unit/Unit';
import { TinyLot } from './Lot';

export class LotContent {
    lot!: TinyLot;
    base_qty!: number;
    client_qty!: number;
    client_unit!: TinyUnit;
}

export const LotContentFragment = gql`
    fragment LotContentFragment on LotContent {
        lot {
            ...TinyLotFragment
        }
        base_qty
        client_qty
        client_unit {
            ...TinyUnitFragment
        }
    }
`;
