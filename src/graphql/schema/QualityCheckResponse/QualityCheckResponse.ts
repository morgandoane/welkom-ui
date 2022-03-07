import { AppFragment } from './../../types';
import {
    TinyQualityCheck,
    TinyQualityCheckFragment,
} from './../QualityCheck/QualityCheck';
import { Identified } from './../Base/Base';
import { gql } from '@apollo/client';

export interface QualityCheckResponse extends Identified {
    quality_check: TinyQualityCheck;
    response: string | null;
    passed: boolean;
}

export const QualityCheckResponseFragment = new AppFragment(
    gql`
        fragment QualityCheckResponseFragment on QualityCheckResponse {
            quality_check {
                ...TinyQualityCheckFragment
            }
            response
            passed
        }
    `,
    [TinyQualityCheckFragment]
);
