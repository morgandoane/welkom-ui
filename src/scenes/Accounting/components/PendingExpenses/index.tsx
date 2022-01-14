import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import AppNav from '../../../../components/AppNav';
import ColumnBox from '../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../components/PageTitle';
import TabFade from '../../../../components/TabFade';

const PendingExpenses = (): ReactElement => {
    return (
        <AppNav>
            <ColumnBox>
                {{
                    header: (
                        <Box>
                            <PageTitle>
                                {[
                                    'Pending Expenses',
                                    'To achieve accurate reporting, certain expenses need to be categorized.',
                                ]}
                            </PageTitle>
                        </Box>
                    ),
                    content: (
                        <TabFade>
                            {{
                                Procurement: <Box></Box>,
                                Transportation: <Box></Box>,
                            }}
                        </TabFade>
                    ),
                }}
            </ColumnBox>
        </AppNav>
    );
};

export default PendingExpenses;
