import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import SmartTable from '../../../../../../components/display/SmartTable';
import AppFab from '../../../../../../components/Inputs/AppFab';
import AppNav from '../../../../../../components/Layout/AppNav/components';
import NavContent from '../../../../../../components/Layout/AppNav/components/NavContent';
import { TeamFilter } from '../../../../../../graphql/inputsTypes';
import { TinyTeam } from '../../../../../../graphql/schema/Team/Team';
import { useTeams } from '../../../../../../graphql/schema/Team/useTeams';

const TeamsList = (): ReactElement => {
    const nav = useNavigate();

    const [filter, setFilter] = React.useState<TeamFilter>({
        skip: 0,
        take: 50,
    });

    const [teams, setTeams] = React.useState<TinyTeam[]>([]);
    const [count, setCount] = React.useState(0);

    const { data, error, loading } = useTeams({
        variables: { filter },
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setTeams(data.teams.items);
            setCount(data.teams.count);
        },
    });

    return (
        <AppNav error={error} loading={loading}>
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
                            <Box sx={{ display: 'flex', flexFlow: 'column' }}>
                                <Typography variant="crisp">Teams</Typography>
                            </Box>
                            <AppFab onClick={() => nav('new')} icon={<MdAdd />}>
                                Team
                            </AppFab>
                        </Box>
                    ),
                    content: (
                        <SmartTable
                            variant="card"
                            data={teams}
                            getProps={(d) => ({
                                id: d._id,
                                onClick: (team) => nav(team._id),
                            })}
                            pagination={{
                                count,
                                filter,
                                setFilter: (d) =>
                                    setFilter({
                                        ...filter,
                                        ...d,
                                    }),
                            }}
                        >
                            {{
                                Name: (d) => d.name,
                                Company: (d) => d.company.name,
                                Location: (d) =>
                                    d.location
                                        ? d.location.label ||
                                          d.location.address?.city
                                        : '',
                            }}
                        </SmartTable>
                    ),
                }}
            </NavContent>
        </AppNav>
    );
};

export default TeamsList;
