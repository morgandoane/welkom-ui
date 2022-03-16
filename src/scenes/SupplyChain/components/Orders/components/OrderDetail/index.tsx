import { Box, Divider, Typography } from '@mui/material';
import { format, getDate, getMonth } from 'date-fns';
import React, { ReactElement } from 'react';
import { MdChevronRight, MdEdit } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import AttachmentsTab from '../../../../../../components/display/DataTabs/AttachmentsTab';
import DetailsTab from '../../../../../../components/display/DataTabs/DetailsTab';
import DateBox from '../../../../../../components/display/DateBox';
import AppFab from '../../../../../../components/Inputs/AppFab';
import BackButton from '../../../../../../components/Inputs/BackButton';
import AppNav from '../../../../../../components/Layout/AppNav/components';
import NavContent from '../../../../../../components/Layout/AppNav/components/NavContent';
import TabFade from '../../../../../../components/Layout/TabFade';
import {
    OrderQuery,
    useOrder,
} from '../../../../../../graphql/schema/Order/useOrder';
import { dateFormats } from '../../../../../../utils/dateFormats';
import { getTime } from '../../../../../../utils/getTime';

const Order = (): ReactElement => {
    const { id } = useParams();
    const nav = useNavigate();

    const { data, error, loading } = useOrder({
        variables: { id: id || '' },
    });

    const order = data ? data.order : null;

    const sorted = !order
        ? []
        : [...order.appointments].sort((a, b) => {
              const dateA = new Date(a.date).getTime();
              const dateB = new Date(b.date).getTime();
              return dateA > dateB ? 1 : -1;
          });

    return (
        <AppNav error={error} loading={loading}>
            {order && (
                <NavContent>
                    {{
                        header: (
                            <Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexFlow: 'column',
                                        gap: 1,
                                    }}
                                >
                                    <Box>
                                        <BackButton
                                            onClick={() =>
                                                nav('/supplychain/orders')
                                            }
                                        >
                                            Orders
                                        </BackButton>
                                    </Box>
                                    <Typography variant="crisp">
                                        {order.po}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Typography>
                                            {order.vendor.name}
                                        </Typography>
                                        <MdChevronRight />
                                        <Typography>
                                            {order.customer.name}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ),
                        content: (
                            <TabFade>
                                {{
                                    ['Order Contents']: (
                                        <Box sx={{ paddingTop: 2 }}>
                                            <AppFab
                                                absolute
                                                icon={<MdEdit />}
                                                onClick={() => nav('edit')}
                                            >
                                                Edit Order
                                            </AppFab>
                                            {sorted.map((apt) => (
                                                <Box
                                                    key={apt._id}
                                                    sx={{
                                                        display: 'flex',
                                                        gap: 2,
                                                        alignItems: 'center',
                                                        marginBottom: 2,
                                                    }}
                                                >
                                                    <DateBox>
                                                        {[
                                                            format(
                                                                new Date(),
                                                                'MMM'
                                                            ),
                                                            getDate(
                                                                new Date(
                                                                    apt.date
                                                                )
                                                            ) + '',
                                                        ]}
                                                    </DateBox>
                                                    <Box>
                                                        <Typography variant="body1">
                                                            {apt.location.label}
                                                        </Typography>

                                                        <Box>
                                                            {apt.contents.map(
                                                                (
                                                                    content,
                                                                    i
                                                                ) => (
                                                                    <Typography
                                                                        variant="body2"
                                                                        key={
                                                                            'c_' +
                                                                            i
                                                                        }
                                                                    >{`${
                                                                        content
                                                                            .item
                                                                            .names
                                                                            .english
                                                                    } - ${
                                                                        content.client_quantity
                                                                    } ${
                                                                        content
                                                                            .client_unit
                                                                            .names[
                                                                            content.client_quantity ==
                                                                            1
                                                                                ? 'english'
                                                                                : 'english_plural'
                                                                        ]
                                                                    }`}</Typography>
                                                                )
                                                            )}
                                                        </Box>
                                                        <Typography
                                                            variant="caption"
                                                            color="textSecondary"
                                                        >
                                                            {format(
                                                                new Date(
                                                                    apt.date
                                                                ),
                                                                dateFormats.condensedDate
                                                            ) +
                                                                (apt.time !==
                                                                null
                                                                    ? ' by ' +
                                                                      getTime(
                                                                          apt.time as number
                                                                      )
                                                                    : '')}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Box>
                                    ),
                                    Details: (
                                        <DetailsTab
                                            entity="Order"
                                            data={order}
                                            refetchQueries={[OrderQuery]}
                                        />
                                    ),
                                    Attachments: (
                                        <AttachmentsTab
                                            data={order}
                                            refetchQueries={[OrderQuery]}
                                        />
                                    ),
                                }}
                            </TabFade>
                        ),
                    }}
                </NavContent>
            )}
        </AppNav>
    );
};

export default Order;
