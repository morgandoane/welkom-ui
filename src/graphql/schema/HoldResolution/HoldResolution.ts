import { gql } from '@apollo/client';
import { TinyProfile } from '../Profile/Profile';

export interface HoldResolution {
    resolved_by: TinyProfile;
    resolution: string;
    timestamp: Date;
}

export const HoldResolutionFragment = gql`
    fragment HoldResolutionFragment on HoldResolution {
        resolved_by {
            ...TinyProfileFragment
        }
        resolution
        timestamp
    }
`;
