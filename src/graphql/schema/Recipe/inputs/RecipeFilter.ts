import { Ref } from '../../../types';
import { BaseFilter } from '../../Base/inputs/BaseFilter';
import { Item } from '../../Item/Item';
import { RecipeFolder } from '../../RecipeFolder/RecipeFolder';

export interface RecipeFilter extends BaseFilter {
    name?: string;
    folder?: Ref<RecipeFolder>;
    item?: Ref<Item>;
}
