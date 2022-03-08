import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AttachmentsTab from '../../../../../../components/display/DataTabs/AttachmentsTab';
import DetailsTab from '../../../../../../components/display/DataTabs/DetailsTab';
import BackButton from '../../../../../../components/Inputs/BackButton';
import AppNav from '../../../../../../components/Layout/AppNav/components';
import NavContent from '../../../../../../components/Layout/AppNav/components/NavContent';
import TabFade from '../../../../../../components/Layout/TabFade';
import {
    MiscItemQuery,
    useMiscItem,
} from '../../../../../../graphql/schema/Item/extensions/Misc/useMiscItem';

const MiscItem = (): ReactElement => {
    const { id } = useParams();
    const nav = useNavigate();

    const { data, error, loading } = useMiscItem({
        variables: { id: id || '' },
    });

    const miscitem = data ? data.miscItem : null;

    return (
        <AppNav error={error} loading={loading}>
            {miscitem && (
                <NavContent>
                    {{
                        header: (
                            <Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexFlow: 'column',
                                        gap: 1,
                                    }}
                                >
                                    <Box>
                                        <BackButton
                                            onClick={() =>
                                                nav('/library/miscitems')
                                            }
                                        >
                                            Misc Items
                                        </BackButton>
                                    </Box>
                                    <Typography variant="crisp">
                                        {miscitem.names.english}
                                    </Typography>
                                </Box>
                            </Box>
                        ),
                        content: (
                            <TabFade>
                                {{
                                    Details: (
                                        <DetailsTab
                                            entity="Item"
                                            data={miscitem}
                                            refetchQueries={[MiscItemQuery]}
                                        />
                                    ),
                                    Attachments: (
                                        <AttachmentsTab
                                            data={miscitem}
                                            refetchQueries={[MiscItemQuery]}
                                        />
                                    ),
                                }}
                            </TabFade>
                        ),
                    }}
                </NavContent>
            )}
        </AppNav>
    );
};

export default MiscItem;
