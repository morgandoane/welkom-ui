import { AppFragment } from './../../types';
import { UploadEnabledFragment } from './../UploadEnabled/UploadEnabled';
import { TinyLot, TinyLotFragment } from './../Lot/Lot';
import {
    HoldResolution,
    HoldResolutionFragment,
} from '../HoldResolution/HoldResolution';
import { UploadEnabled } from '../UploadEnabled/UploadEnabled';
import { gql } from '@apollo/client';

export interface Hold extends UploadEnabled {
    reason: string;
    propagating: boolean;
    lots: TinyLot[];
    resolution: HoldResolution | null;
}

export const HoldFragment = new AppFragment(
    gql`
        fragment HoldFragment on Hold {
            ...UploadEnabledFragment
            reason
            propagating
            lots {
                ...TinyLotFragment
            }
            resolution {
                ...HoldResolutionFragment
            }
        }
    `,
    [UploadEnabledFragment, TinyLotFragment, HoldResolutionFragment]
);
