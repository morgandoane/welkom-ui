import { Ref } from '../../../types';
import { BaseFilter } from '../../Base/inputs/BaseFilter';
import { Company } from '../../Company/Company';
import { Item } from '../../Item/Item';

export interface BolFilter extends BaseFilter {
    code?: string;
    lot_code?: string;
    from_company?: Ref<Company>;
    to_company?: Ref<Company>;
    to_location?: Ref<Location>;
    from_location?: Ref<Location>;
    item?: Ref<Item>;
}
