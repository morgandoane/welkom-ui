import { Box, Divider, Typography, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { Itinerary } from '../../../../../../graphql/schema/Itinerary/Itinerary';
import ItineraryTimeline from './components/ItineraryTimeline';

export interface ItineraryCardProps {
    itinerary: Itinerary;
}

const ItineraryCard = (props: ItineraryCardProps): ReactElement => {
    const { itinerary } = props;

    const { palette, shape, transitions } = useTheme();

    return (
        <Box sx={{ ...shape, border: `1px solid ${palette.divider}`, p: 2 }}>
            <Typography variant="h6">{itinerary.code}</Typography>
            <Typography>
                {itinerary.carrier
                    ? 'Carried by ' + itinerary.carrier.name
                    : 'No carrier assigned'}
            </Typography>
            <Box p={1} />
            <ItineraryTimeline itinerary={itinerary} />
        </Box>
    );
};

export default ItineraryCard;
