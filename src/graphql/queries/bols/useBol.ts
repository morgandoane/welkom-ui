import { getQueryHook } from "./../../types";
import { Bol, BolFragment } from "./../../schema/Bol/Bol";
import { gql } from "@apollo/client";

export const BolQuery = gql`
  ${BolFragment}
  query BolQuery($id: ObjectId!) {
    bol(id: $id) {
      ...BolFragment
    }
  }
`;

export interface BolRes {
  bol: Bol;
}

export interface BolArgs {
  id: string;
}

export const useBol = getQueryHook<BolRes, BolArgs>(BolQuery);
