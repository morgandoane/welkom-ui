import { Ref } from '../../../types';
import { Company } from '../../Company/Company';
import { Location } from '../../Location/Location';
import { Item } from '../../Item/Item';

export interface CreateLotInput {
    code: string;
    company: Ref<Company>;
    item: Ref<Item>;
    location?: Ref<Location> | null;
    base_qty: number;
}
