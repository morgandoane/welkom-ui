import { Location, LocationFragment } from './Location';
import { getAtomicQueryHook } from '../../types';
import { gql } from '@apollo/client';
import { UploadEnabledFragment } from '../UploadEnabled/UploadEnabled';
import { TinyProfileFragment } from '../Profile/Profile';
import { AddressFragment } from '../Address/Address';
import { TinyCompanyFragment } from '../Company/Company';

const LocationQuery = gql`
    ${LocationFragment._document}
    ${UploadEnabledFragment._document}
    ${TinyProfileFragment._document}
    ${TinyCompanyFragment._document}
    ${AddressFragment._document}
    query LocationQuery($id: ObjectId!) {
        location(id: $id) {
            ...LocationFragment
        }
    }
`;

export const useLocation =
    getAtomicQueryHook<{ location: Location }>(LocationQuery);
