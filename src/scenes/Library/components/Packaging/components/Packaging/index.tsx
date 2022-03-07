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
    PackagingQuery,
    usePackage,
} from '../../../../../../graphql/schema/Item/extensions/Packaging/usePackage';

const Packaging = (): ReactElement => {
    const { id } = useParams();
    const nav = useNavigate();

    const { data, error, loading } = usePackage({
        variables: { id: id || '' },
    });

    const packaging = data ? data.packaging : null;

    return (
        <AppNav error={error} loading={loading}>
            {packaging && (
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
                                                nav('/library/packaging')
                                            }
                                        >
                                            Packaging
                                        </BackButton>
                                    </Box>
                                    <Typography variant="crisp">
                                        {packaging.names.english}
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
                                            data={packaging}
                                            refetchQueries={[PackagingQuery]}
                                        />
                                    ),
                                    Attachments: (
                                        <AttachmentsTab
                                            data={packaging}
                                            refetchQueries={[PackagingQuery]}
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

export default Packaging;
