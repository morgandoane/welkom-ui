import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { MdChevronRight, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import AppFab from '../../../../../../../../components/AppFab';
import { TinyLocation } from '../../../../../../../../graphql/queries/locations/useTinyLocations';
import { TinyCompany } from '../../../../../../../../graphql/schema/Company/Company';
import { TinyItem } from '../../../../../../../../graphql/schema/Item/Item';
import { Order } from '../../../../../../../../graphql/schema/Order/Order';
import { TinyProfile } from '../../../../../../../../graphql/schema/Profile/Profile';
import { TinyUnit } from '../../../../../../../../graphql/schema/Unit/Unit';
import { dateFormats } from '../../../../../../../../utils/dateFormats';

export interface OrderContentsProps {
    order: Order;
    data: {
        companies: TinyCompany[];
        items: TinyItem[];
        profiles: TinyProfile[];
        locations: TinyLocation[];
        units: TinyUnit[];
    };
}

const OrderContents = (props: OrderContentsProps): ReactElement => {
    const nav = useNavigate();
    const {
        order,
        data: { items, companies, locations, units },
    } = props;

    return (
        <Box sx={{ paddingTop: 3 }}>
            {order.contents.map((content) => {
                const item = items.find((i) => i._id === content.item._id);
                const unit = units.find((i) => i._id === content.unit._id);
                const location = locations.find(
                    (i) => i._id == content.location._id
                );
                const isReady =
                    unit !== undefined &&
                    item !== undefined &&
                    location !== undefined;

                if (!isReady)
                    return (
                        <Typography color="warning.main">
                            Order line needs attention
                        </Typography>
                    );
                else
                    return (
                        <Box sx={{ marginBottom: 4 }}>
                            <Typography
                                fontWeight={500}
                                variant="body1"
                                sx={{ paddingBottom: 0.5 }}
                            >
                                {content.item.english}
                            </Typography>
                            <Typography
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                                color="textSecondary"
                            >
                                {`${content.quantity} ${
                                    unit[
                                        content.quantity == 1
                                            ? 'english'
                                            : 'english_plural'
                                    ]
                                }`}
                                <MdChevronRight />
                                {`to ${location.company.name} (${
                                    location.label
                                        ? location.label
                                        : location.address
                                        ? location.address.city
                                        : 'Unknown location'
                                }) by ${format(
                                    new Date(content.due),
                                    dateFormats.condensedDate
                                )}`}
                            </Typography>
                        </Box>
                    );
            })}
            <AppFab icon={<MdEdit />} onClick={() => nav('edit')}>
                Edit
            </AppFab>
        </Box>
    );
};

export default OrderContents;
