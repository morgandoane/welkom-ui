import { BaseFragment } from './../../fragments/BaseFragment';
import { UpdateTeamInput } from '../../schema/Team/TeamInput';
import { Team } from '../../schema/Team/Team';
import { TeamFragment } from '../../queries/team/useTeam';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';

export const UpdateTeam = gql`
    ${BaseFragment}
    ${TeamFragment}
    mutation UpdateTeam($id: ObjectId!, $data: UpdateTeamInput!) {
        updateTeam(id: $id, data: $data) {
            ...TeamFragment
        }
    }
`;

export interface UpdateTeamRes {
    updateTeam: Team;
}

export interface UpdateTeamArgs {
    id: string;
    data: UpdateTeamInput;
}

export const useTeamUpdate = getMutationHook<UpdateTeamRes, UpdateTeamArgs>(
    UpdateTeam
);
