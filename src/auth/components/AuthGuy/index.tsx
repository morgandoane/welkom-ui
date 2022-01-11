import React, { ReactElement, ReactNode } from 'react';
import { UiPermission, UiPermissions } from '../../UiPermission';
import usePermissions from '../../usePermissions';
import { UserRole } from '../../UserRole';

export interface AuthGuyProps {
    children: ReactElement | null;
    permission: UiPermission;
}

const AuthGuy = (props: AuthGuyProps): ReactElement | null => {
    const { permission, children } = props;

    const { permissions, roles } = usePermissions();

    const match = UiPermissions.find((p) => p.name === permission);

    if (
        (match &&
            (match.permissions.every((p) => permissions.includes(p)) ||
                roles.includes(UserRole.Manager))) ||
        roles.includes(UserRole.Admin)
    )
        return children;

    return null;
};

export default AuthGuy;
