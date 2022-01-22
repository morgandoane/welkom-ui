import { TinyItemFragment } from './../items/useTinyItems';
import { TinyItem } from './../../schema/Item/Item';
import { gql } from '@apollo/client';
import { getQueryHook } from './../../types';

export const TinyRecipeFragment = gql`
    fragment TinyRecipeFragment on Recipe {
        _id
        name
        item {
            ...TinyItemFragment
        }
    }
`;

export const TinyRecipeQuery = gql`
    ${TinyRecipeFragment}
    ${TinyItemFragment}
    query TinyRecipeQuery($id: ObjectId!) {
        tinyRecipe: recipe(id: $id) {
            ...TinyRecipeFragment
        }
    }
`;

export interface TinyRecipe {
    _id: string;
    name: string;
    item: TinyItem;
}

export interface TinyRecipeArgs {
    id: string;
}

export interface TinyRecipeRes {
    tinyRecipe: TinyRecipe;
}

export const useTinyRecipe = getQueryHook<TinyRecipeRes, TinyRecipeArgs>(
    TinyRecipeQuery
);
