import { Box, LinearProgress, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { AppNavProps } from '..';
import Message from '../../../../feedback/Message';
import Sidebar from './components/Sidebar';

const DesktopAppNav = (props: AppNavProps): ReactElement => {
    const {} = props;

    const { palette, shape } = useTheme();

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'stretch',
                color: palette.text.primary,
            }}
        >
            <Sidebar />
            <Box
                sx={{
                    flex: 1,
                    background: palette.background.default,
                    overflow: 'hidden',
                    display: 'flex',
                    flexFlow: 'column',
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
        </Box>
    );
};

export default DesktopAppNav;
