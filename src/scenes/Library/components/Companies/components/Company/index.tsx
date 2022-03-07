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
    CompanyQuery,
    useCompany,
} from '../../../../../../graphql/schema/Company/useCompany';
import CompanyContacts from './components/CompanyContacts';
import CompanyLocations from './components/CompanyLocations';

const Company = (): ReactElement => {
    const { id } = useParams();
    const nav = useNavigate();

    const { data, error, loading } = useCompany({
        variables: { id: id || '' },
    });

    const company = data ? data.company : null;

    return (
        <AppNav error={error} loading={loading}>
            {company && (
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
                                                nav('/library/companies')
                                            }
                                        >
                                            Companies
                                        </BackButton>
                                    </Box>
                                    <Typography variant="crisp">
                                        {company.name}
                                    </Typography>
                                </Box>
                            </Box>
                        ),
                        content: (
                            <TabFade>
                                {{
                                    Details: (
                                        <DetailsTab
                                            entity="Company"
                                            data={company}
                                            refetchQueries={[CompanyQuery]}
                                        />
                                    ),
                                    Contacts: (
                                        <CompanyContacts company={company} />
                                    ),
                                    Locations: (
                                        <CompanyLocations company={company} />
                                    ),
                                    Attachments: (
                                        <AttachmentsTab
                                            data={company}
                                            refetchQueries={[CompanyQuery]}
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

export default Company;
