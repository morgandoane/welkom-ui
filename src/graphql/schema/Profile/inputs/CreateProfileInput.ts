import { UserRole } from '../../../../auth/UserRole';

export interface CreateProfileInput {
    role: UserRole;
    given_name: string;
    family_name: string;
    email?: string | null;
    username?: string | null;
    phone_number: string;
    temporary_password: string;
}
