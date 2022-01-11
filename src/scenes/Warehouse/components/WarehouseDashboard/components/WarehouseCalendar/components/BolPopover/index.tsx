import {
    Box,
    Button,
    ButtonBase,
    Divider,
    Popover,
    Typography,
} from '@mui/material';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { MdAdd, MdCancel, MdChevronRight, MdClear } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import AuthGuy from '../../../../../../../../auth/components/AuthGuy';
import { UiPermission } from '../../../../../../../../auth/UiPermission';
import CarefulButton from '../../../../../../../../components/Forms/CarefulButton';
import FormRow from '../../../../../../../../components/Forms/components/FormRow';
import { useOrderCancelation } from '../../../../../../../../graphql/mutations/order/useOrderCancelation';
import { useBol } from '../../../../../../../../graphql/queries/bols/useBol';
import { BolsQuery } from '../../../../../../../../graphql/queries/bols/useBols';
import {
    TinyBol,
    TinyBolsQuery,
} from '../../../../../../../../graphql/queries/bols/useTinyBols';
import { Bol } from '../../../../../../../../graphql/schema/Bol/Bol';
import { Fulfillment } from '../../../../../../../../graphql/schema/Fulfillment/Fulfillment';
import { dateFormats } from '../../../../../../../../utils/dateFormats';
import FulfillmentTag from './components/FulfillmentTag';

export interface AppointmentPopoverProps {
    view: 'shipping' | 'receiving';
    focus: {
        target: EventTarget & Element;
        bol: TinyBol | Bol;
    } | null;
    onClose: () => void;
}

const BolPopover = (props: AppointmentPopoverProps): ReactElement => {
    const { view, focus, onClose } = props;

    const nav = useNavigate();

    const [cancel, { loading: cancelLoading }] = useOrderCancelation();

    const { data } = useBol({
        variables: {
            id: focus ? focus.bol._id : '',
        },
        skip: !focus,
    });

    const bol = data ? data.bol : null;

    const fulfillments: Fulfillment[] = bol
        ? view == 'receiving'
            ? bol.receipts
            : bol.shipments
        : [];

    return (
        <Popover
            open={Boolean(focus) && bol !== null}
            anchorEl={focus ? focus.target : undefined}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            {bol && (
                <Box sx={{ padding: 2 }}>
                    <Box sx={{ paddingBottom: 1, display: 'flex' }}>
                        <Box>
                            <Typography variant="h6">
                                {bol.code ? bol.code : 'Pending BOL'}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                            >{`Against ${
                                bol.orders.length == 1
                                    ? bol.orders[0].code
                                    : bol.orders.map((o) => o.code).join(', ')
                            }`}</Typography>
                        </Box>
                        <Box sx={{ flex: 1 }} />
                        <AuthGuy permission={UiPermission.Logistics}>
                            <Box>
                                <CarefulButton
                                    size="small"
                                    loading={cancelLoading}
                                    onClick={() => {
                                        cancel({
                                            variables: {
                                                ids: bol.orders.map(
                                                    (order) => order._id
                                                ),
                                            },
                                            refetchQueries: [
                                                BolsQuery,
                                                TinyBolsQuery,
                                            ],
                                            onCompleted: () => onClose(),
                                        });
                                    }}
                                    endIcon={<MdClear />}
                                >
                                    {bol.orders.length == 1
                                        ? 'Cancel PO'
                                        : 'Cancel POs'}
                                </CarefulButton>
                            </Box>
                        </AuthGuy>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="caption" color="textSecondary">
                                From
                            </Typography>
                            <Typography>
                                {bol.from.company.name +
                                    (bol.from.location
                                        ? ` (${
                                              bol.from.location.label ||
                                              bol.from.location.address?.city
                                          })`
                                        : '')}
                            </Typography>
                            <Typography variant="body2">
                                {format(
                                    new Date(bol.from.date),
                                    dateFormats.condensedDate
                                )}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                padding: 2,
                                fontSize: '2rem',
                            }}
                        >
                            <MdChevronRight />
                        </Box>
                        <Box>
                            <Typography variant="caption" color="textSecondary">
                                To
                            </Typography>
                            <Typography>
                                {bol.to.company.name +
                                    (bol.to.location
                                        ? ` (${
                                              bol.to.location.label ||
                                              bol.to.location.address?.city
                                          })`
                                        : '')}
                            </Typography>
                            <Typography variant="body2">
                                {format(
                                    new Date(bol.to.date),
                                    dateFormats.condensedDate
                                )}
                            </Typography>
                        </Box>
                    </Box>
                    <Box p={0.5} />
                    <Typography variant="caption" color="textSecondary">
                        Contents
                    </Typography>
                    {bol.contents.length == 0 && <Typography>None</Typography>}
                    <Box>
                        {bol.contents.map((content, i) => (
                            <Typography key={'bol_' + bol._id + 'content_' + i}>
                                {`${content.item.english} - ${
                                    content.quantity
                                } ${
                                    content.unit[
                                        content.quantity == 1
                                            ? 'english'
                                            : 'english_plural'
                                    ]
                                }`}
                            </Typography>
                        ))}
                    </Box>
                    <Box p={0.5} />
                    <Divider />
                    <Box p={0.5} />
                    <Typography variant="caption" color="textSecondary">
                        {view == 'receiving' ? 'Receipts' : 'Shipments'}
                    </Typography>
                    <Box p={0.5} />
                    <FormRow>
                        <Box
                            sx={{
                                display: 'flex',
                                flexFlow: 'column',
                                gap: 1,
                                flex: 1,
                            }}
                        >
                            {fulfillments.length > 0 ? (
                                fulfillments.map((fulfillment) => (
                                    <FulfillmentTag
                                        bol={bol}
                                        fulfillment={fulfillment}
                                        key={fulfillment._id}
                                    />
                                ))
                            ) : (
                                <Typography>None yet</Typography>
                            )}
                        </Box>
                    </FormRow>
                    <Box>
                        <Button
                            endIcon={<MdAdd />}
                            fullWidth
                            onClick={() => nav(bol._id)}
                        >
                            {fulfillments.length > 0
                                ? view == 'receiving'
                                    ? 'Add another receipt against this BOL'
                                    : 'Add another shipment against this BOL'
                                : view == 'receiving'
                                ? 'Receive this BOL'
                                : 'Ship this BOL'}
                        </Button>
                    </Box>
                </Box>
            )}
        </Popover>
    );
};

export default BolPopover;
