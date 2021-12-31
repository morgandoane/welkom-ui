import { CreateBolInput } from "./../../schema/Bol/BolInput";
import { Bol, BolFragment } from "./../../schema/Bol/Bol";
import { gql } from "@apollo/client";
import { getMutationHook } from "./../../types";

export const CreateBol = gql`
  ${BolFragment}
  mutation CreateBol($data: CreateBolInput!) {
    createBol(data: $data) {
      ...BolFragment
    }
  }
`;

export interface CreateBolRes {
  createBol: Bol;
}

export interface CreateBolArgs {
  data: CreateBolInput;
}

export const useBolCreation = getMutationHook<CreateBolRes, CreateBolArgs>(
  CreateBol
);
