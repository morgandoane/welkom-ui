import { TinyProfile } from "./../../schema/Profile/Profile";
import { gql, QueryHookOptions, QueryResult, useQuery } from "@apollo/client";
import { ProfileFilter } from "../../schema/Profile/ProfileFilter";
import { Pagination } from "../../schema/Pagination/Pagination";

export const TinyProfiles = gql`
  query TinyProfiles($filter: ProfileFilter!) {
    profiles(filter: $filter) {
      count
      items {
        user_id
        email
        name
      }
    }
  }
`;

export const useTinyProfiles = (
  options?: QueryHookOptions<
    { profiles: Pagination<TinyProfile> },
    { filter: ProfileFilter }
  >
): QueryResult<
  { profiles: Pagination<TinyProfile> },
  { filter: ProfileFilter }
> => useQuery(TinyProfiles, options);
