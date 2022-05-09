import { gql } from '@apollo/client';
import { Base, TinyBase } from '../Base/Base';
import { HoldResolution } from '../HoldResolution/HoldResolution';
import { HoldClass } from './HoldClass';

export interface Hold extends Base {
    reason: string;
    class: HoldClass;
    resolution: HoldResolution | null;
}

export interface TinyHold extends TinyBase {
    reason: string;
    class: HoldClass;
    resolution: HoldResolution | null;
}

export const HoldFragment = gql`
    fragment HoldFragment on Hold {
        ...BaseFragment
        reason
        class
        resolution {
            ...HoldResolutionFragment
        }
    }
`;

export const TinyHoldFragment = gql`
    fragment TinyHoldFragment on Hold {
        ...TinyBaseFragment
        reason
        class
        resolution {
            ...HoldResolutionFragment
        }
    }
`;
