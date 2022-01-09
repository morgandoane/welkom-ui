import { Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import { MdInfo } from 'react-icons/md';

export interface InfoProps {
    children?: string;
    maxWidth?: number;
}

const Info = (props: InfoProps): ReactElement => {
    const { children, maxWidth = 400 } = props;
    const {
        palette: { info },
    } = useTheme();

    return (
        <Box sx={{ display: 'flex', gap: 1, maxWidth }}>
            <Box
                sx={{ display: 'flex', fontSize: '1.25rem', color: info.main }}
            >
                <MdInfo />
            </Box>
            <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="textSecondary">
                    {children}
                </Typography>
            </Box>
        </Box>
    );
};

export default Info;
