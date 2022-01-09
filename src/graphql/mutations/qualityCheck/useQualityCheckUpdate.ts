import { Prompt, PromptFragment } from '../../schema/Prompt/Prompt';
import {
    QualityCheck,
    QualityCheckFragment,
} from '../../schema/QualityCheck/QualityCheck';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';
import { BaseFragment } from '../../fragments/BaseFragment';

const UpdateQualityCheck = gql`
    ${BaseFragment}
    ${QualityCheckFragment}
    ${PromptFragment}
    mutation UpdateQualityCheck(
        $id: ObjectId!
        $data: UpdateQualityCheckInput!
    ) {
        updateQualityCheck(id: $id, data: $data) {
            ...QualityCheckFragment
        }
    }
`;

export interface UpdateQualityCheckRes {
    updateQualityCheck: QualityCheck;
}

export interface UpdateQualityCheckInput {
    item?: string;
    prompt?: Prompt;
    deleted?: boolean;
}

export interface UpdateQualityCheckArgs {
    id: string;
    data: UpdateQualityCheckInput;
}

export const useQualityCheckUpdate = getMutationHook<
    UpdateQualityCheckRes,
    UpdateQualityCheckArgs
>(UpdateQualityCheck);
