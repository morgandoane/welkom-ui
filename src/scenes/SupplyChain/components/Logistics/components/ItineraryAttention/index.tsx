import { Box, Typography, useTheme } from '@mui/material/';
import React, { ReactElement } from 'react';
import { MdAdd, MdLock } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import SmartTable from '../../../../../../components/display/SmartTable';
import AppFab from '../../../../../../components/Inputs/AppFab';
import AppNav from '../../../../../../components/Layout/AppNav/components';
import NavContent from '../../../../../../components/Layout/AppNav/components/NavContent';
import { TinyItinerary } from '../../../../../../graphql/schema/Itinerary/Itinerary';
import { ItineraryFilter } from '../../../../../../graphql/schema/Itinerary/ItineraryFilter';
import { useItineraries } from '../../../../../../graphql/schema/Itinerary/useItineraries';
import { Pagination } from '../../../../../../utils/types/Pagination';

const ItineraryAttention = (): ReactElement => {
    const nav = useNavigate();

    const { palette } = useTheme();

    const [filter, setFilter] = React.useState<ItineraryFilter>({
        skip: 0,
        take: 50,
    });

    const [{ count, items: itineraries }, setData] = React.useState<
        Pagination<TinyItinerary>
    >({
        count: 0,
        items: [],
    });

    const { data, error, loading } = useItineraries({
        variables: {
            filter,
        },
        onCompleted: (d) => setData(d.itineraries),
    });

    return (
        <AppNav error={error} loading={loading}>
            {data && (
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
                                <Typography variant="crisp">
                                    Itineraries
                                </Typography>
                            </Box>
                        ),
                    }}
                </NavContent>
            )}
        </AppNav>
    );
};

export default ItineraryAttention;
