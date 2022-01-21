import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    LinearProgress,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdMenu } from 'react-icons/md';

import { AppNavProps } from '../../';
import { fullScreen } from '../../../../styles/fullScreen';
import Message from '../../../Message';

const MobileAppNav = (props: AppNavProps): ReactElement => {
    const { children, error, loading, discrete } = props;

    const { palette } = useTheme();

    return (
        <Box
            sx={{
                ...fullScreen,
                background: palette.background.default,
                color: palette.text.primary,
                display: 'flex',
                flexFlow: 'column',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 1,
                    background: palette.primary.main,
                    color: palette.primary.contrastText,
                }}
            >
                <IconButton>
                    <MdMenu />
                </IconButton>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {loading && discrete && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 8,
                        }}
                    >
                        <LinearProgress />
                    </Box>
                )}
                {error ? (
                    <Message type="Warning" message={error.message} />
                ) : loading && !discrete ? (
                    <Message type="Loading" />
                ) : (
                    children
                )}
            </Box>
        </Box>
    );
};

export default MobileAppNav;
