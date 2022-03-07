import { useAuth0 } from '@auth0/auth0-react';
import {
    Box,
    Button,
    ButtonBase,
    Divider,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useThemeContext } from '../../../../../../../providers/AppThemeProvider';
import Logo from '../../../../../../display/Logo';
import { useNavRoutes } from '../../../../routes';
import NavChip from './components/NavChip';

const Sidebar = (): ReactElement => {
    const { palette, breakpoints } = useTheme();
    const small = useMediaQuery(breakpoints.down('sm'));
    const { user } = useAuth0();
    const { mode, setMode } = useThemeContext();

    const routes = useNavRoutes();

    return (
        <Box
            sx={{
                height: small ? '100%' : undefined,
                alignItems: 'flex-start',
                display: 'flex',
                flexShrink: 1,
                background: palette.background.paper,
                flexFlow: 'column',
                padding: 2.5,
                gap: 0.25,
                borderRight:
                    palette.mode == 'dark'
                        ? undefined
                        : `1px solid ${palette.divider}`,
                overflow: 'auto',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexFlow: 'column',
                    justifyContent: 'center',
                    width: '100%',
                    paddingBottom: 1,
                    paddingTop: 1.5,
                }}
            >
                <Logo height={120} />
                <Box p={0.5} />
                <Typography>
                    {user
                        ? user.given_name && user.family_name
                            ? `${user.given_name} ${user.family_name}`
                            : user.name
                        : ''}
                </Typography>
            </Box>

            {Object.keys(routes).map((key) => {
                const route = routes[key];
                return <NavChip key={key} label={key} data={route} />;
            })}
            <Box sx={{ flex: 1 }} />
            <Box sx={{ width: '100%' }}>
                <Button
                    onClick={() => setMode(mode == 'dark' ? 'light' : 'dark')}
                    startIcon={
                        mode == 'dark' ? <MdDarkMode /> : <MdLightMode />
                    }
                    variant="text"
                    fullWidth
                >
                    Theme
                </Button>
            </Box>
        </Box>
    );
};

export default Sidebar;
