import { useAuth0 } from '@auth0/auth0-react';
import { Button, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUiPermissions } from '../../auth/UiPermission';
import usePermissions from '../../auth/usePermissions';
import Logo from '../../components/display/Logo';
import { useIndexRoute } from '../../routing/router';

const NoPermissions = (): ReactElement => {
    const { path } = useIndexRoute();
    const { palette, shape } = useTheme();
    const { user } = useAuth0();
    const nav = useNavigate();
    if (!user || path !== '/nopermissions') return <Navigate to={path} />;
    return (
        <Box
            sx={{
                height: '100vh',
                background: palette.background.default,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexFlow: 'column',
                color: palette.text.primary,
                gap: 4,
            }}
        >
            <Logo height={120} />
            <Typography variant="h3">
                Hey {user.given_name ? `${user.given_name} ` : user.name}
            </Typography>
            <Typography variant="h6" color="textSecondary">
                {"It looks like you haven't been assigned to a team yet."}
            </Typography>
            <Button onClick={() => nav('/logout')}>Logout</Button>
        </Box>
    );
};

export default NoPermissions;
