import { TeamFilter } from "./../../schema/Team/TeamFilter";
import { Pagination } from "./../../schema/Pagination/Pagination";
import { BaseFragment } from "../../fragments/BaseFragment";
import { getQueryHook } from "../../types";
import { gql } from "@apollo/client";
import { Team } from "../../schema/Team/Team";
import { TeamFragment } from "./useTeam";

export const TeamsQuery = gql`
  ${BaseFragment}
  ${TeamFragment}
  query TeamsQuery($filter: TeamFilter!) {
    teams(filter: $filter) {
      count
      items {
        ...BaseFragment
        ...TeamFragment
      }
    }
  }
`;

export interface TeamsRes {
  teams: Pagination<Team>;
}

export interface TeamsArgs {
  filter: TeamFilter;
}

export const useTeams = getQueryHook<TeamsRes, TeamsArgs>(TeamsQuery);
