import { Box, Fab, FabProps, SxProps, useTheme, Theme } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd } from 'react-icons/md';

export interface AppFabProps {
    disabled?: boolean;
    children: string;
    onClick: () => void;
    color?: FabProps['color'];
    icon?: ReactElement | null;
    sx?: SxProps<Theme>;
}

const AppFab = (props: AppFabProps): ReactElement => {
    const {
        disabled = false,
        children,
        icon,
        color = 'primary',
        onClick,
        sx,
    } = props;
    const theme = useTheme();

    return (
        <Fab
            size="large"
            disabled={disabled}
            color={color}
            onClick={onClick}
            sx={{
                position: 'absolute',
                bottom: theme.spacing(6),
                right: theme.spacing(6),

                ...sx,
            }}
            variant="extended"
        >
            {icon !== null && (
                <Box
                    sx={{
                        fontSize: '1.5rem',
                        display: 'flex',
                        paddingRight: 1,
                    }}
                >
                    {icon || <MdAdd />}
                </Box>
            )}
            {children}
        </Fab>
    );
};

export default AppFab;
