import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import { Expensed } from '../../../../graphql/schema/Expensed/Expensed';
import Message from '../../../feedback/Message';

export interface ExpensesTabProps<T extends Expensed> {
    data: T;
}

const ExpensesTab = <T extends Expensed>(
    props: ExpensesTabProps<T>
): ReactElement => {
    const { data } = props;

    return (
        <Box sx={{ height: '100%' }}>
            <Message type="No Data" message="No expenses yet" />
        </Box>
    );
};

export default ExpensesTab;
