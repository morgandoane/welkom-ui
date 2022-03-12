import { AddressFragment } from './../Address/Address';
import { TeamFilter } from '../../inputsTypes';
import { Pagination } from '../../../utils/types/Pagination';
import { getFilterQueryHook } from '../../types';
import { TinyTeam, TinyTeamFragment } from './Team';
import { gql } from '@apollo/client';
import { TinyCompanyFragment } from '../Company/Company';
import { TinyLocationFragment } from '../Location/Location';
import { ContactFragment } from '../Contact/Contact';

export const TeamsQuery = gql`
    ${TinyTeamFragment._document}
    ${TinyCompanyFragment._document}
    ${TinyLocationFragment._document}
    ${AddressFragment._document}
    ${ContactFragment._document}
    query TeamsQuery($filter: TeamFilter!) {
        teams(filter: $filter) {
            count
            items {
                ...TinyTeamFragment
            }
        }
    }
`;

export const useTeams = getFilterQueryHook<
    { teams: Pagination<TinyTeam> },
    { filter: TeamFilter }
>(TeamsQuery);
