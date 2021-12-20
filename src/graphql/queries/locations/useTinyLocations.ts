import { LocationFIlter as LocationFilter } from "./../../schema/Location/LocationFilter";
import { gql } from "@apollo/client";
import { getQueryHook } from "./../../types";
import { Pagination } from "../../schema/Pagination/Pagination";

export const TinyLocations = gql`
  query TinyLocations($filter: LocationFIlter!) {
    locations(filter: $filter) {
      count
      items {
        _id
        label
        address {
          city
        }
        company {
          _id
          name
        }
      }
    }
  }
`;

export interface TinyLocation {
  _id: string;
  label?: string | null;
  address?: {
    city: string;
  } | null;
  company: {
    _id: string;
    name: string;
  };
}

export interface TinyLocationsRes {
  locations: Pagination<TinyLocation>;
}

export interface TinyLocationsArgs {
  filter: LocationFilter;
}

export const useTinyLocations = getQueryHook<
  TinyLocationsRes,
  TinyLocationsArgs
>(TinyLocations);
