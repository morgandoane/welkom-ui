import { Box } from '@mui/system';
import React, { ReactElement } from 'react';

export interface FormRowProps {
    children: ReactElement | ReactElement[];
    gap?: number;
}

const FormRow = (props: FormRowProps): ReactElement => {
    const { children, gap = 2 } = props;

    return (
        <Box sx={{ paddingBottom: gap, display: 'flex', gap: 2 }}>
            {children}
        </Box>
    );
};

export default FormRow;
