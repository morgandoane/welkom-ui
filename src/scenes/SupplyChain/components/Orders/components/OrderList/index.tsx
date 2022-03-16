import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { MdAdd, MdClear } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import SmartTable from '../../../../../../components/display/SmartTable';
import AppFab from '../../../../../../components/Inputs/AppFab';
import EntityField from '../../../../../../components/Inputs/EntityField';
import SearchInput from '../../../../../../components/Inputs/SearchInput';
import AppNav from '../../../../../../components/Layout/AppNav/components';
import NavContent from '../../../../../../components/Layout/AppNav/components/NavContent';
import { TinyCompany } from '../../../../../../graphql/schema/Company/Company';
import { useCompanies } from '../../../../../../graphql/schema/Company/useCompanies';
import { TinyItem } from '../../../../../../graphql/schema/Item/Item';
import { useItems } from '../../../../../../graphql/schema/Item/useItems';
import { TinyOrder } from '../../../../../../graphql/schema/Order/Order';
import { OrderFilter } from '../../../../../../graphql/schema/Order/OrderFilter';
import { useOrders } from '../../../../../../graphql/schema/Order/useOrders';
import { dateFormats } from '../../../../../../utils/dateFormats';
import Company from '../../../../../Library/components/Companies/components/Company';
import DateControl from './components/DateControl';

