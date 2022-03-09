import { AddressFragment } from './../Address/Address';
import { TinyLocationFragment } from './../Location/Location';
import { TinyCompanyFragment } from './../Company/Company';
import { CreateTeamInput } from '../../inputsTypes';
import { Team, TeamFragment } from './Team';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';
import { TinyProfileFragment } from '../Profile/Profile';
import { UploadEnabledFragment } from '../UploadEnabled/UploadEnabled';

export const CreateTeamMutation = gql`
    ${TeamFragment._document}
    ${UploadEnabledFragment._document}
    ${TinyProfileFragment._document}
    ${TinyCompanyFragment._document}
    ${TinyLocationFragment._document}
    ${AddressFragment._document}
    mutation CreateTeamMutation($data: CreateTeamInput!) {
        createTeam(data: $data) {
            ...TeamFragment
        }
    }
`;

export const useTeamCreation = getMutationHook<
    { createTeam: Team },
    { data: CreateTeamInput }
>(CreateTeamMutation);
