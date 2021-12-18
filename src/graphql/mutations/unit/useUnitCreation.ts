import { AppFileFragment } from "../../schema/AppFile/AppFile";
import { BaseFragment } from "../../fragments/BaseFragment";
import {
  gql,
  MutationHookOptions,
  MutationTuple,
  useMutation,
} from "@apollo/client";
import { Unit } from "../../schema/Unit/Unit";
import { CreateUnitInput } from "../../schema/Unit/UnitInputs";

const CreateUnitMutation = gql`
  ${BaseFragment}
  mutation CreateUnitMutation($data: CreateUnitInput!) {
    createUnit(data: $data) {
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

export interface CreateUnitArgs {
  data: CreateUnitInput;
}

export interface CreateUnitRes {
  createUnit: Unit;
}

export const useUnitCreation = (
  options?: MutationHookOptions<CreateUnitRes, CreateUnitArgs>
): MutationTuple<CreateUnitRes, CreateUnitArgs> =>
  useMutation(CreateUnitMutation, options);
