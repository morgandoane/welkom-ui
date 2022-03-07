import { AppFragment } from './../../types';
import { TinyBatchLot, TinyBatchLotFragment } from './../BatchLot/BatchLot';
import { TinyCompany, TinyCompanyFragment } from './../Company/Company';
import { TinyLocation, TinyLocationFragment } from './../Location/Location';
import {
    TinyRecipeVersion,
    TinyRecipeVersionFragment,
} from './../RecipeVersion/RecipeVersion';
import {
    TinyProductionLine,
    TinyProductionLineFragment,
} from './../ProductionLine/ProductionLine';
import { UploadEnabled } from './../UploadEnabled/UploadEnabled';
import { gql } from '@apollo/client';

export interface Batch extends UploadEnabled {
    recipe_version: TinyRecipeVersion | null;
    lot: TinyBatchLot;
    location: TinyLocation;
    company: TinyCompany;
    production_line: TinyProductionLine | null;
    date_completed: Date | null;
}

export const BatchFragment = new AppFragment(
    gql`
        fragment BatchFragment on Batch {
            ...UploadEnabledFragment
            recipe_version {
                ...TinyRecipeVersionFragment
            }
            lot {
                ...TinyBatchLotFragment
            }
            location {
                ...TinyLocationFragment
            }
            company {
                ...TinyCompanyFragment
            }
            production_line {
                ...TinyProductionLineFragment
            }
            date_completed
        }
    `,
    [
        TinyRecipeVersionFragment,
        TinyBatchLotFragment,
        TinyLocationFragment,
        TinyCompanyFragment,
        TinyProductionLineFragment,
    ]
);

export const BatchQuery = gql`
    ${BatchFragment._document}
    query BatchQuery($id: ObjectId!) {
        batch(id: $id) {
            ...BatchFragment
        }
    }
`;
