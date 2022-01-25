import {
    RecipeSectionFragment,
    RecipeStepFragment,
} from './../../schema/RecipeStep/RecipeStep';
import { RecipeVersionFragment } from './../../schema/RecipeVersion/RecipeVersion';
import { TinyLotFragment } from './../../schema/Lot/Lot';
import { TinyUnitFragment } from './../../schema/Unit/Unit';
import { TinyItemFragment } from './../items/useTinyItems';
import {
    ProceduralLotFragment,
    ProceduralLotContentFragment,
} from './../../schema/Lot/extensions/ProceduralLot/ProceduralLot';
import { BaseFragment } from './../../fragments/BaseFragment';
import { Batch, BatchFragment } from './../../schema/Batch/Batch';
import { ProductionLineFragment } from '../../schema/ProductionLine/ProductionLine';
import { getQueryHook } from '../../types';
import { gql } from '@apollo/client';
import { TinyLocationFragment } from '../locations/useTinyLocations';

export const BatchQuery = gql`
    ${BatchFragment}
    ${TinyItemFragment}
    ${ProductionLineFragment}
    ${TinyLocationFragment}
    ${BaseFragment}
    ${ProceduralLotFragment}
    ${TinyItemFragment}
    ${TinyUnitFragment}
    ${ProceduralLotContentFragment}
    ${TinyLotFragment}
    ${RecipeVersionFragment}
    ${RecipeSectionFragment}
    ${RecipeStepFragment}
    query BatchQuery($id: ObjectId!) {
        batch(id: $id) {
            ...BatchFragment
        }
    }
`;

export interface BatchRes {
    batch: Batch;
}

export interface BatchArgs {
    id: string;
}

export const useBatch = getQueryHook<BatchRes, BatchArgs>(BatchQuery);
