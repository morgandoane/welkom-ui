import { UpdateTeamInput } from '../../inputsTypes';
import { Team, TeamFragment } from './Team';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';
import { TinyProfileFragment } from '../Profile/Profile';
import { UploadEnabledFragment } from '../UploadEnabled/UploadEnabled';
import { AddressFragment } from '../Address/Address';
import { TinyCompanyFragment } from '../Company/Company';
import { TinyLocationFragment } from '../Location/Location';
import { ContactFragment } from '../Contact/Contact';

export const UpdateTeamMutation = gql`
    ${TeamFragment._document}
    ${UploadEnabledFragment._document}
    ${TinyProfileFragment._document}
    ${TinyCompanyFragment._document}
    ${TinyLocationFragment._document}
    ${AddressFragment._document}
    ${ContactFragment._document}
    mutation UpdateTeamMutation($id: ObjectId!, $data: UpdateTeamInput!) {
        updateTeam(id: $id, data: $data) {
            ...TeamFragment
        }
    }
`;

export const useTeamUpdate = getMutationHook<
    { updateTeam: Team },
    { id: string; data: UpdateTeamInput }
>(UpdateTeamMutation);
