import { gql } from '@apollo/client';
import { Base, TinyBase } from '../Base/Base';
import { TinyItem } from '../Item/Item';
import { TinyLocation } from '../Location/Location';
import { QualityCheckAction } from './QualityCheckAction';
import { QualityCheckClass } from './QualityCheckClass';
import { QualityCheckOption } from './QualityCheckOption';

export interface QualityCheck extends Base {
    action: QualityCheckAction;
    class: QualityCheckClass;
    prompt: string;
    items: TinyItem[];
    locations: TinyLocation[];
    options: QualityCheckOption[];
    acceptable_range?: number[] | null;
}

export interface TinyQualityCheck extends TinyBase {
    action: QualityCheckAction;
    class: QualityCheckClass;
    prompt: string;
    items: TinyItem[];
    locations: TinyLocation[];
    options: QualityCheckOption[];
    acceptable_range?: number[] | null;
}

export const QualityCheckFragment = gql`
    fragment QualityCheckFragment on QualityCheck {
        ...BaseFragment
        action
        class
        prompt
        items {
            ...TinyItemFragment
        }
        locations {
            ...TinyLocationFragment
        }
        options {
            ...QualityCheckOptionFragment
        }
        acceptable_range
    }
`;

export const TinyQualityCheckFragment = gql`
    fragment TinyQualityCheckFragment on QualityCheck {
        ...TinyBaseFragment
        action
        class
        prompt
        items {
            ...TinyItemFragment
        }
        locations {
            ...TinyLocationFragment
        }
        options {
            ...QualityCheckOptionFragment
        }
        acceptable_range
    }
`;
