import React, { ReactElement } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from '@emotion/react';
import { responsiveFontSizes } from '@mui/material';
import { getTheme } from '../AppThemeProvider';

const AuthProvider = (props: { children: ReactElement }): ReactElement => {
    const fromStorage = localStorage.getItem('theme');
    const theme = getTheme(fromStorage == 'light' ? 'light' : 'dark');
    return (
        <ThemeProvider theme={responsiveFontSizes(theme)}>
            <Auth0Provider
                domain={process.env.REACT_APP_AUTH0_DOMAIN + ''}
                clientId={process.env.REACT_APP_CLIENT_ID + ''}
                redirectUri={window.location.origin}
                audience={process.env.REACT_APP_AUTH0_NAMESPACE + ''}
            >
                {props.children}
            </Auth0Provider>
        </ThemeProvider>
    );
};

export default AuthProvider;
