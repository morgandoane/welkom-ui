import { Ref } from '../../types';
import { Item } from '../Item/Item';
import { Unit } from '../Unit/Unit';

export interface ContentInput {
    item: Ref<Item>;
    client_unit: Ref<Unit>;
    client_qty: number;
}
