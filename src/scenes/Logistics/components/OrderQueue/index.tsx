import { Button, Fab, Tooltip, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import { MdAdd, MdCheck } from 'react-icons/md';
import AppNav from '../../../../components/AppNav';
import ColumnBox from '../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../components/PageTitle';
import { OrderQueueContentInput } from '../../../../graphql/schema/OrderQueue/OrderQueueInput';
import {
    OrderQueueQuery,
    useOrderQueue,
} from '../../../../graphql/queries/orderQueue/useOrderQueue';
import ItemDrawer from './components/ItemDrawer';
import OrderQueueTable from './components/OrderQueueTable';
import { useOrderQueueUpdate } from '../../../../graphql/mutations/orderQueue/updateOrderQueue';
import Message from '../../../../components/Message';
import {
    ProcessOrderQueueRes,
    useOrderQueueProcess,
} from '../../../../graphql/mutations/orderQueue/processOrderQueue';
import { OperationResult } from '../../../../graphql/types';
import { addDays, setHours, setMinutes } from 'date-fns';

const threshold = 1500;

const OrderQueue = (): ReactElement => {
    const { palette } = useTheme();
    const [contents, setContents] = React.useState<OrderQueueContentInput[]>(
        []
    );

    const [open, setOpen] = React.useState(false);

    const [timer, setTimer] = React.useState<null | number>(null);

    const { error, refetch } = useOrderQueue({
        onCompleted: (data) => {
            if (data.orderQueue)
                setContents(
                    data.orderQueue.contents.map((c) => ({
                        vendor: c.vendor ? c.vendor._id : undefined,
                        vendor_location: c.vendor_location
                            ? c.vendor_location._id
                            : undefined,
                        order_code: c.order_code || undefined,
                        item: c.item ? c.item._id : undefined,
                        quantity: c.quantity !== null ? c.quantity : undefined,
                        unit: c.unit ? c.unit._id : undefined,
                        location: c.location ? c.location._id : undefined,
                        date: c.date ? new Date(c.date) : undefined,
                    }))
                );
        },
        fetchPolicy: 'network-only',
    });

    const [update, { loading: updateLoading }] = useOrderQueueUpdate({
        variables: {
            contents,
        },
    });

    const [result, setResult] =
        React.useState<null | OperationResult<ProcessOrderQueueRes>>(null);

    const [process, { loading: processing }] = useOrderQueueProcess({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
        variables: {
            contents,
        },
    });

    React.useEffect(() => {
        if (timer !== 0 && timer !== null) {
            const timeout = setTimeout(() => {
                setTimer(timer - threshold / 5);
            }, threshold / 5);

            return () => clearTimeout(timeout);
        } else if (timer !== null) {
            setTimer(null);
            update();
        }
    }, [timer]);

    const getHoldup = (): string | null => {
        const errs = [];
        for (const content of contents) {
            if (!content.vendor) errs.push('Each order requires a vendor.');
            if (!content.location)
                errs.push('Each order requires a destination.');
            if (!content.date)
                errs.push('Each order requires a delivery date.');
            if (!content.item) errs.push('Each order requires an item.');
            if (!content.order_code) errs.push('Each order requires a PO.');
            if (!content.quantity || !content.unit)
                errs.push('Each order requires a unit and quantity.');
        }
        if (errs[0]) return errs[0];
        return null;
    };

    const holdup = getHoldup();

    return (
        <AppNav loading={processing} error={error}>
            {result && result.success ? (
                <Message
                    type="Success"
                    message={'Order queue processed'}
                    onComplete={() => {
                        setResult(null);
                        setContents([]);
                        refetch();
                    }}
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
                <ColumnBox>
                    {{
                        header: (
                            <Box sx={{ paddingBottom: 2 }}>
                                <PageTitle>Order Queue </PageTitle>
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                >
                                    Each line in the queue will produce a linked
                                    Order, Itinerary, and BOL.
                                </Typography>
                            </Box>
                        ),
                        content: (
                            <OrderQueueTable
                                contents={contents}
                                setContents={(data) => {
                                    setTimer(threshold);
                                    setContents(data);
                                }}
                            />
                        ),
                        footer: (
                            <Box sx={{ display: 'flex' }}>
                                <Box>
                                    {updateLoading || Boolean(timer) ? (
                                        <Message type="Loading" size={40} />
                                    ) : timer == 0 ? (
                                        <Message type="Success" size={40} />
                                    ) : (
                                        ''
                                    )}
                                </Box>
                                <Box sx={{ flex: 1 }} />
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Fab
                                        variant="extended"
                                        color="primary"
                                        onClick={() => setOpen(true)}
                                        disabled={processing}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                fontSize: '1.5rem',
                                                paddingRight: 1,
                                            }}
                                        >
                                            <MdAdd />
                                        </Box>
                                        Item
                                    </Fab>
                                    <Tooltip
                                        arrow
                                        placement="top"
                                        title={holdup || ''}
                                    >
                                        <Box>
                                            <Fab
                                                disabled={
                                                    Boolean(holdup) ||
                                                    processing ||
                                                    contents.length == 0
                                                }
                                                variant="extended"
                                                sx={{
                                                    background:
                                                        palette.success.main,
                                                    color: palette.success
                                                        .contrastText,
                                                    ':hover': {
                                                        background:
                                                            palette.success
                                                                .dark,
                                                    },
                                                }}
                                                onClick={() => process()}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        fontSize: '1.5rem',
                                                        paddingRight: 1,
                                                    }}
                                                >
                                                    <MdCheck />
                                                </Box>
                                                Submit
                                            </Fab>
                                        </Box>
                                    </Tooltip>
                                </Box>
                            </Box>
                        ),
                    }}
                </ColumnBox>
            )}
            <ItemDrawer
                open={open}
                onClose={() => setOpen(false)}
                contents={contents}
                addItem={(item) => {
                    setTimer(threshold);
                    setContents([
                        ...contents,
                        {
                            item: item._id,
                            quantity: item.order_queue_qty || 0,
                            unit: item.default_unit
                                ? item.default_unit._id
                                : '',
                            vendor: item.default_vendor
                                ? item.default_vendor._id
                                : '',
                            date: setMinutes(
                                setHours(addDays(new Date(), 1), 12),
                                0
                            ),
                        },
                    ]);
                }}
            />
        </AppNav>
    );
};

export default OrderQueue;
