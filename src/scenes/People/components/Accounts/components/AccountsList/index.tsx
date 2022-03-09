import { Avatar, Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import SmartTable from '../../../../../../components/display/SmartTable';
import AppFab from '../../../../../../components/Inputs/AppFab';
import AppNav from '../../../../../../components/Layout/AppNav/components';
import NavContent from '../../../../../../components/Layout/AppNav/components/NavContent';
import { ProfileFilter } from '../../../../../../graphql/inputsTypes';
import { TinyProfile } from '../../../../../../graphql/schema/Profile/Profile';
import { useProfiles } from '../../../../../../graphql/schema/Profile/useProfiles';
import { dateFormats } from '../../../../../../utils/dateFormats';

const AccountsList = (): ReactElement => {
    const nav = useNavigate();

    const [filter, setFilter] = React.useState<ProfileFilter>({
        skip: 0,
        take: 50,
    });

    const [accounts, setAccounts] = React.useState<TinyProfile[]>([]);
    const [count, setCount] = React.useState(0);

    const { data, error, loading } = useProfiles({
        variables: { filter },
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setAccounts(data.profiles.items);
            setCount(data.profiles.count);
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
                                <Typography variant="crisp">
                                    Accounts
                                </Typography>
                            </Box>
                            <AppFab onClick={() => nav('new')} icon={<MdAdd />}>
                                Account
                            </AppFab>
                        </Box>
                    ),
                    content: (
                        <SmartTable
                            variant="card"
                            data={accounts}
                            getProps={(d) => ({
                                id: d.user_id,
                                onClick: (account) => nav(account.user_id),
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
                                [' ']: (d) => (
                                    <Avatar
                                        sx={{ height: 32, width: 32 }}
                                        src={d.picture}
                                    />
                                ),
                                Name: (d) =>
                                    d.given_name && d.family_name
                                        ? `${d.given_name} ${d.family_name}`
                                        : d.name,
                                Email: (d) => (d.username ? '' : d.email),
                                Username: (d) => d.username || '',
                                Role: (d) => d.roles.join(', '),
                            }}
                        </SmartTable>
                    ),
                }}
            </NavContent>
        </AppNav>
    );
};

export default AccountsList;
