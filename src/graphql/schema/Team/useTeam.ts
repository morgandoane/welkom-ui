import { ContactFragment } from './../Contact/Contact';
import { Team, TeamFragment } from './Team';
import { getAtomicQueryHook } from '../../types';
import { gql } from '@apollo/client';
import { UploadEnabledFragment } from '../UploadEnabled/UploadEnabled';
import { TinyProfileFragment } from '../Profile/Profile';
import { AddressFragment } from '../Address/Address';
import { TinyCompanyFragment } from '../Company/Company';
import { TinyLocationFragment } from '../Location/Location';

export const TeamQuery = gql`
    ${TeamFragment._document}
    ${UploadEnabledFragment._document}
    ${TinyProfileFragment._document}
    ${TinyCompanyFragment._document}
    ${TinyLocationFragment._document}
    ${AddressFragment._document}
    ${ContactFragment._document}
    query TeamQuery($id: ObjectId!) {
        team(id: $id) {
            ...TeamFragment
        }
    }
`;

export const useTeam = getAtomicQueryHook<{ team: Team }>(TeamQuery);
