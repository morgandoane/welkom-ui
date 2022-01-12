import { Box, Drawer, Typography, useTheme } from '@mui/material';
import getYear from 'date-fns/getYear';
import React, { ReactElement } from 'react';
import { useTinyLocations } from '../../../../../../graphql/queries/locations/useTinyLocations';
import { OrderStatistic } from '../../../../../../graphql/schema/OrderStatistic/OrderStatistic';
import { OrderStatisticFilter } from '../../../../../../graphql/schema/OrderStatistic/OrderStatisticsFilter';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { monthsInYear } from 'date-fns';
import { dateFormats } from '../../../../../../utils/dateFormats';
import { SizeMe } from 'react-sizeme';

export interface StatsGraphProps {
    filter: OrderStatisticFilter;
    stat: OrderStatistic | null;
    onClose: () => void;
}

const StatsGraph = (props: StatsGraphProps): ReactElement => {
    const {
        filter: { index, vendor, destination },
        stat,
        onClose,
    } = props;

    const { palette } = useTheme();

    const open = Boolean(stat);

    const { data } = useTinyLocations({
        variables: {
            filter: {
                skip: 0,
                take: 250,
            },
        },
    });

    const locations = data ? data.locations.items : [];

    const dest = locations.find((l) => l._id === destination);

    const [close, setClose] = React.useState(false);

    const getData = (): { month: string; total: number }[] =>
        stat
            ? [...Array(12).keys()].map((i) => ({
                  month: dateFormats.months[i][1],
                  total: (
                      stat.ranges.find((r) => r.month === i + 1) || {
                          month: i,
                          quantitys: [],
                      }
                  ).quantitys.reduce((acc, item) => {
                      return acc + item.quantity;
                  }, 0),
              }))
            : [];

    React.useEffect(() => {
        if (close) {
            const timeout = setTimeout(() => {
                setClose(false);
                onClose();
            }, 250);

            return () => clearTimeout(timeout);
        }
    }, [onClose, close]);

    return (
        <Drawer
            open={open && !close}
            onClose={() => setClose(true)}
            anchor="bottom"
            transitionDuration={250}
        >
            <Box>
                <Box sx={{ p: 4 }}>
                    <Typography variant="h4">
                        {stat ? stat.item.english : ''}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        {`${getYear(new Date()) + index}${
                            dest
                                ? ` - ${
                                      dest.label ||
                                      dest.address?.city ||
                                      'Unknown location'
                                  }`
                                : ''
                        }`}
                    </Typography>
                    <SizeMe>
                        {({ size }) => (
                            <Box sx={{ height: 200 }}>
                                <LineChart
                                    width={size.width || undefined}
                                    height={200}
                                    data={getData()}
                                >
                                    <Line
                                        type="monotone"
                                        dataKey="total"
                                        stroke={palette.primary.main}
                                        strokeWidth={2}
                                    />
                                    <XAxis dataKey="month" />
                                    <Tooltip />
                                </LineChart>
                            </Box>
                        )}
                    </SizeMe>
                </Box>
            </Box>
        </Drawer>
    );
};

export default StatsGraph;
