import { cloneDeep } from '@apollo/client/utilities';
import { Box, Button, Typography, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Anima from '../../../../../../components/Anima';
import AppNav from '../../../../../../components/AppNav';
import CompanyField from '../../../../../../components/Forms/components/CompanyField';
import SearchField from '../../../../../../components/Forms/components/SearchField';
import ColumnBox from '../../../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../../../components/PageTitle';
import SmartTable from '../../../../../../components/SmartTable';
import { useItineraries } from '../../../../../../graphql/queries/itinerary/useItineraries';
import { Itinerary } from '../../../../../../graphql/schema/Itinerary/Itinerary';
import { ItineraryFilter } from '../../../../../../graphql/schema/Itinerary/ItineraryFilter';

const ItineraryList = (): ReactElement => {
    const nav = useNavigate();
    const { palette, shape, transitions } = useTheme();
    const [filter, setFilter] = React.useState<ItineraryFilter>({
        skip: 0,
        take: 25,
    });

    const [filters, setFilters] = React.useState(false);

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

    return (
        <AppNav error={error} loading={loading}>
            <ColumnBox>
                {{
                    header: (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PageTitle>
                                {['Transportation', 'Itineraries']}
                            </PageTitle>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                }}
                            > */}
                            <Box sx={{ flex: 1 }} />
                            {/* <Button
                                    variant="outlined"
                                    endIcon={
                                        <Anima in={filters} type="rotate">
                                            <Box sx={{ display: 'flex' }}>
                                                <MdChevronLeft />
                                            </Box>
                                        </Anima>
                                    }
                                    onClick={() => setFilters(!filters)}
                                >
                                    {filters ? 'Hide filters' : 'Show filters'}
                                </Button> */}
                            <Button
                                startIcon={<MdAdd />}
                                onClick={() => nav('new')}
                            >
                                Create Itinerary
                            </Button>
                            {/* </Box> */}
                        </Box>
                    ),
                    content: (
                        <Box sx={{ height: '100%', display: 'flex' }}>
                            <Box sx={{ flex: 1 }}>
                                <SmartTable
                                    data={items}
                                    getProps={(d) => ({
                                        id: d._id,
                                        onClick: (d) => nav(d._id),
                                    })}
                                    pagination={{
                                        skip: filter.skip,
                                        take: filter.take,
                                        count,
                                        setPage: (p) => {
                                            setFilter({
                                                ...filter,
                                                skip:
                                                    p == 1
                                                        ? 0
                                                        : (p - 1) * filter.take,
                                            });
                                        },
                                    }}
                                    controls={{
                                        Carrier: (
                                            <Box>
                                                <CompanyField
                                                    label="Carrier"
                                                    naked
                                                    value={
                                                        filter.carrier || null
                                                    }
                                                    onChange={(val) => {
                                                        setFilter({
                                                            ...filter,
                                                            carrier:
                                                                val ||
                                                                undefined,
                                                        });
                                                    }}
                                                />
                                            </Box>
                                        ),
                                        ['Itinerary number']: (
                                            <Box>
                                                <SearchField
                                                    label="Itinerary #"
                                                    naked
                                                    value={filter.code || ''}
                                                    onChange={(val) => {
                                                        setFilter({
                                                            ...filter,
                                                            code:
                                                                val ||
                                                                undefined,
                                                        });
                                                    }}
                                                />
                                            </Box>
                                        ),
                                    }}
                                >
                                    {{
                                        ['Itinerary number']: (d) =>
                                            d.code || 'None yet',
                                        Carrier: (d) =>
                                            d.carrier?.name || 'Unassigned',
                                        ['Pickup(s)']: (d) =>
                                            d.bols
                                                .map((b) => b.from.company.name)
                                                .join(', '),
                                        ['Dropoff(s)']: (d) =>
                                            d.bols
                                                .map((b) => b.to.company.name)
                                                .join(', '),
                                        ['BOL Number(s)']: (d) =>
                                            d.bols
                                                .map((b) => b.code || '')
                                                .join(', '),
                                    }}
                                </SmartTable>
                            </Box>
                            <Box
                                sx={{
                                    width: filters ? 300 : 0,
                                    transition: transitions.create('width', {
                                        duration: 250,
                                    }),
                                    display: 'flex',
                                    flexFlow: 'column',
                                    paddingTop: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        background: palette.background.paper,
                                        flex: 1,
                                    }}
                                ></Box>
                            </Box>
                        </Box>
                    ),
                }}
            </ColumnBox>
        </AppNav>
    );
};

export default ItineraryList;
