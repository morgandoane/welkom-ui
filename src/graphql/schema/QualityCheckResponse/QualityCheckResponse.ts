import { gql } from '@apollo/client';
import { CorrectiveAction } from '../CorrectiveAction/CorrectiveAction';
import { QualityCheckClass } from '../QualityCheck/QualityCheckClass';
import { QualityCheckOption } from '../QualityCheck/QualityCheckOption';

export interface QualityCheckResponse {
    _id: string;
    prompt: string;
    options: QualityCheckOption[];
    acceptable_range?: number[];
    response: string;
    passed: boolean;
    corrective_action?: CorrectiveAction;
    class: QualityCheckClass;
}

export const QualityCheckResponseFragment = gql`
    fragment QualityCheckResponseFragment on QualityCheckResponse {
        _id
        prompt
        options {
            ...QualityCheckOptionFragment
        }
        acceptable_range
        response
        passed
        corrective_action {
            ...CorrectiveActionFragment
        }
        class
    }
`;
