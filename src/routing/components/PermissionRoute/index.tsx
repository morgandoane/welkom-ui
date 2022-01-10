import { useAuth0 } from '@auth0/auth0-react';
import React, { ReactElement } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
    UiPermission,
    UiPermissionData,
    UiPermissions,
} from '../../../auth/UiPermission';
import usePermissions from '../../../auth/usePermissions';
import { UserRole } from '../../../auth/UserRole';
import { useIndexRoute } from '../../router';

const PermissionRoute = (props: {
    children: ReactElement | ReactElement[];
    permission: UiPermission;
}): ReactElement => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();
    const { permissions, roles } = usePermissions();

    const { path } = useIndexRoute();

    if (!isAuthenticated) return <Navigate to={'/login'} />;

    if (!roles.includes(UserRole.Admin) && !roles.includes(UserRole.Manager)) {
        const data = UiPermissions.find((d) => d.name === props.permission);
        if (!data) navigate(path);
        else {
            if (!data.permissions.every((p) => permissions.includes(p)))
                navigate(path);
        }
    }

    return <React.Fragment>{props.children}</React.Fragment>;
};

export default PermissionRoute;
