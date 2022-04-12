import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../../../../components/Inputs/BackButton';
import AppNav from '../../../../../../components/Layout/AppNav/components';
import NavContent from '../../../../../../components/Layout/AppNav/components/NavContent';
import { useItinerary } from '../../../../../../graphql/schema/Itinerary/useItinerary';

const ItineraryDetail = (): ReactElement => {
    const { id } = useParams();
    const nav = useNavigate();
    const { data, error, loading } = useItinerary({
        variables: { id: id || '' },
        skip: !id,
    });

    const itin = data ? data.itinerary : null;

    return (
        <AppNav loading={loading} error={error}>
            {itin && (
                <NavContent>
                    {{
                        header: (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexFlow: 'column',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <BackButton
                                    onClick={() =>
                                        nav('/supplychain/itineraries')
                                    }
                                >
                                    Itineraries
                                </BackButton>
                                <Typography variant="crisp">
                                    {itin.code || 'Itinerary'}
                                </Typography>
                                <Typography>
                                    {!itin.code && !itin.carrier
                                        ? 'No Pro# or Carrier has been assigned.'
                                        : !itin.code
                                        ? 'No Pro# has been assigned.'
                                        : !itin.carrier
                                        ? 'No Carrier has been assigned.'
                                        : `Carried by ${itin.carrier.name}`}
                                </Typography>
                            </Box>
                        ),
                    }}
                </NavContent>
            )}
        </AppNav>
    );
};

export default ItineraryDetail;
