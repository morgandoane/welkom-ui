import { Box, Typography, useTheme } from '@mui/material';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { BolAppointment } from '../../../../../../../../graphql/schema/Bol/Bol';
import { Itinerary } from '../../../../../../../../graphql/schema/Itinerary/Itinerary';

export interface ItineraryTimelineProps {
    itinerary: Itinerary;
}

interface StopProps {
    date: Date;
    stops: BolAppointment[];
}

const ItineraryTimeline = (props: ItineraryTimelineProps): ReactElement => {
    const { itinerary } = props;

    const { palette, shape } = useTheme();

    const getStops = (): StopProps[] => {
        const dateGroups: Record<string, BolAppointment[]> = {};

        const keyFormat = 'MMMM d, u HH';

        for (const bol of itinerary.bols) {
            const fromKey =
                bol.from.company._id +
                '_' +
                format(new Date(bol.from.date), keyFormat);

            const toKey =
                bol.to.company._id +
                '_' +
                format(new Date(bol.to.date), keyFormat);

            if (dateGroups[fromKey]) {
                dateGroups[fromKey].push(bol.from);
            } else {
                dateGroups[fromKey] = [bol.from];
            }

            if (dateGroups[toKey]) {
                dateGroups[toKey].push(bol.to);
            } else {
                dateGroups[toKey] = [bol.to];
            }
        }

        return Object.keys(dateGroups).map((key) => ({
            date: new Date(key.split('_')[1]),
            stops: dateGroups[key],
        }));
    };

    const stops = getStops();

    return (
        <Box sx={{ display: 'flex' }}>
            {stops.map((stop, stopIndex) => (
                <Box key={itinerary._id + '_' + stopIndex}>
                    <Box>
                        <Typography variant="caption" color="textSecondary">
                            {stop.stops[0].company.name}
                        </Typography>
                    </Box>
                    <Box p={0.5} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                            sx={{
                                height: 24,
                                width: 24,
                                borderRadius: 12,
                                background: palette.background.paper,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography
                                sx={{ fontSize: '.75rem', fontWeight: 800 }}
                            >
                                {format(new Date(stop.date), 'd')}
                            </Typography>
                        </Box>
                        {stopIndex !== stops.length - 1 && (
                            <Box>
                                <Box
                                    sx={{
                                        width: 100,
                                        height: 2,
                                        background: palette.divider,
                                    }}
                                />
                            </Box>
                        )}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default ItineraryTimeline;