const OrdersList = (): ReactElement => {
    const nav = useNavigate();

    const [filter, setFilter] = React.useState<OrderFilter>({
        skip: 0,
        take: 50,
    });

    const [orders, setOrders] = React.useState<TinyOrder[]>([]);
    const [count, setCount] = React.useState(0);

    const { data, error, loading } = useOrders({
        variables: { filter },
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setOrders(data.orders.items);
            setCount(data.orders.count);
        },
    });

    return (
        <AppNav error={error} loading={loading}>
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
                            <Box sx={{ display: 'flex', flexFlow: 'column' }}>
                                <Typography variant="crisp">Orders</Typography>
                            </Box>
                            <AppFab onClick={() => nav('new')} icon={<MdAdd />}>
                                Order
                            </AppFab>
                        </Box>
                    ),
                    content: (
                        <SmartTable
                            data={orders}
                            getProps={(d) => ({
                                id: d._id,
                                onClick: (order) => nav(order._id),
                            })}
                            pagination={{
                                count,
                                filter,
                                setFilter: (d) =>
                                    setFilter({
                                        ...filter,
                                        ...d,
                                    }),
                            }}
                            controls={{
                                PO: (
                                    <SearchInput
                                        placeholder="PO#"
                                        value={filter.po || ''}
                                        onChange={(po) =>
                                            setFilter({ ...filter, po })
                                        }
                                    />
                                ),
                                Customer: (
                                    <EntityField
                                        variant="standard"
                                        InputProps={{
                                            disableUnderline: true,
                                            startAdornment: filter.customer ? (
                                                <Box
                                                    sx={{
                                                        paddingBottom: '2px',
                                                        paddingRight: '8px',
                                                    }}
                                                >
                                                    <Typography>
                                                        Customer:
                                                    </Typography>
                                                </Box>
                                            ) : undefined,
                                            endAdornment: filter.customer ? (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setFilter({
                                                                ...filter,
                                                                customer:
                                                                    undefined,
                                                            })
                                                        }
                                                        size="small"
                                                    >
                                                        <MdClear />
                                                    </IconButton>
                                                </InputAdornment>
                                            ) : undefined,
                                        }}
                                        placeholder="Customer"
                                        hook={useCompanies}
                                        getData={(d) => d.companies.items}
                                        getProps={(c: TinyCompany) => ({
                                            id: c._id,
                                            label: c.name,
                                        })}
                                        variables={{
                                            filter: { skip: 0, take: 100 },
                                        }}
                                        value={filter.customer || ''}
                                        onChange={(val) =>
                                            setFilter({
                                                ...filter,
                                                customer: val || undefined,
                                            })
                                        }
                                    />
                                ),
                                Vendor: (
                                    <EntityField
                                        variant="standard"
                                        InputProps={{
                                            disableUnderline: true,
                                            startAdornment: filter.vendor ? (
                                                <Box
                                                    sx={{
                                                        paddingBottom: '2px',
                                                        paddingRight: '8px',
                                                    }}
                                                >
                                                    <Typography>
                                                        Vendor:
                                                    </Typography>
                                                </Box>
                                            ) : undefined,
                                            endAdornment: filter.vendor ? (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setFilter({
                                                                ...filter,
                                                                vendor: undefined,
                                                            })
                                                        }
                                                        size="small"
                                                    >
                                                        <MdClear />
                                                    </IconButton>
                                                </InputAdornment>
                                            ) : undefined,
                                        }}
                                        placeholder="Vendor"
                                        hook={useCompanies}
                                        getData={(d) => d.companies.items}
                                        getProps={(c: TinyCompany) => ({
                                            id: c._id,
                                            label: c.name,
                                        })}
                                        variables={{
                                            filter: { skip: 0, take: 100 },
                                        }}
                                        value={filter.vendor || ''}
                                        onChange={(val) =>
                                            setFilter({
                                                ...filter,
                                                vendor: val || undefined,
                                            })
                                        }
                                    />
                                ),
                                ['Deliveries']: (
                                    <DateControl
                                        value={filter.date_range || null}
                                        onChange={(val) =>
                                            setFilter({
                                                ...filter,
                                                date_range: val || undefined,
                                            })
                                        }
                                    />
                                ),
                                Items: (
                                    <EntityField
                                        variant="standard"
                                        InputProps={{
                                            disableUnderline: true,
                                            startAdornment: filter.item ? (
                                                <Box
                                                    sx={{
                                                        paddingBottom: '2px',
                                                        paddingRight: '8px',
                                                    }}
                                                >
                                                    <Typography>
                                                        Item:
                                                    </Typography>
                                                </Box>
                                            ) : undefined,
                                            endAdornment: filter.item ? (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setFilter({
                                                                ...filter,
                                                                item: undefined,
                                                            })
                                                        }
                                                        size="small"
                                                    >
                                                        <MdClear />
                                                    </IconButton>
                                                </InputAdornment>
                                            ) : undefined,
                                        }}
                                        placeholder="Item"
                                        hook={useItems}
                                        getData={(d) => d.items.items}
                                        getProps={(c: TinyItem) => ({
                                            id: c._id,
                                            label: c.names.english,
                                        })}
                                        variables={{
                                            filter: { skip: 0, take: 100 },
                                        }}
                                        value={filter.item || ''}
                                        onChange={(val) =>
                                            setFilter({
                                                ...filter,
                                                item: val || undefined,
                                            })
                                        }
                                    />
                                ),
                            }}
                        >
                            {{
                                PO: (d) => d.po,
                                Customer: (d) => d.customer.name,
                                Vendor: (d) => d.vendor.name,
                                ['Deliveries']: (d) => {
                                    if (d.appointments.length > 1)
                                        return `${d.appointments.length} deliveries`;

                                    return d.appointments
                                        .map(
                                            (apt) =>
                                                `${format(
                                                    new Date(apt.date),
                                                    dateFormats.condensedDate
                                                )} - ${apt.location.label}`
                                        )
                                        .join('');
                                },
                                Items: (d) =>
                                    [
                                        ...new Set(
                                            d.appointments
                                                .map((app) =>
                                                    app.contents
                                                        .map(
                                                            (c) =>
                                                                c.item.names
                                                                    .english
                                                        )
                                                        .flat()
                                                )
                                                .flat()
                                        ),
                                    ].join(', '),
                            }}
                        </SmartTable>
                    ),
                }}
            </NavContent>
        </AppNav>
    );
};

export default OrdersList;
