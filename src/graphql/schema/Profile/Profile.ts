import { AppFragment } from './../../types';
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

export interface Profile {
    _id: string;
    email: string;
    roles: UserRole[];
    name: string;
    email_verified?: boolean | undefined;
    username?: string | undefined;
    phone_number?: string | undefined;
    phone_verified?: boolean | undefined;
    user_id: string;
    created_at?: string | undefined;
    updated_at?: string | undefined;
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

export interface TinyProfile {
    email: string;
    roles: UserRole[];
    name: string;
    username?: string | undefined;
    user_id: string;
    given_name?: string | undefined;
    family_name?: string | undefined;
    picture?: string | undefined;
}

export const TinyProfileFragment = new AppFragment(
    gql`
        fragment TinyProfileFragment on Profile {
            email
            roles
            name
            username
            user_id
            given_name
            family_name
            picture
        }
    `,
    []
);

export const ProfileFragment = new AppFragment(
    gql`
        fragment ProfileFragment on Profile {
            _id
            email
            roles
            name
            email_verified
            username
            phone_number
            phone_verified
            user_id
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
    `,
    []
);
