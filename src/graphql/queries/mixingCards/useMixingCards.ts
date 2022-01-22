import { TinyUnitFragment } from './../../schema/Unit/Unit';
import { RecipeStepFragment } from './../../schema/RecipeStep/RecipeStep';
import { RecipeVersionFragment } from './../../schema/RecipeVersion/RecipeVersion';
import { getQueryHook } from './../../types';
import { TinyItemFragment } from './../items/useTinyItems';
import { MixingCardLineFragment } from './../../schema/MixingCardLine/MixingCardLine';
import { BaseFragment } from './../../fragments/BaseFragment';
import {
    MixingCard,
    MixingCardFragment,
} from './../../schema/MixingCard/MixingCard';
import { gql } from '@apollo/client';
import { RecipeSectionFragment } from '../../schema/RecipeStep/RecipeStep';
import { RecipeFragment } from '../../schema/Recipe/Recipe';

export const MixingCardsQuery = gql`
    ${MixingCardFragment}
    ${BaseFragment}
    ${MixingCardLineFragment}
    ${TinyItemFragment}
    ${RecipeVersionFragment}
    ${RecipeSectionFragment}
    ${RecipeStepFragment}
    ${TinyUnitFragment}
    ${RecipeFragment}
    query MixingCardsQuery {
        mixingCards {
            ...MixingCardFragment
        }
    }
`;

export interface MixingCardsRes {
    mixingCards: MixingCard[];
}

export const useMixingCards = getQueryHook<MixingCardsRes>(MixingCardsQuery);
