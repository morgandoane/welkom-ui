import { Base, TinyBase } from '../Base/Base';
import { TinyLot } from '../Lot/Lot';
import { TinyLocation } from '../Location/Location';
import { BatchContent } from './BatchContent';
import { BatchStatus } from './BatchStatus';
import { TinyRecipeVersion } from '../RecipeVersion/RecipeVersion';
import { gql } from '@apollo/client';

export interface Batch extends Base {
    status: BatchStatus;
    location: TinyLocation;
    recipe_version: TinyRecipeVersion;
    lot: TinyLot;
    contents: BatchContent[];
}

export interface TinyBatch extends TinyBase {
    status: BatchStatus;
    location: TinyLocation;
    recipe_version: TinyRecipeVersion;
    lot: TinyLot;
    contents: BatchContent[];
}

export const BatchFragment = gql`
    fragment BatchFragment on Batch {
        ...BaseFragment
        status
        location {
            ...TinyLocationFragment
        }
        recipe_version {
            ...TinyRecipeVersionFragment
        }
        lot {
            ...TinyLotFragment
        }
        contents {
            ...BatchContentFragment
        }
    }
`;

export const TinyBatchFragment = gql`
    fragment TinyBatchFragment on Batch {
        ...TinyBaseFragment
        status
        location {
            ...TinyLocationFragment
        }
        recipe_version {
            ...TinyRecipeVersionFragment
        }
        lot {
            ...TinyLotFragment
        }
        contents {
            ...BatchContentFragment
        }
    }
`;
