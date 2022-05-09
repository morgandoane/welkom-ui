import { Ref } from '../../../types';
import { Company } from '../../Company/Company';
import { Item } from '../../Item/Item';
import { Unit } from '../../Unit/Unit';

export interface OrderQueueLineInput {
    item: Ref<Item> | null;
    quantity: number | null;
    unit: Ref<Unit> | null;
    code: string | null;
    vendor: Ref<Company> | null;
    destination: Ref<Location> | null;
    date: Date | null;
    time: number | null;
}
