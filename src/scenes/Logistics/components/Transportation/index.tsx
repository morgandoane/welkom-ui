import { cloneDeep } from '@apollo/client/utilities';
import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import AppNav from '../../../../components/AppNav';
import FormRow from '../../../../components/Forms/components/FormRow';
import ItemField from '../../../../components/Forms/components/ItemField';
import ColumnBox from '../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../components/PageTitle';
import SmartTable from '../../../../components/SmartTable';
import { useItineraries } from '../../../../graphql/queries/itinerary/useItineraries';
import { Itinerary } from '../../../../graphql/schema/Itinerary/Itinerary';
import { ItineraryFilter } from '../../../../graphql/schema/Itinerary/ItineraryFilter';
import ItineraryCard from './components/ItineraryCard';

const Transportation = (): ReactElement => {
    const [filter, setFilter] = React.useState<ItineraryFilter>({
        skip: 0,
        take: 25,
    });

    const [itineraries, setItineraries] = React.useState<Itinerary[]>([]);

    const { data, error, loading } = useItineraries({
        variables: { filter },
        onCompleted: (data) => {
            const copy = cloneDeep(itineraries);
            for (const item of data.itineraries.items) {
                if (!copy.map((c) => c._id).includes(item._id)) {
                    copy.push(item);
                }
            }
            setItineraries(copy);
        },
    });

    const count = data ? data.itineraries.count : 0;
    const items = data ? data.itineraries.items : [];

    // item?: string;
    // location?: string;
    // stop_date?: DateRangeInput;

    return (
        <AppNav error={error} loading={loading}>
            <ColumnBox>
                {{
                    header: (
                        <Box>
                            <PageTitle>Transportation</PageTitle>
                        </Box>
                    ),
                    content: (
                        <SmartTable
                            data={items}
                            getProps={(d) => ({ id: d._id })}
                            pagination={{
                                skip: filter.skip,
                                take: filter.take,
                                count,
                                setPage: (p) => {
                                    setFilter({
                                        ...filter,
                                        skip:
                                            p == 1 ? 0 : (p - 1) * filter.take,
                                    });
                                },
                            }}
                        >
                            {{
                                ['Itinerary number']: (d) =>
                                    d.code || 'None yet',
                                Carrier: (d) => d.carrier?.name || 'Unassigned',
                                ['Pickup(s)']: (d) =>
                                    d.bols
                                        .map((b) => b.from.company.name)
                                        .join(', '),
                                ['Dropoff(s)']: (d) =>
                                    d.bols
                                        .map((b) => b.to.company.name)
                                        .join(', '),
                                ['BOL Number(s)']: (d) =>
                                    d.bols.map((b) => b.code || '').join(', '),
                            }}
                        </SmartTable>
                    ),
                }}
            </ColumnBox>
        </AppNav>
    );
};

export default Transportation;
