import { Box, Button, Typography, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdChevronLeft, MdLocalShipping } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import AppNav from '../../../../../../components/AppNav';
import ColumnBox from '../../../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../../../components/PageTitle';
import TabFade from '../../../../../../components/TabFade';
import { useItinerary } from '../../../../../../graphql/queries/itinerary/useItinerary';
import ItineraryDetails from './components/ItineraryDetails';
import ItineraryDocuments from './components/ItineraryDocuments';
import ItinerarySchedule from './components/ItinerarySchedule';

const ItineraryDetail = (): ReactElement => {
    const { id } = useParams();
    const nav = useNavigate();

    const { palette } = useTheme();

    const { data, error, loading, refetch } = useItinerary({
        variables: {
            id: id || '',
        },
    });

    // const [state, setState] = React.useState()

    const itinerary = data ? data.itinerary : null;

    return (
        <AppNav error={error} loading={loading}>
            {itinerary && (
                <ColumnBox>
                    {{
                        header: (
                            <Box sx={{ marginBottom: -2 }}>
                                <Button
                                    startIcon={<MdChevronLeft />}
                                    color="inherit"
                                    variant="text"
                                    onClick={() =>
                                        nav('/logistics/transportation')
                                    }
                                >
                                    Transportation
                                </Button>
                                {itinerary.deleted && (
                                    <Typography color="error">
                                        <em>Deleted!</em>
                                    </Typography>
                                )}
                                <Box p={0.5} />
                                <PageTitle>
                                    {['Itinerary', itinerary.code]}
                                </PageTitle>
                            </Box>
                        ),
                        content: (
                            <TabFade>
                                {{
                                    Schedule: (
                                        <ItinerarySchedule
                                            itinerary={itinerary}
                                        />
                                    ),
                                    Details: (
                                        <ItineraryDetails
                                            itinerary={itinerary}
                                        />
                                    ),
                                    Documents: (
                                        <ItineraryDocuments
                                            itinerary={itinerary}
                                            refetch={() => refetch()}
                                        />
                                    ),
                                }}
                            </TabFade>
                        ),
                    }}
                </ColumnBox>
            )}
        </AppNav>
    );
};

export default ItineraryDetail;
