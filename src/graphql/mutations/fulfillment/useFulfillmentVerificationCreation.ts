import { CreateVerificationInput } from "./../../schema/Verification/VerificationInput";
import {
  Fulfillment,
  FulfillmentFragment,
} from "./../../schema/Fulfillment/Fulfillment";
import { getMutationHook } from "./../../types";
import { gql } from "@apollo/client";
import { BaseFragment } from "../../fragments/BaseFragment";
import { AppFileFragment } from "../../schema/AppFile/AppFile";
import { VerificationFragment } from "../../schema/Verification/Verification";

export const CreateFulfillmentVerification = gql`
  ${FulfillmentFragment}
  ${BaseFragment}
  ${AppFileFragment}
  ${VerificationFragment}
  mutation VerifyFulfillment($data: CreateVerificationInput!, $id: ObjectId!) {
    verifyFulfillment(data: $data, id: $id) {
      ...FulfillmentFragment
    }
  }
`;

export interface CreateFulfillmentVerificationRes {
  verifyFulfillment: Fulfillment;
}

export interface CreateFulfillmentVerificationArgs {
  id: string;
  data: CreateVerificationInput;
}

export const useFulfillmentVerificationCreation = getMutationHook<
  CreateFulfillmentVerificationRes,
  CreateFulfillmentVerificationArgs
>(CreateFulfillmentVerification);
