import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import AppNav from '../../../../../../components/AppNav';
import SearchField from '../../../../../../components/Forms/components/SearchField';
import ColumnBox from '../../../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../../../components/PageTitle';
import { useProfiles } from '../../../../../../graphql/queries/profiles/useProfiles';
import { ProfileFilter } from '../../../../../../graphql/schema/Profile/ProfileFilter';
import { dateFormats } from '../../../../../../utils/dateFormats';

const ProfileList = (): ReactElement => {
    const nav = useNavigate();

    const [filter, setFilter] = React.useState<ProfileFilter>({
        skip: 0,
        take: 25,
        skip_sync: false,
    });

    const { data, error, loading } = useProfiles({
        variables: { filter },
    });

    const count = data ? data.profiles.count : 0;
    const profiles = data ? data.profiles.items : [];

    return (
        <AppNav error={error} loading={loading}>
            <ColumnBox>
                {{
                    header: (
                        <Box sx={{ paddingBottom: 2 }}>
                            <PageTitle>Profiles</PageTitle>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <SearchField
                                        label="Search by name or email"
                                        value={filter.name || ''}
                                        onChange={(val) =>
                                            setFilter({
                                                ...filter,
                                                name: val || '',
                                            })
                                        }
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }} />
                                <Box>
                                    <Button
                                        onClick={() => nav('new')}
                                        endIcon={<MdAdd />}
                                    >
                                        New profile
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    ),
                    content: (
                        <DataGrid
                            pagination
                            paginationMode="server"
                            rowsPerPageOptions={[25]}
                            rowCount={count}
                            error={error}
                            loading={loading}
                            rows={profiles.map((o) => ({
                                ...o,
                                id: o.user_id || '',
                            }))}
                            onRowClick={(params) => nav(params.row.user_id)}
                            columns={[
                                {
                                    field: 'name',
                                    headerName: 'Account Name',
                                    width: 220,
                                },
                                {
                                    field: 'given_name',
                                    headerName: 'Given Name',
                                    width: 120,
                                },
                                {
                                    field: 'family_name',
                                    headerName: 'Family Name',
                                    width: 120,
                                },
                                {
                                    field: 'email',
                                    headerName: 'Email',
                                    width: 220,
                                },
                                {
                                    field: 'roles',
                                    headerName: 'Role',
                                    width: 100,
                                },
                                {
                                    field: 'blocked',
                                    headerName: 'Blocked',
                                    width: 100,
                                },
                                {
                                    field: 'last_login',
                                    headerName: 'Last login',
                                    width: 120,
                                    valueGetter: (params) =>
                                        params.row.last_login
                                            ? format(
                                                  new Date(
                                                      params.row.last_login
                                                  ),
                                                  dateFormats.condensedDate
                                              )
                                            : '',
                                },
                                {
                                    field: 'last_ip',
                                    headerName: 'Last IP Address',
                                    width: 140,
                                    valueGetter: (params) =>
                                        params.row.last_ip
                                            ? params.row.last_ip
                                            : '',
                                },
                                {
                                    field: 'email_verified',
                                    headerName: 'Email verified',
                                    width: 120,
                                },
                                {
                                    field: 'user_id',
                                    headerName: 'Unique identifier',
                                    width: 260,
                                },
                            ]}
                        />
                    ),
                }}
            </ColumnBox>
        </AppNav>
    );
};

export default ProfileList;
