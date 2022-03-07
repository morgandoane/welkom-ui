import {
    Box,
    Button,
    Divider,
    List,
    ListItem,
    ListItemText,
    Tab,
    Tabs,
    Typography,
    useTheme,
} from '@mui/material';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import SmartTable from '../../../../components/display/SmartTable';
import AppNav from '../../../../components/Layout/AppNav/components';
import NavContent from '../../../../components/Layout/AppNav/components/NavContent';
import {
    DesignCategory,
    DesignFilter,
    DesignLocation,
} from '../../../../graphql/inputsTypes';
import { TinyDesign } from '../../../../graphql/schema/Design/Design';
import { useDesigns } from '../../../../graphql/schema/Design/useDesigns';
import { dateFormats } from '../../../../utils/dateFormats';
import { Pagination } from '../../../../utils/types/Pagination';

export const locationNames: Record<DesignLocation, string> = {
    [DesignLocation.Draper]: 'Draper',
    [DesignLocation.WestJordan]: 'West Jordan',
    [DesignLocation.Misc]: 'Misc',
};
export const categoryNames: Record<DesignCategory, string> = {
    [DesignCategory.Conveyor]: 'Conveyors',
    [DesignCategory.Oven]: 'Ovens',
    [DesignCategory.Packing]: 'Packing',
    [DesignCategory.Sprial]: 'Sprials',
};

const DesignList = (): ReactElement => {
    const { location, category } = useParams();
    const nav = useNavigate();
    const { palette, shape } = useTheme();

    const [filter, setFilter] = React.useState<DesignFilter>({
        skip: 0,
        take: 50,
        part_number: '',
    });

    const [designs, setDesigns] = React.useState<Pagination<TinyDesign>>({
        count: 0,
        items: [],
    });

    const { error, loading } = useDesigns({
        variables: {
            filter: {
                ...filter,
                location: location ? (location as DesignLocation) : undefined,
                category: category ? (category as DesignCategory) : undefined,
            },
        },
        skip: !location || !category,
        onCompleted: (data) => setDesigns(data.designs),
        fetchPolicy: 'network-only',
    });

    return (
        <AppNav error={error} loading={loading}>
            <NavContent>
                {{
                    header: (
                        <Box
                            sx={{
                                borderBottom: `1px solid ${palette.divider}`,
                            }}
                        >
                            <Typography variant="crisp">Design</Typography>
                            <Box p={1} />
                            <Tabs
                                value={Object.keys(DesignLocation).indexOf(
                                    location || ''
                                )}
                            >
                                {Object.keys(DesignLocation).map(
                                    (locationKey) => (
                                        <Tab
                                            key={'tab_' + locationKey}
                                            label={
                                                locationNames[
                                                    locationKey as DesignLocation
                                                ]
                                            }
                                            onClick={() =>
                                                nav(
                                                    `/design/list/${locationKey}/${
                                                        category || ''
                                                    }`
                                                )
                                            }
                                        ></Tab>
                                    )
                                )}
                            </Tabs>
                        </Box>
                    ),
                    content: (
                        <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'stretch',
                                gap: 6,
                            }}
                        >
                            <Box>
                                <Box
                                    sx={{
                                        ...shape,
                                        border: `1px solid ${palette.divider}`,
                                    }}
                                >
                                    <List disablePadding>
                                        {Object.keys(DesignCategory).map(
                                            (cat) => (
                                                <ListItem
                                                    selected={cat == category}
                                                    button
                                                    divider
                                                    key={'tab_' + cat}
                                                    onClick={() => {
                                                        nav(
                                                            `/design/list/${location}/${cat}`
                                                        );
                                                    }}
                                                >
                                                    <ListItemText
                                                        sx={{
                                                            paddingRight: 8,
                                                        }}
                                                        primary={
                                                            categoryNames[
                                                                cat as DesignCategory
                                                            ]
                                                        }
                                                    />
                                                </ListItem>
                                            )
                                        )}
                                    </List>
                                </Box>
                            </Box>
                            {location && category && (
                                <Box
                                    sx={{
                                        flex: 1,
                                        display: 'flex',
                                        flexFlow: 'column',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography variant="h6">
                                            {
                                                categoryNames[
                                                    category as DesignCategory
                                                ]
                                            }
                                        </Typography>
                                        <Button
                                            startIcon={<MdAdd />}
                                            onClick={() => {
                                                if (location && category)
                                                    nav('new');
                                            }}
                                        >
                                            Design
                                        </Button>
                                    </Box>
                                    <Box p={0.5} />
                                    <Divider />

                                    <Box sx={{ flex: 1, overflow: 'auto' }}>
                                        <SmartTable
                                            data={designs.items}
                                            getProps={(design) => ({
                                                id: design._id,
                                                onClick: (design) =>
                                                    nav(
                                                        `/design/detail/${design._id}`
                                                    ),
                                            })}
                                        >
                                            {{
                                                ['Part number']: (design) =>
                                                    design.part_number,
                                                Description: (design) =>
                                                    design.description || '',
                                                ['Created by']: (design) =>
                                                    design.created_by.name,
                                                ['Date created']: (design) =>
                                                    format(
                                                        new Date(
                                                            design.date_created
                                                        ),
                                                        dateFormats.condensedDate
                                                    ),
                                            }}
                                        </SmartTable>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    ),
                }}
            </NavContent>
        </AppNav>
    );
};

export default DesignList;
