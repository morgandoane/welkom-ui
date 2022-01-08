import { BaseFragment } from "./../../fragments/BaseFragment";
import {
  Fulfillment,
  FulfillmentFragment,
} from "./../../schema/Fulfillment/Fulfillment";
import { gql } from "@apollo/client";
import { getMutationHook } from "./../../types";
import { CreateFulfillmentInput } from "../../schema/Fulfillment/FulfillmentInput";
import { AppFileFragment } from "../../schema/AppFile/AppFile";
import { VerificationFragment } from "../../schema/Verification/Verification";

export const CreateFulfillment = gql`
  ${FulfillmentFragment}
  ${BaseFragment}
  ${AppFileFragment}
  ${VerificationFragment}
  mutation CreateFulfillment($data: FulfillmentInput!) {
    createFulfillment(data: $data) {
      ...FulfillmentFragment
    }
  }
`;

export interface CreateFulfillmentRes {
  createFulfillment: Fulfillment;
}

export interface CreateFulfillmentArgs {
  data: CreateFulfillmentInput;
}

export const useFulfillmentCreation = getMutationHook(CreateFulfillment);
