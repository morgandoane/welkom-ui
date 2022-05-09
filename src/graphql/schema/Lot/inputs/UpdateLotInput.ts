import { Ref } from '../../../types';
import { UpdateBaseInput } from '../../Base/inputs/UpdateBaseInput';
import { Company } from '../../Company/Company';
import { Location } from '../../Location/Location';
import { Item } from '../../Item/Item';

export interface UpdateLotInput extends UpdateBaseInput {
    code?: string;
    company?: Ref<Company>;
    item?: Ref<Item>;
    location?: Ref<Location>;
    base_qty?: number;
}
