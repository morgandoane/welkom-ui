import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DetailsTab from '../../../../../../components/display/DataTabs/DetailsTab';
import BackButton from '../../../../../../components/Inputs/BackButton';
import AppNav from '../../../../../../components/Layout/AppNav/components';
import NavContent from '../../../../../../components/Layout/AppNav/components/NavContent';
import TabFade from '../../../../../../components/Layout/TabFade';
import {
    QualityCheckQuery,
    useQualityCheck,
} from '../../../../../../graphql/schema/QualityCheck/useQualityCheck';
import { HiOutlineClipboard } from 'react-icons/hi';
import { BsBoxSeam, BsClipboardCheck, BsPencilSquare } from 'react-icons/bs';

const QualityCheck = (): ReactElement => {
    const { id } = useParams();
    const nav = useNavigate();

    const { data, error, loading } = useQualityCheck({
        variables: { id: id || '' },
    });

    const qualitycheck = data ? data.qualityCheck : null;

    return (
        <AppNav error={error} loading={loading}>
            {qualitycheck && (
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
                                                nav('/library/qualitychecks')
                                            }
                                        >
                                            QualityChecks
                                        </BackButton>
                                    </Box>
                                    <Typography variant="crisp">
                                        {qualitycheck.prompt.english}
                                    </Typography>
                                </Box>
                            </Box>
                        ),
                        content: (
                            <TabFade>
                                {{
                                    Details: (
                                        <DetailsTab
                                            entity="Quality Check"
                                            data={qualitycheck}
                                            refetchQueries={[QualityCheckQuery]}
                                            extensions={[
                                                {
                                                    primary:
                                                        qualitycheck.quality_check_category,
                                                    secondary: 'Asked during',
                                                    avatar: (
                                                        <BsClipboardCheck
                                                            style={{
                                                                fontSize:
                                                                    '2.5rem',
                                                            }}
                                                        />
                                                    ),
                                                },
                                                {
                                                    primary: qualitycheck.item
                                                        ? qualitycheck.item
                                                              .names.english
                                                        : 'All items',
                                                    secondary: 'Item',
                                                    avatar: (
                                                        <BsBoxSeam
                                                            style={{
                                                                fontSize:
                                                                    '2.5rem',
                                                            }}
                                                        />
                                                    ),
                                                },
                                                {
                                                    primary:
                                                        qualitycheck.quality_check_class,
                                                    secondary: 'Response type',
                                                    avatar: (
                                                        <BsPencilSquare
                                                            style={{
                                                                fontSize:
                                                                    '2.5rem',
                                                            }}
                                                        />
                                                    ),
                                                },
                                            ]}
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

export default QualityCheck;
