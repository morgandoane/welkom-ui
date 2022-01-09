import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import { MdClear } from 'react-icons/md';

export interface PanelHeaderProps {
    onClose?: () => void;
    children: string | [string, string];
}

const PanelHeader = (props: PanelHeaderProps): ReactElement => {
    const { onClose, children } = props;

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 2,
            }}
        >
            {children instanceof Array ? (
                <Box>
                    <Typography sx={{ paddingRight: 4 }} variant="h4">
                        {children[0]}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {children[1]}
                    </Typography>
                </Box>
            ) : (
                <Typography sx={{ paddingRight: 4 }} variant="h4">
                    {children}
                </Typography>
            )}
            {onClose && (
                <IconButton onClick={onClose}>
                    <MdClear />
                </IconButton>
            )}
        </Box>
    );
};

export default PanelHeader;
