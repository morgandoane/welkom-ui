import { UploadEnabledFragment } from './../UploadEnabled/UploadEnabled';
import { TinyItem, TinyItemFragment } from './../Item/Item';
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
    item: TinyItem | null;
}

export interface TinyQualityCheck extends Identified {
    quality_check_category: QualityCheckCategory;
    quality_check_class: QualityCheckClass;
    prompt: Names;
    item: TinyItem | null;
}

export const TinyQualityCheckFragment = new AppFragment(
    gql`
        fragment TinyQualityCheckFragment on QualityCheck {
            _id
            quality_check_class
            quality_check_category
            item {
                ...TinyItemFragment
            }
            prompt {
                ...NamesFragment
            }
        }
    `,
    [NamesFragment, TinyItemFragment]
);

export const QualityCheckFragment = new AppFragment(
    gql`
        fragment QualityCheckFragment on QualityCheck {
            ...BaseFragment
            quality_check_class
            quality_check_category
            options {
                value
                acceptable
            }
            number_range {
                min
                max
            }
            item {
                ...TinyItemFragment
            }
            prompt {
                ...NamesFragment
            }
        }
    `,
    [BaseFragment, NamesFragment, TinyItemFragment]
);
