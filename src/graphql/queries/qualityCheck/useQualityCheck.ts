import { PromptFragment } from './../../schema/Prompt/Prompt';
import {
    QualityCheck,
    QualityCheckFragment,
} from './../../schema/QualityCheck/QualityCheck';
import { getQueryHook } from './../../types';
import { gql } from '@apollo/client';
import { BaseFragment } from '../../fragments/BaseFragment';

export const QualityCheckQuery = gql`
    ${BaseFragment}
    ${PromptFragment}
    ${QualityCheckFragment}
    query QualityCheckQuery($id: ObjectId!) {
        qualityCheck(id: $id) {
            ...QualityCheckFragment
        }
    }
`;

export interface QualityCheckRes {
    qualityCheck: QualityCheck;
}

export interface QualityCheckArgs {
    id: string;
}

export const useQualityCheck = getQueryHook<QualityCheckRes, QualityCheckArgs>(
    QualityCheckQuery
);
