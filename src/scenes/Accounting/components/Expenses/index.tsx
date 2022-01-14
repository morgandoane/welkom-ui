import { Box } from '@mui/material';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import AppNav from '../../../../components/AppNav';
import ExpenseKeyField from '../../../../components/Forms/components/ExpenseKey';
import ColumnBox from '../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../components/PageTitle';
import SmartTable from '../../../../components/SmartTable';
import {
    ExpensesRes,
    useExpenses,
} from '../../../../graphql/queries/expense/useExpenses';
import {
    ExpenseKey,
    expenseLabels,
} from '../../../../graphql/schema/Expense/Expense';
import { ExpenseFilter } from '../../../../graphql/schema/Expense/ExpenseFilter';
import { OperationResult } from '../../../../graphql/types';
import { commafy } from '../../../../utils/commafy';
import { dateFormats } from '../../../../utils/dateFormats';

const filterFromAny = (data: any | null): ExpenseFilter => {
    const filter: ExpenseFilter = { skip: 0, take: 50 };

    if (data) {
        if ('amount' in data) {
            if (!isNaN(data.amount)) {
                filter.amount = data.amount;
            }
        }
        if ('key' in data) {
            if (data.key instanceof String) {
                switch (data.key) {
                    case ExpenseKey.Bol:
                    case ExpenseKey.Itinerary:
                    case ExpenseKey.Order: {
                        filter.key = data.key;
                    }
                }
                filter.amount = data.amount;
            }
        }
    }

    return filter;
};

const Expenses = (): ReactElement => {
    const nav = useNavigate();

    const fromStorage = localStorage.getItem('accounting_expenses_filter');

    const parsed = fromStorage ? JSON.parse(fromStorage) : null;

    const [filter, setFilter] = React.useState<ExpenseFilter>({
        ...filterFromAny(parsed),
    });

    React.useEffect(() => {
        localStorage.setItem(
            'accounting_expenses_filter',
            JSON.stringify(filter)
        );
    }, [filter]);

    const [data, setData] = React.useState<null | OperationResult<ExpensesRes>>(
        null
    );

    const { loading } = useExpenses({
        variables: { filter },
        onCompleted: (data) => setData({ success: true, data }),
        onError: (error) => setData({ success: false, error }),
        fetchPolicy: 'network-only',
    });

    const count = data && data.success ? data.data.expenses.count : 0;
    const expenses = data && data.success ? data.data.expenses.items : [];

    return (
        <AppNav
            loading={loading}
            error={data && data.success == false ? data.error : undefined}
        >
            <ColumnBox>
                {{
                    header: (
                        <Box
                            sx={{ display: 'flex', justifyContent: 'flex-end' }}
                        >
                            <PageTitle>Expenses</PageTitle>
                            <Box sx={{ flex: 1 }} />
                            <Box sx={{ width: 200 }}>
                                <ExpenseKeyField
                                    naked={false}
                                    value={filter.key || null}
                                    onChange={(val) => {
                                        setFilter({
                                            ...filter,
                                            key: val || undefined,
                                        });
                                    }}
                                />
                            </Box>
                        </Box>
                    ),
                    content: (
                        <SmartTable
                            getProps={(d) => ({
                                id: d._id,
                                onClick: () => nav(d._id),
                            })}
                            data={expenses}
                            pagination={{
                                setPage: (p) => {
                                    setFilter({
                                        ...filter,
                                        skip:
                                            p == 1 ? 0 : (p - 1) * filter.take,
                                    });
                                },
                                skip: filter.skip,
                                take: filter.take,
                                count,
                            }}
                        >
                            {{
                                Amount: (e) => '$' + commafy(e.amount),
                                ['Paid by']: (e) => e.customer.name,
                                ['Paid to']: (e) => e.vendor.name,
                                Type: (e) => expenseLabels[e.key],
                                ['Created by']: (e) => e.created_by.name,
                                ['Date created']: (e) =>
                                    format(
                                        new Date(e.date_created),
                                        dateFormats.condensedDate
                                    ),
                            }}
                        </SmartTable>
                    ),
                }}
            </ColumnBox>
        </AppNav>
    );
};

export default Expenses;
