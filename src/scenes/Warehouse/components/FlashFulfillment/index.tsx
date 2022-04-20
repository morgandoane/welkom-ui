import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import AppNav from '../../../../components/AppNav';
import ColumnBox from '../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../components/PageTitle';

const FlashFulfillment = (): ReactElement => {
    return (
        <AppNav>
            <ColumnBox>
                {{
                    header: (
                        <PageTitle>
                            {[
                                'Flash Receipt',
                                'Receive unscheduled shipments on the fly',
                            ]}
                        </PageTitle>
                    ),
                    content: <Box></Box>,
                }}
            </ColumnBox>
        </AppNav>
    );
};

export default FlashFulfillment;
