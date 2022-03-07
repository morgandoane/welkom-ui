import { Box, Fab, FabProps, useMediaQuery, useTheme } from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';

export interface AppFabProps extends FabProps {
    absolute?: boolean;
    icon?: ReactNode;
}

const AppFab = (props: AppFabProps): ReactElement => {
    const { absolute, icon, ...rest } = props;

    const { spacing, breakpoints } = useTheme();
    const small = useMediaQuery(breakpoints.down('sm'));

    return (
        <Fab
            variant="extended"
            color="primary"
            sx={
                absolute
                    ? small
                        ? {
                              position: 'absolute',
                              bottom: spacing(4),
                              right: spacing(4),
                              zIndex: 10,
                          }
                        : {
                              position: 'absolute',
                              bottom: spacing(10),
                              right: spacing(10),
                              zIndex: 10,
                          }
                    : undefined
            }
            {...rest}
        >
            <Box
                sx={{
                    display: 'flex',
                    fontSize: '1.25rem',
                    paddingRight: 1,
                }}
            >
                {icon}
            </Box>

            <Box sx={{ paddingRight: 1 }}>{props.children}</Box>
        </Fab>
    );
};

export default AppFab;
