import { BaseFilter } from "./../../schema/Base/BaseFilter";
import { PaginateArg, Pagination } from "./../../schema/Pagination/Pagination";
import { PromptFragment } from "../../schema/Prompt/Prompt";
import {
  QualityCheck,
  QualityCheckFragment,
} from "../../schema/QualityCheck/QualityCheck";
import { getQueryHook } from "../../types";
import { gql } from "@apollo/client";
import { BaseFragment } from "../../fragments/BaseFragment";

export const QualityChecks = gql`
  ${BaseFragment}
  ${PromptFragment}
  ${QualityCheckFragment}
  query QualityChecks($filter: QualityCheckFilter!) {
    qualityChecks(filter: $filter) {
      count
      items {
        ...QualityCheckFragment
      }
    }
  }
`;

export interface QualityChecksRes {
  qualityChecks: Pagination<QualityCheck>;
}

export interface QualityCheckFilter extends BaseFilter {
  item?: string;
}

export interface QualityChecksArgs {
  filter: QualityCheckFilter;
}

export const useQualityChecks = getQueryHook<
  QualityChecksRes,
  QualityChecksArgs
>(QualityChecks);
