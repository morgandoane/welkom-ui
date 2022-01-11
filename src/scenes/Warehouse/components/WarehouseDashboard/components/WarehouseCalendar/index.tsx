import { Box, useTheme } from '@mui/material';
import format from 'date-fns/format';
import React, { ReactElement } from 'react';
import {
    MdCheckCircle,
    MdDownloading,
    MdLocalShipping,
    MdRadioButtonUnchecked,
} from 'react-icons/md';
import BolIcon from '../../../../../../components/BolIcon';
import Calendar, {
    EventGroupProps,
} from '../../../../../../components/Calendar';
import LocationField from '../../../../../../components/Forms/components/LocationField';
import {
    TinyBol,
    useTinyBols,
} from '../../../../../../graphql/queries/bols/useTinyBols';
import { BolStatus } from '../../../../../../graphql/schema/Bol/Bol';
import { BolFilter } from '../../../../../../graphql/schema/Bol/BolFilter';
import { getCalendarRange } from '../../../../../../hooks/useCalendarRange';
import { useMemory } from '../../../../../../hooks/useMemory';
import { dateFormats } from '../../../../../../utils/dateFormats';
import BolPopover from './components/BolPopover';

export interface WarehouseCalendarProps {
    view: 'shipping' | 'receiving';
}

const WarehouseCalendar = (props: WarehouseCalendarProps): ReactElement => {
    const { view } = props;
    const { palette } = useTheme();

    const [focused, setFocused] = React.useState<null | {
        target: EventTarget & HTMLButtonElement;
        bol: TinyBol;
    }>(null);

    const indexFromStorage = localStorage.getItem('warehouse_index');
    const locationFromStorage = localStorage.getItem('warehouse_location');

    const [index, setIndex] = React.useState(
        indexFromStorage && !isNaN(parseInt(indexFromStorage))
            ? parseInt(indexFromStorage)
            : 0
    );

    React.useEffect(() => {
        localStorage.setItem('warehouse_index', index + '');
    }, [index]);

    const [location, setLocation] = React.useState(
        locationFromStorage ? locationFromStorage : ''
    );

    React.useEffect(() => {
        localStorage.setItem('warehouse_location', location + '');
    }, [location]);

    const [filter, setFilter] = React.useState<BolFilter>({
        skip: 0,
        take: 200,
        [view == 'receiving' ? 'to_location' : 'from_location']:
            location || undefined,
    });

    const { data, error, loading } = useTinyBols({
        variables: {
            filter: {
                ...filter,
                skip: parseInt(filter.skip + ''),
                take: parseInt(filter.take + ''),
                [view == 'receiving' ? 'to_location' : 'from_location']:
                    location,
                [view == 'receiving'
                    ? 'scheduled_dropoff_date'
                    : 'scheduled_pickup_date']: getCalendarRange(
                    new Date(),
                    index
                ),
            },
        },
        skip: !location,
    });

    const bols = data ? data.bols.items : [];
    const itineraries = bols.map((bol) => bol.itinerary);

    const getBolGroups = (): EventGroupProps<TinyBol>[] => {
        const groupedByDate: Record<string, TinyBol[]> = {};

        // group the bols by date
        for (const bol of bols) {
            const dateVal = new Date(
                bol[view == 'shipping' ? 'from' : 'to'].date
            );
            const dateKey = format(dateVal, dateFormats.fullDate);

            if (groupedByDate[dateKey]) groupedByDate[dateKey].push(bol);
            else groupedByDate[dateKey] = [bol];
        }

        // for each date group, group the bols by itinerary
        const eventGroups: EventGroupProps<TinyBol>[] = [];

        for (const dateKey of Object.keys(groupedByDate)) {
            const date = new Date(dateKey);
            const events = groupedByDate[dateKey];

            const groupedByItinerary: Record<string, TinyBol[]> = {};

            for (const event of events) {
                if (groupedByItinerary[event.itinerary._id])
                    groupedByItinerary[event.itinerary._id].push(event);
                else groupedByItinerary[event.itinerary._id] = [event];
            }

            for (const itinerary_id of Object.keys(groupedByItinerary)) {
                const itinerary = itineraries.find(
                    (i) => i._id === itinerary_id
                );
                const bols = groupedByItinerary[itinerary_id];

                if (itinerary)
                    eventGroups.push({
                        date,
                        label:
                            bols.length > 1
                                ? {
                                      primary: itinerary.code,
                                      icon: (
                                          <Box
                                              sx={{
                                                  display: 'flex',
                                                  color: palette.text.secondary,
                                              }}
                                          >
                                              <MdLocalShipping />
                                          </Box>
                                      ),
                                  }
                                : undefined,
                        events: bols,
                    });
            }
        }

        return eventGroups;
    };

    return (
        <React.Fragment>
            <Calendar
                loading={loading}
                error={error}
                index={index}
                onIndex={(d, range) => {
                    setIndex(d);
                    setFilter({
                        skip: filter.skip,
                        take: filter.take,
                        [view == 'receiving'
                            ? 'scheduled_dropoff_date'
                            : 'scheduled_pickup_date']: getCalendarRange(
                            new Date(),
                            index
                        ),
                        [view == 'receiving' ? 'to_location' : 'from_location']:
                            filter[
                                view == 'receiving'
                                    ? 'to_location'
                                    : 'from_location'
                            ],
                    });
                }}
                eventGroups={getBolGroups()}
                getEventProps={(bol, index) => ({
                    id: bol._id,
                    event: bol,
                    icon: <BolIcon view={view} bol={bol} />,
                    primary: bol.contents
                        .map((c) => `${c.item.english}`)
                        .join(', '),
                    secondary: bol.contents
                        .map(
                            (c) =>
                                `${c.quantity} ${
                                    c.unit[
                                        c.quantity == 1
                                            ? 'english'
                                            : 'english_plural'
                                    ]
                                }`
                        )
                        .join(', '),
                    onClick: (bol, event) => {
                        setFocused({ bol, target: event.currentTarget });
                    },
                })}
                actions={
                    <Box sx={{ display: 'flex', flexFlow: 'row', gap: 2 }}>
                        <Box sx={{ width: 200 }}>
                            <LocationField
                                mine
                                naked
                                value={location}
                                onChange={(val) => {
                                    setLocation(val || '');
                                }}
                            />
                        </Box>
                    </Box>
                }
            />
            <BolPopover
                view={view}
                focus={focused}
                onClose={() => setFocused(null)}
            />
        </React.Fragment>
    );
};

export default WarehouseCalendar;
