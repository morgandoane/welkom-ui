import {
    Box,
    Button,
    CircularProgress,
    Collapse,
    Typography,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd, MdEdit, MdExpandMore } from 'react-icons/md';
import Anima from '../../../../../../../../components/Anima';
import ExpenseDialog from '../../../../../../../../components/ExpenseDialog';
import {
    ExpensesQuery,
    useExpenses,
} from '../../../../../../../../graphql/queries/expense/useExpenses';
import { FulfillmentQuery } from '../../../../../../../../graphql/queries/fulfillment/useFulfillment';
import { ExpenseKey } from '../../../../../../../../graphql/schema/Expense/Expense';
import { Fulfillment } from '../../../../../../../../graphql/schema/Fulfillment/Fulfillment';
import { commafy } from '../../../../../../../../utils/commafy';

export interface FulfillmentExpensesProps {
    fulfillment: Fulfillment;
}

const FulfillmentExpenses = (props: FulfillmentExpensesProps): ReactElement => {
    const { fulfillment } = props;

    const { shape, palette } = useTheme();

    const [expanded, setExpanded] = React.useState(false);

    const [target, setTarget] = React.useState<null | {
        against: string;
        expense?: string;
        customer: string;
        vendor: string;
    }>(null);

    const lotIds = fulfillment.lots.map((lot) => lot._id);

    const { data, error, loading } = useExpenses({
        variables: {
            filter: {
                key: ExpenseKey.Lot,
                against: lotIds,
                skip: 0,
                take: 250,
            },
        },
    });

    const expenses = data ? data.expenses.items : [];

    return (
        <Box sx={{ paddingTop: 2, display: 'flex', gap: 2 }}>
            <Box
                sx={{
                    flex: 1,
                }}
            >
                {fulfillment.lots.map((lot, i) => {
                    const match =
                        expenses.find((e) => e.against === lot._id) || null;
                    return (
                        <Box
                            key={'exp_' + lot._id}
                            sx={{
                                borderBottom:
                                    i == fulfillment.lots.length - 1
                                        ? undefined
                                        : `1px solid ${palette.divider}`,

                                border: `1px solid ${palette.divider}`,
                                ...shape,
                            }}
                        >
                            <Box p={2}>
                                <Typography
                                    variant="h4"
                                    color={match ? undefined : 'textDisabled'}
                                >
                                    {loading ? (
                                        <CircularProgress />
                                    ) : match ? (
                                        `$${commafy(match.amount)}`
                                    ) : (
                                        '$0'
                                    )}
                                </Typography>
                                <Box p={1} />
                                <Typography>{lot.item.english}</Typography>
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                >
                                    {match
                                        ? `Paid by ${match.customer.name} to ${match.vendor.name}`
                                        : 'Not yet expensed'}
                                </Typography>
                            </Box>
                            <Box
                                p={1}
                                sx={{ background: palette.background.paper }}
                            >
                                <Collapse in={expanded}>
                                    <Box p={1}></Box>
                                </Collapse>
                                {!match ? (
                                    <Button
                                        onClick={() =>
                                            setTarget({
                                                against: lot._id,
                                                customer:
                                                    fulfillment.bol.to.company
                                                        ._id,
                                                vendor: fulfillment.bol.from
                                                    .company._id,
                                            })
                                        }
                                        size="small"
                                        variant="text"
                                    >
                                        Expense this item
                                    </Button>
                                ) : (
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                            color="inherit"
                                            onClick={() =>
                                                setExpanded(!expanded)
                                            }
                                            size="small"
                                            variant="text"
                                            endIcon={
                                                <Anima
                                                    in={expanded}
                                                    type="rotate"
                                                >
                                                    <Box
                                                        sx={{ display: 'flex' }}
                                                    >
                                                        <MdExpandMore />
                                                    </Box>
                                                </Anima>
                                            }
                                        >
                                            Details
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                setTarget({
                                                    against: lot._id,
                                                    customer:
                                                        fulfillment.bol.to
                                                            .company._id,
                                                    vendor: fulfillment.bol.from
                                                        .company._id,
                                                    expense: match._id,
                                                })
                                            }
                                            size="small"
                                            variant="text"
                                            endIcon={<MdEdit />}
                                        >
                                            Edit expense
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    );
                })}
            </Box>
            <ExpenseDialog
                expense_key={ExpenseKey.Lot}
                onClose={() => setTarget(null)}
                against={target ? target.against : null}
                expense={target ? target.expense || null : null}
                vendor={target?.vendor || ''}
                customer={target?.customer || ''}
                refetchQueries={[FulfillmentQuery, ExpensesQuery]}
            />
        </Box>
    );
};

export default FulfillmentExpenses;
