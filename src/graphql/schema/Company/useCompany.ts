import { ContactFragment } from './../Contact/Contact';
import { Company, CompanyFragment } from './Company';
import { getAtomicQueryHook } from './../../types';
import { gql } from '@apollo/client';
import { UploadEnabledFragment } from '../UploadEnabled/UploadEnabled';
import { TinyProfileFragment } from '../Profile/Profile';

export const CompanyQuery = gql`
    ${CompanyFragment._document}
    ${UploadEnabledFragment._document}
    ${TinyProfileFragment._document}
    ${ContactFragment._document}
    query CompanyQuery($id: ObjectId!) {
        company(id: $id) {
            ...CompanyFragment
        }
    }
`;

export const useCompany =
    getAtomicQueryHook<{ company: Company }>(CompanyQuery);
