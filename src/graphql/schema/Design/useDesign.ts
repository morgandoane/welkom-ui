import { ContactFragment } from '../Contact/Contact';
import { Design, DesignFragment } from './Design';
import { getAtomicQueryHook } from '../../types';
import { gql } from '@apollo/client';
import { UploadEnabledFragment } from '../UploadEnabled/UploadEnabled';
import { TinyProfileFragment } from '../Profile/Profile';

export const DesignQuery = gql`
    ${DesignFragment._document}
    ${UploadEnabledFragment._document}
    ${TinyProfileFragment._document}
    query DesignQuery($id: ObjectId!) {
        design(id: $id) {
            ...DesignFragment
        }
    }
`;

export const useDesign = getAtomicQueryHook<{ design: Design }>(DesignQuery);
