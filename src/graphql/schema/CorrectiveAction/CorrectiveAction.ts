import { gql } from '@apollo/client';
import { Base } from '../Base/Base';

export type CorrectiveAction = Base;

export const CorrectiveActionFragment = gql`
    fragment CorrectiveActionFragment on CorrectiveAction {
        ...TinyBaseFragment
        comments {
            ...CommentFragment
        }
    }
`;
