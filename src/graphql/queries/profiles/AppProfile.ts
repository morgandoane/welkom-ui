import { UserRole } from "./../../../auth/UserRole";
import { gql } from "@apollo/client";

export interface AppProfile {
  email: string;
  name: string;
  email_verified?: string | null;
  username?: string | null;
  phone_number?: string | null;
  phone_verified?: string | null;
  user_id?: string | null;
  user_metadata?: {
    phone_number?: string | null;
    prefers_dark_mode?: string | null;
  };
  picture?: string | null;
  last_ip?: string | null;
  last_login?: string | null;
  last_password_reset?: string | null;
  logins_count?: string | null;
  blocked?: string | null;
  given_name?: string | null;
  family_name?: string | null;
  roles: UserRole[];
}

export const ProfileFragment = gql`
  fragment ProfileFragment on Profile {
    email
    name
    roles
    email_verified
    username
    phone_number
    phone_verified
    user_id
    user_metadata {
      phone_number
      prefers_dark_mode
    }
    picture
    last_ip
    last_login
    last_password_reset
    logins_count
    blocked
    given_name
    family_name
  }
`;
