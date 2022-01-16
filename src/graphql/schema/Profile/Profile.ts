export interface AppMetaData {
    created_by: string;
    require_password_rest: boolean;
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

export interface Profile {
    email: string;
    name: string;
    email_verified?: boolean | undefined;
    username?: string | undefined;
    phone_number?: string | undefined;
    phone_verified?: boolean | undefined;
    user_id?: string | undefined;
    _id?: string | undefined;
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

export interface TinyProfile {
    user_id: string;
    email: string;
    name: string;
    picture?: string;
}
