import { Box, Divider, Typography } from '@mui/material';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { MdChevronRight, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import AppFab from '../../../../../../../../components/AppFab';
import Details from '../../../../../../../../components/Details';
import { useOrderSetup } from '../../../../../../../../graphql/queries/orders/useOrderSetup';
import { Order } from '../../../../../../../../graphql/schema/Order/Order';
import { dateFormats } from '../../../../../../../../utils/dateFormats';

export interface OrderDetailsProps {
    order: Order;
}

const OrderDetails = (props: OrderDetailsProps): ReactElement => {
    const { order } = props;
    const nav = useNavigate();

    return (
        <Box sx={{ paddingTop: 3 }}>
            <Details gap={4}>
                {[
                    {
                        key: 'Vendor',
                        value: order.vendor ? order.vendor.name : 'Unassigned',
                    },
                    {
                        key: 'Customer',
                        value: order.customer
                            ? order.customer.name
                            : 'Unassigned',
                    },
                    { key: 'Created by', value: order.created_by.name },
                    {
                        key: 'Date created',
                        value: format(
                            new Date(order.date_created),
                            dateFormats.condensedDate
                        ),
                    },
                    {
                        key: 'Last modified by',
                        value: !order.modified_by
                            ? '-'
                            : order.modified_by.name,
                    },
                    {
                        key: 'Date modified',
                        value: !order.date_modified
                            ? 'Never'
                            : format(
                                  new Date(order.date_modified),
                                  dateFormats.condensedDate
                              ),
                    },
                ]}
            </Details>
            <AppFab icon={<MdEdit />} onClick={() => nav('edit')}>
                Edit
            </AppFab>
        </Box>
    );
};

export default OrderDetails;
