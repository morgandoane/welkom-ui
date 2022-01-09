import { BaseFragment } from './../../fragments/BaseFragment';
import { getQueryHook } from './../../types';
import { gql } from '@apollo/client';
import { Team } from '../../schema/Team/Team';

export const TeamFragment = gql`
    fragment TeamFragment on Team {
        ...BaseFragment
        name
        description
        company {
            _id
            name
        }
        members {
            user_id
            email
            name
        }
        location {
            _id
            label
            address {
                city
            }
            company {
                _id
                name
            }
        }
        permissions
    }
`;

export const TeamQuery = gql`
    ${BaseFragment}
    ${TeamFragment}
    query TeamQuery($id: ObjectId!) {
        team(id: $id) {
            ...BaseFragment
            ...TeamFragment
        }
    }
`;

export interface TeamRes {
    team: Team;
}

export interface TeamArgs {
    id: string;
}

export const useTeam = getQueryHook<TeamRes, TeamArgs>(TeamQuery);
