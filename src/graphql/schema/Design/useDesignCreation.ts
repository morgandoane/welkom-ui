import { CreateDesignInput } from '../../inputsTypes';
import { Design, DesignFragment } from './Design';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';
import { TinyProfileFragment } from '../Profile/Profile';
import { UploadEnabledFragment } from '../UploadEnabled/UploadEnabled';
import { ContactFragment } from '../Contact/Contact';

export const CreateDesignMutation = gql`
    ${DesignFragment._document}
    ${UploadEnabledFragment._document}
    ${TinyProfileFragment._document}
    mutation CreateDesignMutation($data: CreateDesignInput!) {
        createDesign(data: $data) {
            ...DesignFragment
        }
    }
`;

export const useDesignCreation = getMutationHook<
    { createDesign: Design },
    { data: CreateDesignInput }
>(CreateDesignMutation);
