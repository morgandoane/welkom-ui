import { useAuth0 } from '@auth0/auth0-react';
import React, { ReactElement } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import usePermissions from '../../../auth/usePermissions';
import { UserRole } from '../../../auth/UserRole';
import { useIndexRoute } from '../../router';

const AdminRoute = (props: {
    children: ReactElement | ReactElement[];
}): ReactElement => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();
    const { roles } = usePermissions();
    const { path } = useIndexRoute();

    if (!isAuthenticated) return <Navigate to={'/login'} />;
    if (!roles.includes(UserRole.Admin)) return <Navigate to={path} />;

    return <React.Fragment>{props.children}</React.Fragment>;
};

export default AdminRoute;
