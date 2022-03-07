import { AddressFragment } from './../Address/Address';
import { TinyCompanyFragment } from './../Company/Company';
import { UpdateLocationInput } from '../../inputsTypes';
import { Location, LocationFragment } from './Location';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';
import { TinyProfileFragment } from '../Profile/Profile';
import { UploadEnabledFragment } from '../UploadEnabled/UploadEnabled';

export const UpdateLocationMutation = gql`
    ${LocationFragment._document}
    ${UploadEnabledFragment._document}
    ${TinyProfileFragment._document}
    ${TinyCompanyFragment._document}
    ${AddressFragment._document}
    mutation UpdateLocationMutation(
        $id: ObjectId!
        $data: UpdateLocationInput!
    ) {
        updateLocation(id: $id, data: $data) {
            ...LocationFragment
        }
    }
`;

export const useLocationUpdate = getMutationHook<
    { updateLocation: Location },
    { id: string; data: UpdateLocationInput }
>(UpdateLocationMutation);
