import { AppFragment } from './../../types';
import { BaseFragment } from './../Base/Base';
import { gql } from '@apollo/client';
import { Base } from '../Base/Base';

export interface HoldResolution extends Base {
    action: string;
}

export const HoldResolutionFragment = new AppFragment(
    gql`
        fragment HoldResolutionFragment on HoldResolution {
            ...BaseFragment
            action
        }
    `,
    [BaseFragment]
);
