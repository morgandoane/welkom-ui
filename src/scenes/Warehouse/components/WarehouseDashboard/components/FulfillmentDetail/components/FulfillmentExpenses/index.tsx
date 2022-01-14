import { Box, Button } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd } from 'react-icons/md';
import ExpenseDialog from '../../../../../../../../components/ExpenseDialog';
import ExpensePreview from '../../../../../../../../components/ExpensePreview';
import { BolQuery } from '../../../../../../../../graphql/queries/bols/useBol';
import { BolsQuery } from '../../../../../../../../graphql/queries/bols/useBols';
import {
    ExpensesQuery,
    useExpenses,
} from '../../../../../../../../graphql/queries/expense/useExpenses';
import { FulfillmentQuery } from '../../../../../../../../graphql/queries/fulfillment/useFulfillment';
import { ExpenseKey } from '../../../../../../../../graphql/schema/Expense/Expense';
import { Fulfillment } from '../../../../../../../../graphql/schema/Fulfillment/Fulfillment';

export interface FulfillmentExpensesProps {
    fulfillment: Fulfillment;
}

const FulfillmentExpenses = (props: FulfillmentExpensesProps): ReactElement => {
    const { fulfillment } = props;

    const [target, setTarget] = React.useState<null | true | string>(null);

    const { data, error, loading } = useExpenses({
        variables: {
            filter: {
                key: ExpenseKey.Bol,
                against: fulfillment.bol._id,
                skip: 0,
                take: 250,
            },
        },
    });

    return (
        <Box sx={{ paddingTop: 2 }}>
            <ExpensePreview
                expenses={data ? data.expenses.items : []}
                onClick={(d) => setTarget(d._id)}
            />
            <Box p={2} />
            <Button onClick={() => setTarget(true)} startIcon={<MdAdd />}>
                Add expense
            </Button>
            <ExpenseDialog
                customer={fulfillment.bol.to.company._id}
                vendor={fulfillment.bol.from.company._id}
                expense_key={ExpenseKey.Bol}
                against={fulfillment.bol._id}
                target={target}
                onClose={() => setTarget(null)}
                refetchQueries={[FulfillmentQuery, BolQuery, ExpensesQuery]}
            />
        </Box>
    );
};

export default FulfillmentExpenses;
