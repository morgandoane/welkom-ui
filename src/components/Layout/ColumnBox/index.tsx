import { Box } from '@mui/system';
import React, { ReactElement } from 'react';

export interface ColumnBoxProps {
    children: {
        header?: ReactElement;
        content?: ReactElement;
        footer?: ReactElement;
    };
}

const ColumnBox = (props: ColumnBoxProps): ReactElement => {
    const { children } = props;

    return (
        <Box sx={{ height: '100%', display: 'flex', flexFlow: 'column' }}>
            {children.header && <Box>{children.header}</Box>}
            <Box sx={{ flex: 1, overflow: 'auto' }}>{children.content}</Box>
            {children.footer && <Box>{children.footer}</Box>}
        </Box>
    );
};

export default ColumnBox;
