import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import AppNav from '../../../../components/AppNav';
import ColumnBox from '../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../components/PageTitle';

const AccountingReports = (): ReactElement => {
    return (
        <AppNav>
            <ColumnBox>
                {{
                    header: (
                        <Box>
                            <PageTitle>Reports</PageTitle>
                        </Box>
                    ),
                    content: <Box></Box>,
                }}
            </ColumnBox>
        </AppNav>
    );
};

export default AccountingReports;
