import { UpdateCompanyInput } from './../../inputsTypes';
import { Company, CompanyFragment } from './Company';
import { gql } from '@apollo/client';
import { getMutationHook } from './../../types';
import { TinyProfileFragment } from '../Profile/Profile';
import { UploadEnabledFragment } from '../UploadEnabled/UploadEnabled';
import { ContactFragment } from '../Contact/Contact';

export const UpdateCompanyMutation = gql`
    ${CompanyFragment._document}
    ${UploadEnabledFragment._document}
    ${TinyProfileFragment._document}
    ${ContactFragment._document}
    mutation UpdateCompanyMutation($id: ObjectId!, $data: UpdateCompanyInput!) {
        updateCompany(id: $id, data: $data) {
            ...CompanyFragment
        }
    }
`;

export const useCompanyUpdate = getMutationHook<
    { updateCompany: Company },
    { id: string; data: UpdateCompanyInput }
>(UpdateCompanyMutation);
