import { BaseFilter } from './../Base/BaseFilter';

export interface RecipeFilter extends BaseFilter {
    item?: string;
    name?: string;
}
