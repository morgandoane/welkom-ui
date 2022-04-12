import { Box, MenuItem, TextField, Typography, useTheme } from '@mui/material/';
import React, { ReactElement } from 'react';
import { MdAdd, MdLock } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import DataIcon from '../../../../../../components/display/DataIcon';
import SmartTable from '../../../../../../components/display/SmartTable';
import AppFab from '../../../../../../components/Inputs/AppFab';
import SearchInput from '../../../../../../components/Inputs/SearchInput';
import AppNav from '../../../../../../components/Layout/AppNav/components';
import NavContent from '../../../../../../components/Layout/AppNav/components/NavContent';
import { useInternalCompany } from '../../../../../../graphql/schema/Company/useInternalCompany';
import { TinyItinerary } from '../../../../../../graphql/schema/Itinerary/Itinerary';
import { ItineraryFilter } from '../../../../../../graphql/schema/Itinerary/ItineraryFilter';
import { useItineraries } from '../../../../../../graphql/schema/Itinerary/useItineraries';
import { Pagination } from '../../../../../../utils/types/Pagination';

const ItineraryList = (): ReactElement => {
    const nav = useNavigate();

    const { palette } = useTheme();

    const [filter, setFilter] = React.useState<ItineraryFilter>({
        skip: 0,
        take: 50,
        internal: true,
    });

    const {
        company,
        error: internalCompanyError,
        loading: internalCompanyLoading,
    } = useInternalCompany({});

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
        fetchPolicy: 'network-only',
    });

    return (
        <AppNav error={error || internalCompanyError} loading={loading}>
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
                            <Typography variant="crisp">Itineraries</Typography>
                            <AppFab onClick={() => nav('new')} icon={<MdAdd />}>
                                Itinerary
                            </AppFab>
                        </Box>
                    ),
                    content: (
                        <SmartTable
                            data={itineraries}
                            getProps={(d) => ({
                                id: d._id,
                                onClick: (d) => nav(d._id),
                            })}
                            controls={{
                                Type: (
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                        select
                                        value={
                                            filter.internal
                                                ? 'Chartered by LDB'
                                                : 'All Itineraries'
                                        }
                                        onChange={(e) => {
                                            if (
                                                e.target.value ==
                                                'Chartered by LDB'
                                            ) {
                                                setFilter({
                                                    ...filter,
                                                    internal: true,
                                                });
                                            } else {
                                                setFilter({
                                                    ...filter,
                                                    internal: undefined,
                                                });
                                            }
                                        }}
                                    >
                                        <MenuItem value={'Chartered by LDB'}>
                                            Chartered by LDB
                                        </MenuItem>
                                        <MenuItem value={'All Itineraries'}>
                                            All Itineraries
                                        </MenuItem>
                                    </TextField>
                                ),
                                ['Linked order']: (
                                    <SearchInput
                                        placeholder="Linked order"
                                        value={filter.order_link || ''}
                                        onChange={(order_link) =>
                                            setFilter({
                                                ...filter,
                                                order_link:
                                                    order_link || undefined,
                                            })
                                        }
                                    />
                                ),
                                ['Pro #']: (
                                    <SearchInput
                                        placeholder="Pro #"
                                        value={filter.code || ''}
                                        onChange={(code) =>
                                            setFilter({
                                                ...filter,
                                                code: code || undefined,
                                            })
                                        }
                                    />
                                ),
                                Carrier: (
                                    <SearchInput
                                        placeholder="Carrier"
                                        value={filter.carrier || ''}
                                        onChange={(carrier) =>
                                            setFilter({
                                                ...filter,
                                                carrier: carrier || undefined,
                                            })
                                        }
                                    />
                                ),
                            }}
                        >
                            {{
                                Status: (itin) => (
                                    <DataIcon type="Itinerary">
                                        {itin.status}
                                    </DataIcon>
                                ),
                                Type: (itin) => {
                                    if (
                                        itin.bols.some(
                                            (bol) =>
                                                company &&
                                                bol.from.company._id ==
                                                    company._id
                                        ) ||
                                        !itin.order_link
                                    )
                                        return 'Chartered by LDB';
                                    return ' ';
                                },
                                ['Linked order']: (itin) => (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        {itin.order_link && (
                                            <MdLock
                                                style={{
                                                    color: palette.text
                                                        .secondary,
                                                }}
                                            />
                                        )}
                                        {itin.order_link
                                            ? itin.order_link.po
                                            : '-'}
                                    </Box>
                                ),
                                ['Pro #']: (itin) => itin.code || '-',
                                Carrier: (itin) =>
                                    itin.carrier ? itin.carrier.name : '-',
                                From: (itin) => {
                                    const firstBol = [...itin.bols].sort(
                                        (a, b) => {
                                            const dateA = new Date(
                                                a.from.date
                                            ).getTime();
                                            const dateB = new Date(
                                                b.from.date
                                            ).getTime();
                                            return dateA > dateB ? 1 : -1;
                                        }
                                    )[0];

                                    if (!firstBol) return '-';

                                    return (
                                        firstBol.from.company.name +
                                        (firstBol.from.location
                                            ? ` - ${firstBol.from.location?.label}`
                                            : '')
                                    );
                                },
                                To: (itin) => {
                                    const firstBol = [...itin.bols].sort(
                                        (a, b) => {
                                            const dateA = new Date(
                                                a.from.date
                                            ).getTime();
                                            const dateB = new Date(
                                                b.from.date
                                            ).getTime();
                                            return dateA > dateB ? 1 : -1;
                                        }
                                    )[0];

                                    if (!firstBol) return '-';

                                    return (
                                        firstBol.to.company.name +
                                        (firstBol.to.location
                                            ? ` - ${firstBol.to.location?.label}`
                                            : '')
                                    );
                                },
                                ['Additional stops']: (itin) => {
                                    const sorted = [...itin.bols].sort(
                                        (a, b) => {
                                            const dateA = new Date(
                                                a.from.date
                                            ).getTime();
                                            const dateB = new Date(
                                                b.from.date
                                            ).getTime();
                                            return dateA > dateB ? 1 : -1;
                                        }
                                    );

                                    if (sorted.length > 1)
                                        return sorted
                                            .slice(1)
                                            .map((bol) => bol.to.company.name)
                                            .join(', ');

                                    return '-';
                                },
                            }}
                        </SmartTable>
                    ),
                }}
            </NavContent>
        </AppNav>
    );
};

export default ItineraryList;
