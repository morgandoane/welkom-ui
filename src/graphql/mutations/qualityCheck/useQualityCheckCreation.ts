import { Prompt, PromptFragment } from "./../../schema/Prompt/Prompt";
import {
  QualityCheck,
  QualityCheckFragment,
} from "./../../schema/QualityCheck/QualityCheck";
import { gql } from "@apollo/client";
import { getMutationHook } from "./../../types";
import { BaseFragment } from "../../fragments/BaseFragment";

const CreateQualityCheck = gql`
  ${BaseFragment}
  ${QualityCheckFragment}
  ${PromptFragment}
  mutation CreateQualityCheck($data: CreateQualityCheckInput!) {
    createQualityCheck(data: $data) {
      ...QualityCheckFragment
    }
  }
`;

export interface CreateQualityCheckRes {
  createQualityCheck: QualityCheck;
}

export interface CreateQualityCheckInput {
  item: string;
  prompt: Prompt;
}

export interface CreateQualityCheckArgs {
  data: CreateQualityCheckInput;
}

export const useQualityCheckCreation = getMutationHook<
  CreateQualityCheckRes,
  CreateQualityCheckArgs
>(CreateQualityCheck);
