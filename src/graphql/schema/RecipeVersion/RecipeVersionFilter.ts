import { BaseFilter } from './../Base/BaseFilter';

export interface RecipeVersionFilter extends BaseFilter {
    items?: string[];
    recipe?: string;
}
