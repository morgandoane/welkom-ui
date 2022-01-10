import { useAuth0 } from '@auth0/auth0-react';
import React, { ReactElement } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import usePermissions from '../../../auth/usePermissions';
import { UserRole } from '../../../auth/UserRole';
import { useIndexRoute } from '../../router';

const ManagerRoute = (props: {
    children: ReactElement | ReactElement[];
}): ReactElement => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();
    const { roles } = usePermissions();
    const { path } = useIndexRoute();

    React.useEffect(() => {
        if (!isAuthenticated) navigate('/login');
    }, [isAuthenticated, navigate]);

    if (!roles.includes(UserRole.Admin) && !roles.includes(UserRole.Manager))
        return <Navigate to={path} />;

    return <React.Fragment>{props.children}</React.Fragment>;
};

export default ManagerRoute;
