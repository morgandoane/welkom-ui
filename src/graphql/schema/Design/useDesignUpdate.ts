import { UpdateDesignInput } from '../../inputsTypes';
import { Design, DesignFragment } from './Design';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';
import { TinyProfileFragment } from '../Profile/Profile';
import { UploadEnabledFragment } from '../UploadEnabled/UploadEnabled';
import { ContactFragment } from '../Contact/Contact';

export const UpdateDesignMutation = gql`
    ${DesignFragment._document}
    ${UploadEnabledFragment._document}
    ${TinyProfileFragment._document}
    mutation UpdateDesignMutation($id: ObjectId!, $data: UpdateDesignInput!) {
        updateDesign(id: $id, data: $data) {
            ...DesignFragment
        }
    }
`;

export const useDesignUpdate = getMutationHook<
    { updateDesign: Design },
    { id: string; data: UpdateDesignInput }
>(UpdateDesignMutation);
