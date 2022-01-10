import { useAuth0 } from '@auth0/auth0-react';
import React, { ReactElement } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const AuthenticatedRoute = (props: {
    children: ReactElement | ReactElement[];
}): ReactElement => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();

    if (!isAuthenticated) return <Navigate to={'/login'} />;
    return <React.Fragment>{props.children}</React.Fragment>;
};

export default AuthenticatedRoute;
