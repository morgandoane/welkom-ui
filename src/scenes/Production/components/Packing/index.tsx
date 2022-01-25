import { Typography, ButtonBase, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import AppNav from '../../../../components/AppNav';
import PageTitle from '../../../../components/PageTitle';
import { typography } from '../../../../providers/TypefaceProvider/typography';

const Packing = (): ReactElement => {
    const { palette, typography } = useTheme();
    return (
        <AppNav>
            <PageTitle>Packing</PageTitle>
            <Typography
                variant="h6"
                color="textSecondary"
                sx={{
                    marginTop: -1,
                    paddingBottom: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                }}
            >
                {`To create a new pallet, head to `}{' '}
                <ButtonBase
                    onClick={() => {
                        window.open('https://packing.ldbbakery.com', '_blank');
                    }}
                    sx={{
                        ...typography.h6,
                        color: palette.primary.main,
                    }}
                >
                    packing.ldbbakery.com
                </ButtonBase>
            </Typography>
        </AppNav>
    );
};

export default Packing;
