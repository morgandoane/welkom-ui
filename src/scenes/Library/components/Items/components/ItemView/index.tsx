import { Box, Button, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdChevronLeft } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import AppNav from '../../../../../../components/AppNav';
import ColumnBox from '../../../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../../../components/PageTitle';
import TabFade from '../../../../../../components/TabFade';
import { useItem } from '../../../../../../graphql/queries/items/useItem';
import ItemDetails from './components/ItemDetails';
import ItemAttachments from './components/ItemAttachments';
import ItemConversions from './components/ItemConversions';

const ItemView = (): ReactElement => {
    const { id } = useParams();
    const nav = useNavigate();

    const { data, error, loading, refetch } = useItem({
        variables: { id: id || '' },
        skip: !id || id == '',
        fetchPolicy: 'network-only',
    });

    const item = !data ? null : data.item;

    return (
        <AppNav error={error} loading={loading}>
            <Box sx={{ height: '100%' }}>
                {item && (
                    <ColumnBox>
                        {{
                            header: (
                                <Box>
                                    <Button
                                        variant="text"
                                        color="inherit"
                                        startIcon={<MdChevronLeft />}
                                        sx={{ marginBottom: 2 }}
                                        onClick={() => nav('/library/items')}
                                    >
                                        Items
                                    </Button>
                                    <PageTitle>{item.english}</PageTitle>
                                    {item.deleted && (
                                        <Typography
                                            sx={{ marginTop: -1 }}
                                            color="error.main"
                                        >
                                            <em>Deleted!</em>
                                        </Typography>
                                    )}
                                </Box>
                            ),
                            content: (
                                <Box
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexFlow: 'column',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <TabFade>
                                        {{
                                            Details: (
                                                <ItemDetails
                                                    item={item}
                                                    refetch={() => refetch()}
                                                />
                                            ),
                                            Attachmnets: (
                                                <ItemAttachments
                                                    item={item}
                                                    refetch={() => refetch()}
                                                />
                                            ),
                                            ['Unit Conversions']: (
                                                <ItemConversions item={item} />
                                            ),
                                        }}
                                    </TabFade>
                                </Box>
                            ),
                        }}
                    </ColumnBox>
                )}
            </Box>
        </AppNav>
    );
};

export default ItemView;
