import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    useTheme,
} from '@mui/material';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { MdCalendarToday } from 'react-icons/md';
import { Itinerary } from '../../../../../../../../graphql/schema/Itinerary/Itinerary';
import { dateFormats } from '../../../../../../../../utils/dateFormats';

export interface ItineraryDetailsProps {
    itinerary: Itinerary;
}

const ItineraryDetails = (props: ItineraryDetailsProps): ReactElement => {
    const { itinerary } = props;

    const { palette, shape, transitions } = useTheme();

    return (
        <Box sx={{ maxWidth: 500 }}>
            <List>
                <ListItem divider>
                    <ListItemAvatar>
                        <Avatar
                            src={itinerary.created_by.picture}
                            alt={itinerary.created_by.name}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={itinerary.created_by.name}
                        secondary="Created by"
                    />
                </ListItem>
                <ListItem divider>
                    <ListItemAvatar>
                        <MdCalendarToday
                            style={{
                                fontSize: '2.5rem',
                                color: palette.text.disabled,
                            }}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={format(
                            new Date(itinerary.date_created),
                            dateFormats.condensedDate + ' ' + dateFormats.time
                        )}
                        secondary="Date created"
                    />
                </ListItem>
            </List>
        </Box>
    );
};

export default ItineraryDetails;
