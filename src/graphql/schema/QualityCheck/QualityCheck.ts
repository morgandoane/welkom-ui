import { AppFragment } from './../../types';
import { NamesFragment } from './../Names/Names';
import { Identified, BaseFragment } from './../Base/Base';
import { NumberRange } from '../Range/NumberRange/NumberRange';
import { Names } from '../Names/Names';
import { QualityCheckCategory, QualityCheckClass } from '../../inputsTypes';
import { Base } from '../Base/Base';
import { gql } from '@apollo/client';

export interface QualityCheckOption {
    value: string;
    acceptable: boolean;
}

export interface QualityCheck extends Base {
    quality_check_category: QualityCheckCategory;
    quality_check_class: QualityCheckClass;
    required: boolean;
    prompt: Names;
    help: Names | null;
    number_range: NumberRange | null;
    options: QualityCheckOption[] | null;
}

export interface TinyQualityCheck extends Identified {
    quality_check_class: QualityCheckClass;
    prompt: Names;
}

export const TinyQualityCheckFragment = new AppFragment(
    gql`
        fragment TinyQualityCheckFragment on QualityCheck {
            _id
            quality_check_class
            prompt {
                ...NamesFragment
            }
        }
    `,
    [NamesFragment]
);

export const QualityCheckFragment = new AppFragment(
    gql`
        fragment QualityCheckFragment on QualityCheck {
            ...BaseFragment
            quality_check_class
            prompt {
                ...NamesFragment
            }
        }
    `,
    [BaseFragment, NamesFragment]
);
