import { Box, useMediaQuery, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import ColumnBox, { ColumnBoxProps } from '../../../ColumnBox';

export type NavContentProps = ColumnBoxProps;

const NavContent = (props: NavContentProps): ReactElement => {
    const {
        children: { header, content, footer },
        animate,
    } = props;

    const theme = useTheme();
    const small = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <ColumnBox animate={animate}>
            {{
                header: header ? (
                    <Box
                        sx={{
                            padding: small ? 2 : 4,
                            paddingBottom: small ? 2 : 3,
                            paddingTop: small ? 3 : undefined,
                        }}
                    >
                        {header}
                    </Box>
                ) : undefined,
                content: content ? (
                    <Box
                        sx={{
                            height: '100%',
                            padding: small ? 2 : 4,
                            paddingTop: 0,
                            paddingBottom: 0,
                        }}
                    >
                        {content}
                    </Box>
                ) : undefined,
                footer: footer ? (
                    <Box sx={{ padding: small ? 2 : 4 }}>{footer}</Box>
                ) : undefined,
            }}
        </ColumnBox>
    );
};

export default NavContent;
