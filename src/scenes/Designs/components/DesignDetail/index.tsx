import { Box, Typography, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import AttachmentsTab from '../../../../components/display/DataTabs/AttachmentsTab';
import DetailsTab from '../../../../components/display/DataTabs/DetailsTab';
import BackButton from '../../../../components/Inputs/BackButton';
import { DesignCategoryNumber } from '../../../../components/Inputs/Form/components/forms/Design';
import AppNav from '../../../../components/Layout/AppNav/components';
import NavContent from '../../../../components/Layout/AppNav/components/NavContent';
import TabFade from '../../../../components/Layout/TabFade';
import {
    DesignQuery,
    useDesign,
} from '../../../../graphql/schema/Design/useDesign';
import { categoryNames, locationNames } from '../DesignList';

const DesignDetail = (): ReactElement => {
    const { id } = useParams();
    const nav = useNavigate();
    const { palette } = useTheme();
    const { data, error, loading } = useDesign({
        variables: {
            id: id || '',
        },
        skip: !id,
    });

    const design = data ? data.design : null;

    return (
        <AppNav error={error} loading={loading}>
            {design && (
                <NavContent>
                    {{
                        header: (
                            <Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexFlow: 'column',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <BackButton
                                        onClick={() =>
                                            nav(
                                                `/design/list/${design.location}/${design.category}`
                                            )
                                        }
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                            }}
                                        >
                                            <Typography>
                                                {locationNames[design.location]}
                                            </Typography>
                                            <Typography>
                                                {categoryNames[design.category]}
                                            </Typography>
                                        </Box>
                                    </BackButton>
                                    <Typography variant="crisp">
                                        {design.part_number}
                                    </Typography>
                                </Box>
                            </Box>
                        ),
                        content: (
                            <TabFade>
                                {{
                                    Details: (
                                        <DetailsTab
                                            entity="Design"
                                            data={design}
                                            refetchQueries={[DesignQuery]}
                                        />
                                    ),
                                    Attachments: (
                                        <AttachmentsTab
                                            data={design}
                                            refetchQueries={[DesignQuery]}
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

export default DesignDetail;
