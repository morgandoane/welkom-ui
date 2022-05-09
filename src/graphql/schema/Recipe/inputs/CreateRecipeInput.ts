import { Ref } from '../../../types';
import { Item } from '../../Item/Item';
import { RecipeFolder } from '../../RecipeFolder/RecipeFolder';

export class CreateRecipeInput {
    item!: Ref<Item>;
    folder!: Ref<RecipeFolder>;
    label!: string;
}
