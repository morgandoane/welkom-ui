import React, { ReactElement } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../Loading';

const Logout = (): ReactElement => {
    const { logout } = useAuth0();

    logout({
        client_id: process.env.REACT_APP_CLIENT_ID,
    });

    return <Loading message="Logging out" />;
};

export default Logout;
