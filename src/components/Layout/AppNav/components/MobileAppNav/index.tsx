import {
    Box,
    Drawer,
    IconButton,
    LinearProgress,
    Typography,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdMenu } from 'react-icons/md';
import { AppNavProps } from '..';
import Message from '../../../../feedback/Message';
import Sidebar from '../DesktopAppNav/components/Sidebar';

const MobileAppNav = (props: AppNavProps): ReactElement => {
    const {} = props;
    const [open, setOpen] = React.useState(false);
    const { palette, shadows } = useTheme();

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexFlow: 'column',
                color: palette.text.primary,
            }}
        >
            <Box
                sx={{
                    background: palette.background.paper,
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    boxShadow: palette.mode == 'dark' ? undefined : shadows[4],
                    zIndex: 10,
                    gap: 2,
                }}
            >
                <Box>
                    <IconButton onClick={() => setOpen(!open)}>
                        <MdMenu />
                    </IconButton>
                </Box>
                <Box>
                    <Typography variant="h3">LDB</Typography>
                </Box>
                <Box sx={{ flex: 1 }} />
                <Box></Box>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    background: palette.background.default,
                    overflow: 'hidden',
                }}
            >
                {props.loading && (
                    <Box
                        sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}
                    >
                        <LinearProgress />
                    </Box>
                )}
                {props.error ? (
                    <Message type="Error" message={props.error.message} />
                ) : (
                    props.children
                )}
            </Box>
            <Drawer
                PaperProps={{
                    sx: {
                        background: palette.background.paper,
                        height: '100%',
                        overflow: 'hidden',
                    },
                }}
                anchor="left"
                open={open}
                onClose={() => setOpen(false)}
            >
                <Sidebar />
            </Drawer>
        </Box>
    );
};

export default MobileAppNav;
