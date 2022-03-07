import { Box, Divider, styled, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';

export interface FocusedLineProps {
    focused: boolean;
}

const FocusedLine = (props: FocusedLineProps): ReactElement => {
    const { focused } = props;
    const { palette, transitions } = useTheme();
    return (
        <Box
            sx={{
                position: 'relative',
                height: '1px',
                paddingBottom: 0.1,
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    width: focused ? '100%' : 0,
                    height: focused ? '2px' : '1px',
                    background: palette.primary.main,
                    zIndex: 10,
                    transition: transitions.create('all', { duration: 250 }),
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    width: '100%',
                    background: palette.text.disabled,
                }}
            />
        </Box>
    );
};

export default FocusedLine;
