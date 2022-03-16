import { LoadingButton } from '@mui/lab';
import { Box, Typography, useTheme, Tooltip, Button } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdCheck } from 'react-icons/md';
import AppNav from '../../../../components/Layout/AppNav/components';
import NavContent from '../../../../components/Layout/AppNav/components/NavContent';
import { useOrderQueue } from '../../../../graphql/schema/OrderQueue/useOrderQueue';
import { useOrderQueueUpdate } from '../../../../graphql/schema/OrderQueue/useOrderQueueUpdate';
import { OrderQueueLineInput } from '../../../../graphql/schema/OrderQueueLine/OrderQueueLineInput';
import ItemDrawer from './components/ItemDrawer';
import QueueTable from './components/QueueTable';
import { format, formatDistanceToNow } from 'date-fns';
import { useOrderQueueProcess } from '../../../../graphql/schema/OrderQueue/useOrderQueueProcess';
import { OperationResult } from '../../../../utils/types/OperationResult';
import Message from '../../../../components/feedback/Message';
import OrderQueueEmails from './components/OrderQueueEmails';

const threshold = 1200;

const OrderQueue = (): ReactElement => {
    const [queue, setQueue] = React.useState<OrderQueueLineInput[]>([]);

    const { palette } = useTheme();

    const [lastSaved, setLastSave] = React.useState(new Date());

    const { error, loading } = useOrderQueue({
        onCompleted: (data) =>
            setQueue(
                data.orderQueue.lines.map((d) => ({
                    po: d.po,
                    customer: d.customer,
                    vendor: d.vendor,
                    item: d.item,
                    unit: d.unit,
                    quantity: d.quantity,
                    destination: d.destination,
                    date: d.date,
                    time: d.time,
                }))
            ),
        fetchPolicy: 'network-only',
    });

    const [update, { error: updateError, loading: updateLoading }] =
        useOrderQueueUpdate({
            variables: {
                data: {
                    lines: queue,
                },
            },
            onCompleted: () => {
                setLastSave(new Date());
            },
        });

    const [result, setResult] = React.useState<OperationResult<{
        processOrderQueue: boolean;
    }> | null>(null);

    const [process, { loading: processLoading }] = useOrderQueueProcess({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
    });

    const [timer, setTimer] = React.useState<number | null>(null);

    React.useEffect(() => {
        if (timer !== null && timer !== 0) {
            const timeout = setTimeout(() => {
                setTimer((t) => (t as number) - threshold / 5);
            }, threshold / 5);

            return () => clearTimeout(timeout);
        }
    }, [timer]);

    React.useEffect(() => {
        if (timer == 0) {
            update();
        }
    }, [timer]);

    const ready = !(timer || loading);

    const getHoldup = (): string | null => {
        if (queue.some((q) => !q.item)) return 'Each order needs an item.';
        if (queue.some((q) => !q.quantity))
            return 'Each order needs a quantity.';
        if (queue.some((q) => !q.unit)) return 'Each order needs a unit.';
        if (queue.some((q) => !q.po)) return 'Each order needs a po.';
        if (queue.some((q) => !q.vendor)) return 'Each order needs a vendor.';
        if (queue.some((q) => !q.destination))
            return 'Each order needs a destination.';
        if (queue.some((q) => !q.date)) return 'Each order needs a date.';
        return null;
    };

    const holdup = getHoldup();

    return (
        <AppNav error={error || updateError} loading={loading}>
            {result && result.success == false ? (
                <Message
                    type="Error"
                    message={result.error.message}
                    action={
                        <Button onClick={() => setResult(null)}>
                            Try again
                        </Button>
                    }
                />
            ) : result ? (
                <Message
                    type="Success"
                    message="Orders processed!"
                    onComplete={() => {
                        setQueue([]);
                        setLastSave(new Date());
                        setResult(null);
                        setTimer(null);
                    }}
                />
            ) : (
                <NavContent>
                    {{
                        header: (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-end',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexFlow: 'column',
                                        gap: 0.5,
                                    }}
                                >
                                    <Typography variant="crisp">
                                        Order Queue
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{ color: palette.text.secondary }}
                                    >
                                        {!ready
                                            ? 'save in progress...'
                                            : 'saved ' +
                                              formatDistanceToNow(lastSaved) +
                                              ' ago'}
                                    </Typography>
                                </Box>
                                <OrderQueueEmails contents={queue} />
                            </Box>
                        ),
                        content: (
                            <QueueTable
                                touch={() => setTimer(threshold)}
                                queue={queue}
                                setQueue={(q) => {
                                    setQueue(q);
                                    setTimer(threshold);
                                }}
                            />
                        ),
                        footer: (
                            <Box
                                sx={{ display: 'flex', alignItems: 'flex-end' }}
                            >
                                <Box sx={{ flex: 1 }} />
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <ItemDrawer
                                        disabled={processLoading}
                                        queue={queue}
                                        setQueue={(q) => {
                                            setQueue(q);
                                            setTimer(threshold);
                                        }}
                                    />
                                    <Tooltip title={holdup || ''} arrow>
                                        <Box>
                                            <LoadingButton
                                                loading={processLoading}
                                                color="success"
                                                variant="contained"
                                                size="large"
                                                loadingPosition="start"
                                                startIcon={<MdCheck />}
                                                disabled={
                                                    !ready ||
                                                    Boolean(holdup) ||
                                                    queue.length == 0
                                                }
                                                onClick={() => process()}
                                            >
                                                Process Queue
                                            </LoadingButton>
                                        </Box>
                                    </Tooltip>
                                </Box>
                            </Box>
                        ),
                    }}
                </NavContent>
            )}
        </AppNav>
    );
};

export default OrderQueue;
