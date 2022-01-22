import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';

export interface PageTitleProps {
    avatar?: ReactElement | ReactNode | ReactElement[];
    children: string | [string, string];
}

const PageTitle = (props: PageTitleProps): ReactElement => {
    const { children, avatar } = props;

    const theme = useTheme();
    const small = useMediaQuery(theme.breakpoints.down('sm'));

    if (children instanceof Array)
        return (
            <Box sx={{ padding: small ? 2 : undefined }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexFlow: 'row',
                        paddingBottom: 0.5,
                        gap: 2,
                    }}
                >
                    <Typography variant="crisp">{children[0]}</Typography>
                    {avatar && <Box sx={{ display: 'flex' }}>{avatar}</Box>}
                </Box>
                <Typography
                    sx={{ paddingBottom: small ? 0 : 2, fontWeight: 400 }}
                    variant="h6"
                    color="textSecondary"
                >
                    {children[1]}
                </Typography>
            </Box>
        );
    else
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexFlow: 'row',
                    gap: 2,
                    padding: small ? 2 : undefined,
                    paddingBottom: small ? 0 : 2,
                }}
            >
                <Typography variant="crisp">{children}</Typography>
                {avatar && <Box sx={{ display: 'flex' }}>{avatar}</Box>}
            </Box>
        );
};

export default PageTitle;
