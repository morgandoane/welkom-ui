import { useAuth0 } from '@auth0/auth0-react';
import {
    Box,
    Collapse,
    IconButton,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdChevronRight, MdDarkMode, MdLightMode } from 'react-icons/md';
import { useThemeContext } from '../../../../../../../providers/AppThemeProvider';
import Logo from '../../../../../../display/Logo';
import Anima from '../../../../../Anima';
import { useNavRoutes } from '../../../../routes';
import NavChip from './components/NavChip';

const Sidebar = (): ReactElement => {
    const { palette, breakpoints, transitions } = useTheme();
    const small = useMediaQuery(breakpoints.down('sm'));
    const { user } = useAuth0();
    const { mode, setMode } = useThemeContext();

    const fromStorage = localStorage.getItem('navOpen');

    const [open, setOpen] = React.useState(
        fromStorage == 'true' ? true : false
    );

    React.useEffect(() => {
        localStorage.setItem('navOpen', open ? 'true' : 'false');
    }, [open]);

    const routes = useNavRoutes();

    return (
        <Box
            sx={{
                transition: transitions.create('width', { duration: 300 }),
                height: small ? '100%' : undefined,
                width: open ? '200px' : '45px',
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
                <Logo height={!open ? 60 : 120} />
                <Box p={0.5} />
                <Collapse in={open} orientation="horizontal">
                    <Typography sx={{ whiteSpace: 'nowrap' }}>
                        {user
                            ? user.given_name && user.family_name
                                ? `${user.given_name} ${user.family_name}`
                                : user.name
                            : ''}
                    </Typography>
                </Collapse>
            </Box>

            {Object.keys(routes).map((key) => {
                const route = routes[key];
                return (
                    <NavChip
                        key={key}
                        label={key}
                        data={route}
                        open={open || small}
                        setOpen={(o) => setOpen(o)}
                    />
                );
            })}
            <Box sx={{ flex: 1 }} />
            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'column',
                    gap: 1,
                    alignItems: 'center',
                }}
            >
                <Tooltip
                    placement="right"
                    arrow
                    title={mode == 'dark' ? 'Dark mode' : 'Light mode'}
                >
                    <IconButton
                        onClick={() =>
                            setMode(mode == 'dark' ? 'light' : 'dark')
                        }
                    >
                        {mode == 'dark' ? <MdDarkMode /> : <MdLightMode />}
                    </IconButton>
                </Tooltip>
                <Tooltip
                    placement="right"
                    arrow
                    title={open ? 'Collape sidebar' : 'Open sidebar'}
                >
                    <IconButton onClick={() => setOpen(!open)}>
                        <Anima type="rotate" in={open}>
                            <Box sx={{ display: 'flex' }}>
                                <MdChevronRight />
                            </Box>
                        </Anima>
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default Sidebar;
