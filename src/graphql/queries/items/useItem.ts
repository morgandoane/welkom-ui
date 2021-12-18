import { AppFileFragment } from "../../schema/AppFile/AppFile";
import { BaseFragment } from "../../fragments/BaseFragment";
import { gql, QueryHookOptions, QueryResult, useQuery } from "@apollo/client";
import { Item } from "../../schema/Item/Item";

export const ItemQuery = gql`
  ${BaseFragment}
  ${AppFileFragment}
  query ItemQuery($id: ObjectId!) {
    item(id: $id) {
      ...BaseFragment
      english
      spanish
      unit_class
      files {
        ...AppFileFragment
      }
    }
  }
`;

export const useItem = (
  options: QueryHookOptions<{ item: Item }, { id: string }>
): QueryResult<{ item: Item }, { id: string }> => useQuery(ItemQuery, options);
