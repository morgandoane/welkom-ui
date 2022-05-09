import { Ref } from '../../../types';
import { UpdateBaseInput } from '../../Base/inputs/UpdateBaseInput';
import { Item } from '../../Item/Item';
import { RecipeFolder } from '../../RecipeFolder/RecipeFolder';

export interface UpdateRecipeInput extends UpdateBaseInput {
    item: Ref<Item>;
    folder: Ref<RecipeFolder>;
    label: string;
}
