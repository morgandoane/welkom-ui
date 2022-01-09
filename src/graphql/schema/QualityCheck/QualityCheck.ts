import { TinyItem } from './../Item/Item';
import { Base } from './../Base/Base';
import { Prompt } from './../Prompt/Prompt';
import { gql } from '@apollo/client';

export interface QualityCheck extends Base {
    item: TinyItem;
    prompt: Prompt;
}

export const QualityCheckFragment = gql`
    fragment QualityCheckFragment on QualityCheck {
        ...BaseFragment
        item {
            _id
            unit_class
            english
            spanish
        }
        prompt {
            ...PromptFragment
        }
    }
`;
