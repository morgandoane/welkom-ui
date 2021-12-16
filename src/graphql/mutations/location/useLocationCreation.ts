import { AddressFragment } from "../../fragments/AddressFragment";
import { BaseFragment } from "../../fragments/BaseFragment";
import { CreateLocationInput } from "../../schema/Location/LocationInput";
import {
  gql,
  MutationHookOptions,
  MutationTuple,
  useMutation,
} from "@apollo/client";
import { Location } from "./../../schema/Location/Location";

export const CreateLocation = gql`
  ${BaseFragment}
  ${AddressFragment}
  mutation CreateLocation($data: CreateLocationInput!) {
    createLocation(data: $data) {
      ...BaseFragment
      address {
        ...AddressFragment
      }
      label
    }
  }
`;

export interface CreateLocationArgs {
  data: CreateLocationInput;
}

export interface CreateLocationRes {
  createLocation: Location;
}

export const useLocationCreation = (
  options?: MutationHookOptions<CreateLocationRes, CreateLocationArgs>
): MutationTuple<CreateLocationRes, CreateLocationArgs> =>
  useMutation(CreateLocation, options);
