import { UpdateLocationInput } from "./../../schema/Location/LocationInput";
import { Location } from "./../../schema/Location/Location";
import {
  gql,
  MutationHookOptions,
  MutationTuple,
  useMutation,
} from "@apollo/client";
import { BaseFragment } from "../../fragments/BaseFragment";
import { AddressFragment } from "../../fragments/AddressFragment";

export interface UpdateLocationArgs {
  id: string;
  data: UpdateLocationInput;
}

export interface UpdateLocationRes {
  updateLocation: Location;
}
export const UpdateLocation = gql`
  ${BaseFragment}
  ${AddressFragment}
  mutation UpdateLocation($id: ObjectId!, $data: UpdateLocationInput!) {
    updateLocation(id: $id, data: $data) {
      ...BaseFragment
      address {
        ...AddressFragment
      }
      label
    }
  }
`;

export const useLocationUpdate = (
  options?: MutationHookOptions<UpdateLocationRes, UpdateLocationArgs>
): MutationTuple<UpdateLocationRes, UpdateLocationArgs> =>
  useMutation(UpdateLocation, options);
