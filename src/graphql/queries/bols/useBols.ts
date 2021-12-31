import { getQueryHook } from "./../../types";
import { Pagination } from "./../../schema/Pagination/Pagination";
import { BaseFilter } from "./../../schema/Base/BaseFilter";
import { gql } from "@apollo/client";
import { Bol } from "../../schema/Bol/Bol";

export const BolsQuery = gql`
  query Bols($filter: BolFilter!) {
    bols(filter: $filter) {
      count
      items {
        _id
        date_created
        deleted
        status
        from {
          date
          company {
            _id
            name
          }
          location {
            _id
            label
            address {
              city
            }
          }
        }
        to {
          date
          company {
            _id
            name
          }
          location {
            _id
            label
            address {
              city
            }
          }
        }
        contents {
          fulfillment_percentage
          quantity
          item {
            _id
            unit_class
            english
            spanish
          }
          unit {
            _id
            class
            english
            spanish
            english_plural
            spanish_plural
            base_per_unit
          }
        }
      }
    }
  }
`;

export interface BolFilter extends BaseFilter {
  order?: string;
}

export interface BolsArgs {
  filter: BolFilter;
}

export interface BolsRes {
  bols: Pagination<Bol>;
}

export const useBols = getQueryHook<BolsRes, BolsArgs>(BolsQuery);
