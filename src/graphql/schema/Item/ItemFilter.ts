import { BaseFilter } from '../Base/BaseFilter';
import { ItemType } from './Item';

export interface ItemFilter extends BaseFilter {
    name?: string;
    type?: ItemType | null;
    upc?: string | null;
}
