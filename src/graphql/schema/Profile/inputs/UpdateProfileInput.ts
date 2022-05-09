import { UserRole } from '../../../../auth/UserRole';

export interface UpdateProfileInput {
    role: UserRole;
    given_name: string;
    family_name: string;
    email?: string;
    username?: string;
    password?: string;
    blocked?: boolean;
}
