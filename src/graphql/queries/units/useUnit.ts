import { BaseFragment } from "./../../fragments/BaseFragment";
import { Unit } from "./../../schema/Unit/Unit";
import { gql, QueryHookOptions, QueryResult, useQuery } from "@apollo/client";

export const UnitQuery = gql`
  ${BaseFragment}
  query UnitQuery($id: ObjectId!) {
    unit(id: $id) {
      ...BaseFragment
      class
      english
      spanish
      english_plural
      spanish_plural
      base_per_unit
    }
  }
`;

export interface UnitRes {
  unit: Unit;
}

export interface UnitArgs {
  id: string;
}

export const useUnit = (
  options?: QueryHookOptions<UnitRes, UnitArgs>
): QueryResult<UnitRes, UnitArgs> => useQuery(UnitQuery, options);
