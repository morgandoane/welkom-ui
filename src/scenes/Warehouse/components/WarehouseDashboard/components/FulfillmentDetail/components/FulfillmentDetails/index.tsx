import {
    Avatar,
    Box,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/system';
import { endOfDay, format, isAfter, startOfDay } from 'date-fns';
import React, { ReactElement } from 'react';
import { MdCalendarToday, MdCalendarViewDay, MdLock } from 'react-icons/md';
import Details from '../../../../../../../../components/Details';
import {
    Fulfillment,
    FulfillmentType,
} from '../../../../../../../../graphql/schema/Fulfillment/Fulfillment';
import { dateFormats } from '../../../../../../../../utils/dateFormats';

export interface FulfillmentDetailsProps {
    fulfillment: Fulfillment;
}

const FulfillmentDetails = (props: FulfillmentDetailsProps): ReactElement => {
    const { fulfillment } = props;

    const { palette } = useTheme();

    const getTag = (): ReactElement => {
        const expected = new Date(
            fulfillment.bol[
                fulfillment.type === FulfillmentType.Receipt ? 'to' : 'from'
            ].date
        );

        const lateAfter = endOfDay(expected);

        const late = isAfter(new Date(fulfillment.date_created), lateAfter);

        return (
            <Tooltip
                arrow
                title={`Expected ${format(
                    new Date(
                        fulfillment.bol[
                            fulfillment.type === FulfillmentType.Receipt
                                ? 'to'
                                : 'from'
                        ].date
                    ),
                    dateFormats.condensedDate
                )}`}
            >
                <Typography
                    sx={{
                        color: late ? palette.error.main : palette.success.main,
                    }}
                >
                    <em>{late ? 'Late!' : 'On time!'}</em>
                </Typography>
            </Tooltip>
        );
    };

    return (
        <Box sx={{ paddingTop: 1, maxWidth: 400 }}>
            <List>
                <ListItem divider>
                    <ListItemAvatar>
                        <Avatar
                            src={fulfillment.created_by.picture}
                            alt={fulfillment.created_by.name}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={fulfillment.created_by.name}
                        secondary="Received by"
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
                        primary={
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                {format(
                                    new Date(fulfillment.date_created),
                                    dateFormats.condensedDate +
                                        ' ' +
                                        dateFormats.time
                                )}
                                {getTag()}
                            </Box>
                        }
                        secondary="Date received"
                    />
                </ListItem>
                {fulfillment.type === FulfillmentType.Receipt && (
                    <ListItem divider>
                        <ListItemAvatar>
                            <MdLock
                                style={{
                                    fontSize: '2.5rem',
                                    color: palette.text.disabled,
                                }}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                fulfillment.bol.seal
                                    ? fulfillment.bol.seal
                                    : 'None yet'
                            }
                            secondary="Seal"
                        />
                    </ListItem>
                )}
            </List>
        </Box>
    );
};

export default FulfillmentDetails;
