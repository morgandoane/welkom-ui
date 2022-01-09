import { useAuth0 } from '@auth0/auth0-react';
import { Permission } from '../auth/Permission';
import { UserRole } from '../auth/UserRole';

const usePermissions = (): {
    permissions: Permission[];
    roles: UserRole[];
} => {
    const { user } = useAuth0();

    if (!user)
        return {
            permissions: [],
            roles: [],
        };

    const permissions = user[
        `${process.env.REACT_APP_AUTH0_NAMESPACE}/permissions`
    ] as Permission[];

    const roles = user[
        `${process.env.REACT_APP_AUTH0_NAMESPACE}/roles`
    ] as UserRole[];

    return {
        roles,
        permissions,
    };
};

export default usePermissions;
