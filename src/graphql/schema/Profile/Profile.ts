import { gql } from '@apollo/client';
import { UserRole } from '../../../auth/UserRole';

export interface UserMetaDataInput {
    prefers_dark_mode?: boolean;
    phone_number?: string;
}

export interface AppMetaData {
    created_by?: string;
    require_password_reset?: boolean;
}

export interface UserMetaData {
    prefers_dark_mode?: boolean;
    phone_number?: string;
}

export interface ProfileIdentityData {
    email?: string | undefined;
    email_verified?: boolean | undefined;
    name?: string | undefined;
    phone_number?: string | undefined;
    phone_verified?: boolean | undefined;
    request_language?: string | undefined;
}

export interface ProfileIdentity {
    connection: string;
    user_id: string;
    provider: string;
    isSocial: boolean;
    access_token?: string | undefined;
    profileData?: ProfileIdentityData;
}

export interface TinyProfile {
    user_id: string;
    email: string;
    roles: UserRole[];
    name: string;
}

export interface Profile extends TinyProfile {
    email_verified?: boolean | undefined;
    username?: string | undefined;
    phone_number?: string | undefined;
    phone_verified?: boolean | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    identities?: ProfileIdentity[] | undefined;
    app_metadata: AppMetaData | undefined;
    user_metadata?: UserMetaData | undefined;
    picture?: string | undefined;
    nickname?: string | undefined;
    multifactor?: string[] | undefined;
    last_ip?: string | undefined;
    last_login?: string | undefined;
    last_password_reset?: string | undefined;
    logins_count?: number | undefined;
    blocked?: boolean | undefined;
    given_name?: string | undefined;
    family_name?: string | undefined;
}

export const ProfileFragment = gql`
    fragment ProfileFragment on Profile {
        email_verified
        username
        phone_number
        phone_verified
        created_at
        updated_at
        picture
        nickname
        multifactor
        last_ip
        last_login
        last_password_reset
        logins_count
        blocked
        given_name
        family_name
    }
`;

export const TinyProfileFragment = gql`
    fragment TinyProfileFragment on Profile {
        user_id
        email
        roles
        name
    }
`;
