import { Recipe } from '../../../Recipe/Recipe';
import { Folder } from '../../Folder';

export interface RecipeFolder extends Folder {
    recipes?: Recipe[];
}
