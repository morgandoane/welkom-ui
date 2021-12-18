import { BaseFragment } from "../../fragments/BaseFragment";
import {
  gql,
  MutationHookOptions,
  MutationTuple,
  useMutation,
} from "@apollo/client";
import { Unit } from "../../schema/Unit/Unit";
import { UpdateUnitInput } from "../../schema/Unit/UnitInputs";

const UpdateUnitMutation = gql`
  ${BaseFragment}
  mutation UpdateUnitMutation($id: ObjectId!, $data: UpdateUnitInput!) {
    updateUnit(id: $id, data: $data) {
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

export interface UpdateUnitArgs {
  id: string;
  data: UpdateUnitInput;
}

export interface UpdateUnitRes {
  updateUnit: Unit;
}

export const useUnitUpdate = (
  options?: MutationHookOptions<UpdateUnitRes, UpdateUnitArgs>
): MutationTuple<UpdateUnitRes, UpdateUnitArgs> =>
  useMutation(UpdateUnitMutation, options);
