import {
    Box,
    Button,
    IconButton,
    Popover,
    Typography,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { Itinerary } from '../../../../../../../../graphql/schema/Itinerary/Itinerary';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
} from '@mui/lab';
import { dateFormats } from '../../../../../../../../utils/dateFormats';
import { format } from 'date-fns';
import {
    MdAdd,
    MdCheck,
    MdChevronRight,
    MdEdit,
    MdRadioButtonChecked,
    MdRadioButtonUnchecked,
} from 'react-icons/md';
import {
    Fulfillment,
    FulfillmentType,
} from '../../../../../../../../graphql/schema/Fulfillment/Fulfillment';
import { useNavigate } from 'react-router-dom';
import AppFab from '../../../../../../../../components/AppFab';
import { BiRefresh } from 'react-icons/bi';
import { useItineraryUpdate } from '../../../../../../../../graphql/mutations/itinerary/useItineraryUpdate';
import { ItineraryQuery } from '../../../../../../../../graphql/queries/itinerary/useItinerary';

export interface ItineraryScheduleProps {
    itinerary: Itinerary;
}

const ItinerarySchedule = (props: ItineraryScheduleProps): ReactElement => {
    const { itinerary } = props;

    const { palette, shape, transitions } = useTheme();
    const nav = useNavigate();

    const [focused, setFocused] = React.useState<{
        element: Element;
        fulfillments: Fulfillment[];
    } | null>(null);

    const [closing, setClosing] = React.useState(false);

    React.useEffect(() => {
        if (closing) {
            const timeout = setTimeout(() => {
                setClosing(false);
                setFocused(null);
            }, 150);

            return () => clearTimeout(timeout);
        }
    }, [closing]);

    const [handleUpdate, { loading: updateLoading }] = useItineraryUpdate({
        refetchQueries: [ItineraryQuery],
    });

    return (
        <Box sx={{ paddingTop: 3 }}>
            <Typography color="textSecondary" variant="body2">
                Carried by
            </Typography>
            <Typography variant="h6">
                {itinerary.carrier ? itinerary.carrier.name : 'Unassigned'}
            </Typography>
            <Box p={1} />
            <Typography color="textSecondary" variant="body2">
                BOLs
            </Typography>
            {itinerary.bols.length == 0 && (
                <Typography variant="h6">None yet</Typography>
            )}
            <Box p={0.5} />
            <Box sx={{ display: 'flex' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexFlow: 'column',
                        gap: 2,
                    }}
                >
                    {itinerary.bols.map((bol) => (
                        <Box
                            key={'card_' + bol._id}
                            style={{
                                ...shape,
                                border: `1px solid ${palette.divider}`,
                                minWidth: 400,
                            }}
                        >
                            <Box
                                sx={{
                                    background: palette.background.paper,
                                    borderBottom: `1px solid ${palette.divider}`,
                                    p: 2,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography variant="h6">
                                    {bol.code || 'BOL'}
                                </Typography>

                                <IconButton
                                    onClick={() => nav(`bols/${bol._id}`)}
                                >
                                    <MdEdit />
                                </IconButton>
                            </Box>
                            <Box>
                                <Timeline
                                    sx={{
                                        alignItems: 'flex-start',
                                        padding: 0,
                                    }}
                                >
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot
                                                sx={{
                                                    width: 12,
                                                    height: 12,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background:
                                                        bol.shipments.length > 0
                                                            ? palette.success
                                                                  .main
                                                            : palette.action
                                                                  .disabled,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        fontSize: '1.2rem',
                                                    }}
                                                >
                                                    {bol.shipments.length >
                                                        0 && <MdCheck />}
                                                </Box>
                                            </TimelineDot>
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Box sx={{ width: 300 }}>
                                                <Typography variant="h6">
                                                    Pickup
                                                </Typography>
                                                <Typography>
                                                    {bol.from.company.name +
                                                        (bol.from.location
                                                            ? ` - ${
                                                                  bol.from
                                                                      .location
                                                                      .label ||
                                                                  bol.from
                                                                      .location
                                                                      .address
                                                                      ?.city
                                                              }`
                                                            : '')}
                                                </Typography>
                                                {bol.contents.map(
                                                    (content, i) => (
                                                        <Typography
                                                            key={
                                                                bol._id +
                                                                '_content_' +
                                                                i
                                                            }
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            {`${
                                                                content.item
                                                                    .english
                                                            } - ${
                                                                content.quantity
                                                            } ${
                                                                content.unit[
                                                                    content.quantity ==
                                                                    1
                                                                        ? 'english'
                                                                        : 'english_plural'
                                                                ]
                                                            }`}
                                                        </Typography>
                                                    )
                                                )}
                                                <Typography
                                                    color="textSecondary"
                                                    variant="body2"
                                                >
                                                    {format(
                                                        new Date(bol.from.date),
                                                        dateFormats.condensedDate
                                                    )}
                                                </Typography>
                                                {bol.shipments.length > 0 && (
                                                    <Button
                                                        onClick={(e) =>
                                                            setFocused({
                                                                element:
                                                                    e.currentTarget,
                                                                fulfillments:
                                                                    bol.shipments,
                                                            })
                                                        }
                                                        size="small"
                                                        variant="text"
                                                        sx={{
                                                            marginLeft: -0.5,
                                                        }}
                                                    >
                                                        {bol.shipments.length ==
                                                        1
                                                            ? 'View shipment'
                                                            : 'View shipments'}
                                                    </Button>
                                                )}
                                            </Box>
                                        </TimelineContent>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot
                                                sx={{
                                                    width: 12,
                                                    height: 12,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background:
                                                        bol.receipts.length > 0
                                                            ? palette.success
                                                                  .main
                                                            : palette.action
                                                                  .disabled,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        fontSize: '1.2rem',
                                                    }}
                                                >
                                                    {bol.receipts.length >
                                                        0 && <MdCheck />}
                                                </Box>
                                            </TimelineDot>
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Box sx={{ width: 300 }}>
                                                <Typography variant="h6">
                                                    Dropoff
                                                </Typography>
                                                <Typography>
                                                    {bol.to.company.name +
                                                        (bol.to.location
                                                            ? ` - ${
                                                                  bol.to
                                                                      .location
                                                                      .label ||
                                                                  bol.to
                                                                      .location
                                                                      .address
                                                                      ?.city
                                                              }`
                                                            : '')}
                                                </Typography>
                                                <Typography
                                                    color="textSecondary"
                                                    variant="body2"
                                                >
                                                    {format(
                                                        new Date(bol.to.date),
                                                        dateFormats.condensedDate
                                                    )}
                                                </Typography>
                                                {bol.receipts.length > 0 && (
                                                    <Button
                                                        onClick={(e) =>
                                                            setFocused({
                                                                element:
                                                                    e.currentTarget,
                                                                fulfillments:
                                                                    bol.receipts,
                                                            })
                                                        }
                                                        size="small"
                                                        variant="text"
                                                        sx={{
                                                            marginLeft: -0.5,
                                                        }}
                                                    >
                                                        {bol.receipts.length ==
                                                        1
                                                            ? 'View receipt'
                                                            : 'View receipts'}
                                                    </Button>
                                                )}
                                            </Box>
                                        </TimelineContent>
                                    </TimelineItem>
                                </Timeline>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box p={1.5} />
            <Button onClick={() => nav('bols/new')} startIcon={<MdAdd />}>
                {itinerary.bols.length == 0 ? 'Add BOL' : 'Add another BOL'}
            </Button>
            <Box p={6} />
            <Popover
                anchorEl={focused?.element || null}
                open={Boolean(focused) && !closing}
                onClose={() => setClosing(true)}
            >
                {focused && (
                    <Box>
                        {focused.fulfillments.map((item, index) => (
                            <Box
                                key={item._id}
                                sx={{
                                    padding: 2,
                                    borderBottom: `1px solid ${palette.divider}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 4,
                                }}
                            >
                                <Box sx={{ flex: 1 }}>
                                    <Typography>
                                        {format(
                                            new Date(item.date_created),
                                            dateFormats.condensedDate +
                                                ' ' +
                                                dateFormats.time
                                        )}
                                    </Typography>
                                    <Typography>
                                        {item.created_by.name}
                                    </Typography>
                                </Box>
                                <IconButton
                                    onClick={() => {
                                        window
                                            .open(
                                                `${
                                                    location
                                                        .toString()
                                                        .split('/logistics')[0]
                                                }/warehouse/${
                                                    item.type ===
                                                    FulfillmentType.Receipt
                                                        ? 'receiving'
                                                        : 'shipping'
                                                }/${item.bol._id}/${item._id}`,
                                                '_blank'
                                            )
                                            ?.focus();
                                    }}
                                >
                                    <MdChevronRight />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
                )}
            </Popover>
            <AppFab
                icon={itinerary.deleted ? <BiRefresh /> : <MdEdit />}
                onClick={() => {
                    if (itinerary.deleted) {
                        handleUpdate({
                            variables: {
                                id: itinerary._id,
                                data: { deleted: false },
                            },
                        });
                    } else {
                        nav(`${itinerary.orders[0]._id}/edit`);
                    }
                }}
            >
                {itinerary.deleted ? 'Reinstate' : 'Edit itinerary'}
            </AppFab>
        </Box>
    );
};

export default ItinerarySchedule;
