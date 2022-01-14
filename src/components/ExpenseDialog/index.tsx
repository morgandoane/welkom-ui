import { InternalRefetchQueriesInclude } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import React, { ReactElement } from 'react';
import { useExpense } from '../../graphql/queries/expense/useExpense';
import {
    CreateExpenseRes,
    useExpenseCreation,
} from '../../graphql/queries/expense/useExpenseCreation';
import {
    UpdateExpenseRes,
    useExpenseUpdate,
} from '../../graphql/queries/expense/useExpenseUpdate';
import { ExpenseKey } from '../../graphql/schema/Expense/Expense';
import {
    CreateExpenseInput,
    UpdateExpenseInput,
} from '../../graphql/schema/Expense/ExpenseInput';
import { OperationResult } from '../../graphql/types';
import CarefulButton from '../Forms/CarefulButton';
import ExpenseForm from '../Forms/ExpenseForm';
import Message from '../Message';
import PanelHeader from '../PanelComponents/PanelHeader';
import ResponsiveDialog from '../ResponsiveDialog';

export interface ExpenseDialogProps {
    expense_key: ExpenseKey;
    against: string;
    target: true | string | null;
    onClose: () => void;
    refetchQueries?: InternalRefetchQueriesInclude;
}

const ExpenseDialog = (props: ExpenseDialogProps): ReactElement => {
    const {
        expense_key: key,
        target,
        against,
        refetchQueries,
        onClose,
    } = props;

    const [state, setState] = React.useState<
        | ({ _type: 'update' } & UpdateExpenseInput)
        | ({ _type: 'create' } & CreateExpenseInput)
    >({
        _type: 'create',
        customer: '',
        vendor: '',
        amount: 0,
        key: key,
        against,
    });

    const { error, loading: expenseLoading } = useExpense({
        variables:
            target !== null && target !== true ? { id: target } : undefined,
        onCompleted: ({ expense }) => {
            setState({
                _type: 'update',
                customer: expense.customer._id,
                vendor: expense.vendor._id,
                invoice: expense.invoice || undefined,
                amount: expense.amount,
                note: expense.note || undefined,
            });
        },
        skip: target == null || target == true,
        fetchPolicy: 'network-only',
    });

    const { _type, ...rest } = state;

    const [result, setResult] = React.useState<null | OperationResult<
        CreateExpenseRes | UpdateExpenseRes
    >>(null);

    const [create, { loading: createLoading }] = useExpenseCreation({
        variables:
            state._type == 'create'
                ? {
                      data: {
                          customer: state.customer,
                          vendor: state.vendor,
                          amount: state.amount,
                          note: state.note,
                          invoice: state.invoice,
                          key: state.key,
                          against,
                      },
                  }
                : undefined,
        refetchQueries,
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
    });

    const [update, { loading: updateLoading }] = useExpenseUpdate({
        variables:
            state._type == 'update' && target !== null && target !== true
                ? {
                      id: target,
                      data: {
                          customer: state.customer,
                          vendor: state.vendor,
                          amount: state.amount,
                          note: state.note,
                      },
                  }
                : undefined,
        refetchQueries,
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
    });

    const submit = () => {
        if (state._type == 'create') {
            create();
        } else {
            update();
        }
    };

    const loading = expenseLoading || createLoading || updateLoading;

    const handleClose = () => {
        setResult(null);
        onClose();
    };

    return (
        <ResponsiveDialog open={Boolean(target)} onClose={handleClose}>
            {result && result.success ? (
                <Message
                    type="Success"
                    message="Expense saved"
                    onComplete={handleClose}
                />
            ) : result ? (
                <Message
                    type="Warning"
                    message={result.error.message}
                    action={
                        <Button onClick={() => setResult(null)}>
                            Try again
                        </Button>
                    }
                />
            ) : (
                <Box>
                    <PanelHeader onClose={handleClose}>Expense</PanelHeader>
                    <ExpenseForm
                        value={rest}
                        onChange={(d) => {
                            setState({ ...state, ...d });
                        }}
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {_type == 'update' && (
                            <CarefulButton
                                loading={loading}
                                onClick={() => {
                                    if (target !== null && target !== true)
                                        update({
                                            variables: {
                                                id: target,
                                                data: { deleted: true },
                                            },
                                            refetchQueries,
                                        });
                                }}
                            >
                                Delete Expense
                            </CarefulButton>
                        )}
                        <LoadingButton
                            onClick={submit}
                            loading={loading}
                            fullWidth
                            variant="contained"
                        >
                            Save
                        </LoadingButton>
                    </Box>
                </Box>
            )}
        </ResponsiveDialog>
    );
};

export default ExpenseDialog;
