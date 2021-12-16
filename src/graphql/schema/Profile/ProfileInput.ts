export interface ProfileInput {
  given_name: string;
  family_name: string;
  email: string;
  phone_number: string;
  temporary_password: string;
}

export interface UpdateProfileInput {
  given_name?: string;
  family_name?: string;
  email?: string;
  phone_number?: string;
}
