import { CreateLocationInput } from '../../inputsTypes';
import { Location, LocationFragment } from './Location';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';
import { TinyProfileFragment } from '../Profile/Profile';
import { UploadEnabledFragment } from '../UploadEnabled/UploadEnabled';
import { TinyCompanyFragment } from '../Company/Company';
import { AddressFragment } from '../Address/Address';
import { ContactFragment } from '../Contact/Contact';

export const CreateLocationMutation = gql`
    ${LocationFragment._document}
    ${UploadEnabledFragment._document}
    ${TinyProfileFragment._document}
    ${TinyCompanyFragment._document}
    ${AddressFragment._document}
    ${ContactFragment._document}
    mutation CreateLocationMutation($data: CreateLocationInput!) {
        createLocation(data: $data) {
            ...LocationFragment
        }
    }
`;

export const useLocationCreation = getMutationHook<
    { createLocation: Location },
    { data: CreateLocationInput }
>(CreateLocationMutation);
