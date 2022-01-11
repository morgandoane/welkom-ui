import { Box, Typography } from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';

export interface PageTitleProps {
    avatar?: ReactElement | ReactNode | ReactElement[];
    children: string | [string, string];
}

const PageTitle = (props: PageTitleProps): ReactElement => {
    const { children, avatar } = props;

    if (children instanceof Array)
        return (
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexFlow: 'row',
                        paddingBottom: 2,
                        gap: 2,
                    }}
                >
                    {avatar && <Box sx={{ display: 'flex' }}>{avatar}</Box>}
                    <Typography variant="crisp">{children[0]}</Typography>
                </Box>
                <Typography
                    sx={{ paddingBottom: 2 }}
                    variant="body1"
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
                    paddingBottom: 2,
                    gap: 2,
                }}
            >
                {avatar && <Box sx={{ display: 'flex' }}>{avatar}</Box>}
                <Typography variant="crisp">{children}</Typography>
            </Box>
        );
};

export default PageTitle;
