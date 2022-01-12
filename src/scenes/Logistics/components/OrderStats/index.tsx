import {
    Box,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { getYear } from 'date-fns';
import React, { ReactElement } from 'react';
import AppNav from '../../../../components/AppNav';
import CompanyField from '../../../../components/Forms/components/CompanyField';
import LocationField from '../../../../components/Forms/components/LocationField';
import SearchField from '../../../../components/Forms/components/SearchField';
import UnitClassField from '../../../../components/Forms/components/UnitClassField';
import ColumnBox from '../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../components/PageTitle';
import { useOrderStats } from '../../../../graphql/queries/orderQueue/useOrderStats';
import {
    OrderStatistic,
    OrderStatisticRangeQuantity,
} from '../../../../graphql/schema/OrderStatistic/OrderStatistic';
import { OrderStatisticFilter } from '../../../../graphql/schema/OrderStatistic/OrderStatisticsFilter';
import { UnitClass } from '../../../../graphql/schema/Unit/Unit';
import { commafy } from '../../../../utils/commafy';
import StatsGraph from './components/StatsGraph';

const OrderStats = (): ReactElement => {
    const fromState = localStorage.getItem('logistics_stats_filter');
    const parsedFromState = fromState ? JSON.parse(fromState) : null;

    const { palette, shape } = useTheme();

    const [focused, setFocused] = React.useState<OrderStatistic | null>(null);

    const indexFromState: number =
        parsedFromState && !isNaN(parsedFromState.index)
            ? parsedFromState.index
            : 0;

    const itemNameFromState: string =
        parsedFromState &&
        parsedFromState.item_name &&
        parsedFromState.item_name instanceof String
            ? parsedFromState.item_name
            : '';

    const vendorFromState: string =
        parsedFromState &&
        parsedFromState.vendor &&
        parsedFromState.vendor instanceof String
            ? parsedFromState.vendor
            : undefined;

    const [filter, setFilter] = React.useState<OrderStatisticFilter>({
        index: indexFromState,
        item_name: itemNameFromState || undefined,
        vendor: vendorFromState,
    });

    const { data, error, loading } = useOrderStats({ variables: { filter } });

    const stats = data ? data.orderStatistics : [];

    const thisYear = getYear(new Date());

    const years = [
        2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028,
        2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040,
    ].filter((y) => y <= thisYear);

    return (
        <AppNav error={error} loading={loading}>
            {stats && (
                <ColumnBox>
                    {{
                        header: (
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Box>
                                    <PageTitle>Order Statistics</PageTitle>
                                </Box>
                                <Box sx={{ flex: 1 }} />
                                <Box sx={{ width: 160 }}>
                                    <TextField
                                        label="Year"
                                        fullWidth
                                        select
                                        value={
                                            getYear(new Date()) + filter.index
                                        }
                                    >
                                        {years.map((y) => (
                                            <MenuItem
                                                key={'Y_' + y}
                                                value={y}
                                                onClick={(e) => {
                                                    const val = getYear(
                                                        new Date()
                                                    );
                                                    const index = y - val;
                                                    setFilter({
                                                        ...filter,
                                                        index,
                                                    });
                                                }}
                                            >
                                                {y}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                                {/* <Box sx={{ width: 200 }}>
                                    <CompanyField
                                        label="Filter by Vendor"
                                        value={filter.vendor || ''}
                                        onChange={(val) => {
                                            setFilter({
                                                ...filter,
                                                vendor: val || undefined,
                                            });
                                        }}
                                    />
                                </Box> */}
                                <Box sx={{ width: 200 }}>
                                    <LocationField
                                        mine
                                        label="Filter Destination"
                                        value={filter.destination || ''}
                                        onChange={(val) => {
                                            setFilter({
                                                ...filter,
                                                destination: val || undefined,
                                            });
                                        }}
                                    />
                                </Box>
                                <Box sx={{ width: 200 }}>
                                    <SearchField
                                        naked={false}
                                        label="Search by item name"
                                        value={filter.item_name || ''}
                                        onChange={(val) => {
                                            setFilter({
                                                ...filter,
                                                item_name: val || undefined,
                                            });
                                        }}
                                    />
                                </Box>
                            </Box>
                        ),
                        content: (
                            <Box
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexFlow: 'column',
                                }}
                            >
                                <Box
                                    sx={{
                                        ...shape,
                                        border: `1px solid ${palette.divider}`,
                                        flex: 1,
                                        overflow: 'auto',
                                    }}
                                >
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableCell
                                                sx={{
                                                    background:
                                                        palette.background
                                                            .paper,
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: 900,
                                                    }}
                                                >
                                                    Item
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    background:
                                                        palette.background
                                                            .paper,
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: 900,
                                                    }}
                                                >
                                                    Total
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    background:
                                                        palette.background
                                                            .paper,
                                                }}
                                            >
                                                Jan
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    background:
                                                        palette.background
                                                            .paper,
                                                }}
                                            >
                                                Feb
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    background:
                                                        palette.background
                                                            .paper,
                                                }}
                                            >
                                                Mar
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    background:
                                                        palette.background
                                                            .paper,
                                                }}
                                            >
                                                Apr
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    background:
                                                        palette.background
                                                            .paper,
                                                }}
                                            >
                                                May
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    background:
                                                        palette.background
                                                            .paper,
                                                }}
                                            >
                                                Jun
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    background:
                                                        palette.background
                                                            .paper,
                                                }}
                                            >
                                                Jul
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    background:
                                                        palette.background
                                                            .paper,
                                                }}
                                            >
                                                Aug
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    background:
                                                        palette.background
                                                            .paper,
                                                }}
                                            >
                                                Sep
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    background:
                                                        palette.background
                                                            .paper,
                                                }}
                                            >
                                                Oct
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    background:
                                                        palette.background
                                                            .paper,
                                                }}
                                            >
                                                Nov
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    background:
                                                        palette.background
                                                            .paper,
                                                }}
                                            >
                                                Dec
                                            </TableCell>
                                        </TableHead>
                                        <TableBody>
                                            {stats.map((stat, i) => (
                                                <TableRow
                                                    hover
                                                    key={'stat_' + i}
                                                    onClick={() =>
                                                        setFocused(stat)
                                                    }
                                                >
                                                    {[...Array(14).keys()].map(
                                                        (i) => {
                                                            if (i == 0) {
                                                                return (
                                                                    <TableCell>
                                                                        {
                                                                            stat
                                                                                .item
                                                                                .english
                                                                        }
                                                                    </TableCell>
                                                                );
                                                            } else if (i == 1) {
                                                                const qtys: OrderStatisticRangeQuantity[] =
                                                                    stat.ranges
                                                                        .map(
                                                                            (
                                                                                r
                                                                            ) =>
                                                                                r.quantitys
                                                                        )
                                                                        .flat()
                                                                        .reduce(
                                                                            (
                                                                                acc,
                                                                                item
                                                                            ) => {
                                                                                const index =
                                                                                    acc
                                                                                        .map(
                                                                                            (
                                                                                                a
                                                                                            ) =>
                                                                                                a.unit_class
                                                                                        )
                                                                                        .indexOf(
                                                                                            item.unit_class
                                                                                        );

                                                                                if (
                                                                                    index ==
                                                                                    -1
                                                                                )
                                                                                    return [
                                                                                        ...acc,
                                                                                        item,
                                                                                    ];
                                                                                else {
                                                                                    acc.splice(
                                                                                        index,
                                                                                        1,
                                                                                        {
                                                                                            quantity:
                                                                                                acc[
                                                                                                    index
                                                                                                ]
                                                                                                    .quantity +
                                                                                                item.quantity,
                                                                                            unit_class:
                                                                                                item.unit_class,
                                                                                        }
                                                                                    );
                                                                                    return acc;
                                                                                }
                                                                            },
                                                                            [] as OrderStatisticRangeQuantity[]
                                                                        );
                                                                return (
                                                                    <TableCell>
                                                                        {qtys.map(
                                                                            (
                                                                                q,
                                                                                qi
                                                                            ) => (
                                                                                <Box
                                                                                    key={`${i}_${qi}`}
                                                                                >
                                                                                    <Typography variant="body2">
                                                                                        {commafy(
                                                                                            q.quantity
                                                                                        )}
                                                                                    </Typography>
                                                                                    <Typography
                                                                                        variant="caption"
                                                                                        color="textSecondary"
                                                                                    >
                                                                                        {q.unit_class ==
                                                                                        UnitClass.Count
                                                                                            ? 'Eaches'
                                                                                            : q.unit_class ==
                                                                                              UnitClass.Time
                                                                                            ? 'Minutes'
                                                                                            : q.unit_class ==
                                                                                              UnitClass.Volume
                                                                                            ? 'Gallons'
                                                                                            : q.unit_class ==
                                                                                              UnitClass.Weight
                                                                                            ? 'Pounds'
                                                                                            : ''}
                                                                                    </Typography>
                                                                                </Box>
                                                                            )
                                                                        )}
                                                                    </TableCell>
                                                                );
                                                            } else {
                                                                const range =
                                                                    stat.ranges.find(
                                                                        (r) =>
                                                                            r.month ==
                                                                            i -
                                                                                1
                                                                    );

                                                                if (range) {
                                                                    const {
                                                                        quantitys,
                                                                    } = range;

                                                                    const qtys: OrderStatisticRangeQuantity[] =
                                                                        quantitys.reduce(
                                                                            (
                                                                                acc,
                                                                                item
                                                                            ) => {
                                                                                const index =
                                                                                    acc
                                                                                        .map(
                                                                                            (
                                                                                                a
                                                                                            ) =>
                                                                                                a.unit_class
                                                                                        )
                                                                                        .indexOf(
                                                                                            item.unit_class
                                                                                        );

                                                                                if (
                                                                                    index ==
                                                                                    -1
                                                                                )
                                                                                    return [
                                                                                        ...acc,
                                                                                        item,
                                                                                    ];
                                                                                else {
                                                                                    acc.splice(
                                                                                        index,
                                                                                        1,
                                                                                        {
                                                                                            quantity:
                                                                                                acc[
                                                                                                    index
                                                                                                ]
                                                                                                    .quantity +
                                                                                                item.quantity,
                                                                                            unit_class:
                                                                                                item.unit_class,
                                                                                        }
                                                                                    );
                                                                                    return acc;
                                                                                }
                                                                            },
                                                                            [] as OrderStatisticRangeQuantity[]
                                                                        );

                                                                    return (
                                                                        <TableCell>
                                                                            {qtys.map(
                                                                                (
                                                                                    q,
                                                                                    qi
                                                                                ) => (
                                                                                    <Box
                                                                                        key={`${i}_${qi}`}
                                                                                    >
                                                                                        <Typography variant="body2">
                                                                                            {commafy(
                                                                                                q.quantity
                                                                                            )}
                                                                                        </Typography>
                                                                                        <Typography
                                                                                            variant="caption"
                                                                                            color="textSecondary"
                                                                                        >
                                                                                            {q.unit_class ==
                                                                                            UnitClass.Count
                                                                                                ? 'Eaches'
                                                                                                : q.unit_class ==
                                                                                                  UnitClass.Time
                                                                                                ? 'Minutes'
                                                                                                : q.unit_class ==
                                                                                                  UnitClass.Volume
                                                                                                ? 'Gallons'
                                                                                                : q.unit_class ==
                                                                                                  UnitClass.Weight
                                                                                                ? 'Pounds'
                                                                                                : ''}
                                                                                        </Typography>
                                                                                    </Box>
                                                                                )
                                                                            )}
                                                                        </TableCell>
                                                                    );
                                                                } else {
                                                                    return (
                                                                        <TableCell></TableCell>
                                                                    );
                                                                }
                                                            }
                                                        }
                                                    )}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Box>
                        ),
                    }}
                </ColumnBox>
            )}
            <StatsGraph
                filter={filter}
                stat={focused}
                onClose={() => setFocused(null)}
            />
        </AppNav>
    );
};

export default OrderStats;
