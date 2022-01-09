import { Box, Button, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdChevronLeft } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import AppNav from '../../../../../../components/AppNav';
import ColumnBox from '../../../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../../../components/PageTitle';
import TabFade from '../../../../../../components/TabFade';
import { useCompany } from '../../../../../../graphql/queries/companies/useCompany';
import CompanyDetails from './components/CompanyDetails';
import CompanyAttachments from './components/CompanyAttachments';
import CompanyLocations from './components/CompanyLocations';
import CompanyPeople from './components/CompanyPeople';

const CompanyView = (): ReactElement => {
    const { id } = useParams();
    const nav = useNavigate();

    const { data, error, loading, refetch } = useCompany({
        variables: { id: id || '' },
        skip: !id || id == '',
        fetchPolicy: 'network-only',
    });

    const company = !data ? null : data.company;

    return (
        <AppNav error={error} loading={loading}>
            <Box sx={{ height: '100%' }}>
                {company && (
                    <ColumnBox>
                        {{
                            header: (
                                <Box>
                                    <Button
                                        variant="text"
                                        color="inherit"
                                        startIcon={<MdChevronLeft />}
                                        sx={{ marginBottom: 2 }}
                                        onClick={() =>
                                            nav('/library/companies')
                                        }
                                    >
                                        Companies
                                    </Button>
                                    <PageTitle>{company.name}</PageTitle>
                                    {company.deleted && (
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
                                                <CompanyDetails
                                                    company={company}
                                                />
                                            ),
                                            Locations: (
                                                <CompanyLocations
                                                    company={company}
                                                />
                                            ),
                                            People: (
                                                <CompanyPeople
                                                    company={company}
                                                />
                                            ),
                                            Attachmnets: (
                                                <CompanyAttachments
                                                    company={company}
                                                    refetch={() => refetch()}
                                                />
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

export default CompanyView;
