import { getQueryHook } from './../../types';
import {
    ProductionLine,
    ProductionLineFragment,
} from './../../schema/ProductionLine/ProductionLine';
import { gql } from '@apollo/client';

export const ProductionLinesQuery = gql`
    ${ProductionLineFragment}
    query ProductionLinesQuery {
        productionLines {
            ...ProductionLineFragment
        }
    }
`;

export interface ProductionLinesRes {
    productionLines: ProductionLine[];
}

export const useProductionLines =
    getQueryHook<ProductionLinesRes>(ProductionLinesQuery);
