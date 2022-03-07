import { Box } from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';

export interface FormRowProps {
    children?: ReactNode | ReactNode[];
    p?: number;
}

const FormRow = (props: FormRowProps): ReactElement => {
    const { children, p = 2 } = props;

    return (
        <Box
            sx={{
                display: 'flex',
                paddingBottom: p,
                alignItems: 'flex-end',
                gap: 2,
            }}
        >
            {children}
        </Box>
    );
};

export default FormRow;
