import { BaseFragment } from "./../../fragments/BaseFragment";
import { getMutationHook } from "./../../types";
import { CreateTeamInput } from "./../../schema/Team/TeamInput";
import { Team } from "./../../schema/Team/Team";
import { TeamFragment } from "./../../queries/team/useTeam";
import { gql } from "@apollo/client";

export const CreateTeam = gql`
  ${BaseFragment}
  ${TeamFragment}
  mutation CreateTeam($data: CreateTeamInput!) {
    createTeam(data: $data) {
      ...TeamFragment
    }
  }
`;

export interface CreateTeamRes {
  createTeam: Team;
}

export interface CreateTeamArgs {
  data: CreateTeamInput;
}

export const useTeamCreation = getMutationHook<CreateTeamRes, CreateTeamArgs>(
  CreateTeam
);
