import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd, MdCheck } from 'react-icons/md';
import AppNav from '../../../../components/Layout/AppNav/components';
import NavContent from '../../../../components/Layout/AppNav/components/NavContent';
import { useOrderQueue } from '../../../../graphql/schema/OrderQueue/useOrderQueue';
import { OrderQueueLineInput } from '../../../../graphql/schema/OrderQueueLine/OrderQueueLineInput';
import ItemDrawer from './components/ItemDrawer';
import QueueTable from './components/QueueTable';

const threshold = 3000;

const OrderQueue = (): ReactElement => {
    const [queue, setQueue] = React.useState<OrderQueueLineInput[]>([]);

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

    return (
        <AppNav error={error} loading={loading}>
            <NavContent>
                {{
                    header: (
                        <Box>
                            <Typography variant="crisp">Order Queue</Typography>
                            <Typography>
                                {timer == null ? 'null' : timer}
                            </Typography>
                        </Box>
                    ),
                    content: (
                        <QueueTable
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
                            onClick={() => setTimer(threshold)}
                        >
                            <Box sx={{ flex: 1 }} />
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <ItemDrawer
                                    queue={queue}
                                    setQueue={(q) => {
                                        setQueue(q);
                                        setTimer(threshold);
                                    }}
                                />
                                <LoadingButton
                                    color="success"
                                    variant="contained"
                                    size="large"
                                    loadingPosition="start"
                                    startIcon={<MdCheck />}
                                >
                                    Process Queue
                                </LoadingButton>
                            </Box>
                        </Box>
                    ),
                }}
            </NavContent>
        </AppNav>
    );
};

export default OrderQueue;
