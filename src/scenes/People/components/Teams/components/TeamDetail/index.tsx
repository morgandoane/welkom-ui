import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdBusiness } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import AttachmentsTab from '../../../../../../components/display/DataTabs/AttachmentsTab';
import DetailsTab from '../../../../../../components/display/DataTabs/DetailsTab';
import BackButton from '../../../../../../components/Inputs/BackButton';
import AppNav from '../../../../../../components/Layout/AppNav/components';
import NavContent from '../../../../../../components/Layout/AppNav/components/NavContent';
import TabFade from '../../../../../../components/Layout/TabFade';
import {
    TeamQuery,
    useTeam,
} from '../../../../../../graphql/schema/Team/useTeam';
import TeamMembers from './components/TeamMembers';

const Team = (): ReactElement => {
    const { id } = useParams();
    const nav = useNavigate();

    const { data, error, loading } = useTeam({
        variables: { id: id || '' },
    });

    const team = data ? data.team : null;

    return (
        <AppNav error={error} loading={loading}>
            {team && (
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
                                            onClick={() => nav('/people/teams')}
                                        >
                                            Teams
                                        </BackButton>
                                    </Box>
                                    <Typography variant="crisp">
                                        {team.name}
                                    </Typography>
                                </Box>
                            </Box>
                        ),
                        content: (
                            <TabFade>
                                {{
                                    Details: (
                                        <DetailsTab
                                            entity="Team"
                                            data={team}
                                            refetchQueries={[TeamQuery]}
                                            extensions={[
                                                {
                                                    primary:
                                                        team.company.name +
                                                        (team.location
                                                            ? ` (${team.location?.label})`
                                                            : ''),
                                                    secondary: 'Company',
                                                    avatar: (
                                                        <MdBusiness
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
                                    Attachments: (
                                        <AttachmentsTab
                                            data={team}
                                            refetchQueries={[TeamQuery]}
                                        />
                                    ),
                                    Members: <TeamMembers>{team}</TeamMembers>,
                                }}
                            </TabFade>
                        ),
                    }}
                </NavContent>
            )}
        </AppNav>
    );
};

export default Team;
