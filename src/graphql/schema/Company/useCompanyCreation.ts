import { CreateCompanyInput } from './../../inputsTypes';
import { Company, CompanyFragment } from './Company';
import { gql } from '@apollo/client';
import { getMutationHook } from './../../types';
import { TinyProfileFragment } from '../Profile/Profile';
import { UploadEnabledFragment } from '../UploadEnabled/UploadEnabled';
import { ContactFragment } from '../Contact/Contact';

export const CreateCompanyMutation = gql`
    ${CompanyFragment._document}
    ${UploadEnabledFragment._document}
    ${TinyProfileFragment._document}
    ${ContactFragment._document}
    mutation CreateCompanyMutation($data: CreateCompanyInput!) {
        createCompany(data: $data) {
            ...CompanyFragment
        }
    }
`;

export const useCompanyCreation = getMutationHook<
    { createCompany: Company },
    { data: CreateCompanyInput }
>(CreateCompanyMutation);
