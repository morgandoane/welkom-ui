import { LoadingButton } from '@mui/lab';
import {
    Box,
    MenuItem,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdCheck, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import {
    getUiPermissions,
    UiPermission,
    UiPermissions,
} from '../../../../../../auth/UiPermission';
import {
    CreateTeamArgs,
    UpdateTeamArgs,
} from '../../../../../../graphql/mutationArgs';
import { useLocations } from '../../../../../../graphql/schema/Location/useLocations';
import NavContent from '../../../../../Layout/AppNav/components/NavContent';
import FormRow from '../../../../../Layout/FormRow';
import BackButton from '../../../../BackButton';
import CarefullButton from '../../../../CarefulButton';
import CompanySelection from '../../../../CompanySelection';
import ListSelection from '../../../../ListSelection';
import { EntityFormProps } from '../../AppForm';

const TeamFormRender = (
    props: EntityFormProps<CreateTeamArgs, UpdateTeamArgs>
): ReactElement => {
    const nav = useNavigate();
    const { loading, value, onChange, submit } = props;

    const { palette, shape } = useTheme();

    const getHoldup = (): string | null => {
        if (!value.data.name) return 'Please enter a team name.';
        return null;
    };

    const { data, error } = useLocations({
        variables: {
            filter: {
                skip: 0,
                take: 50,
                company: value.data.company,
            },
        },
        skip: !value.data.company,
    });

    const locations = data ? data.locations.items : [];

    const holdup = getHoldup();

    return (
        <NavContent>
            {{
                header: (
                    <Box
                        sx={{
                            display: 'flex',
                            flexFlow: 'column',
                            gap: 1,
                        }}
                    >
                        <Box>
                            <BackButton
                                onClick={() => {
                                    if (value._type == 'create') {
                                        nav(`/people/teams`);
                                    } else {
                                        nav(`/people/teams/${value.id}`);
                                    }
                                }}
                            >
                                {value._type == 'update' ? 'Team' : 'Teams'}
                            </BackButton>
                        </Box>
                        <Typography variant="crisp">
                            {value._type == 'create'
                                ? 'New Team'
                                : 'Update Team'}
                        </Typography>
                    </Box>
                ),
                content: (
                    <Box sx={{ maxWidth: 800 }}>
                        <Box sx={{ maxWidth: 400 }}>
                            <FormRow p={3}>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    label="Name"
                                    value={value.data.name}
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    name: e.target.value || '',
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    name: e.target.value || '',
                                                },
                                            });
                                    }}
                                />
                            </FormRow>
                            <FormRow p={3}>
                                <CompanySelection
                                    value={value.data.company}
                                    onChange={(company) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    company,
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    company,
                                                },
                                            });
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    value={value.data.location || 'none'}
                                    select
                                    label="Location"
                                    error={Boolean(error)}
                                    helperText={
                                        error ? error.message : undefined
                                    }
                                >
                                    <MenuItem
                                        value="none"
                                        onClick={() => {
                                            if (value._type == 'create')
                                                onChange({
                                                    ...value,
                                                    data: {
                                                        ...value.data,
                                                        location: null,
                                                    },
                                                });
                                            else
                                                onChange({
                                                    ...value,
                                                    data: {
                                                        ...value.data,
                                                        location: null,
                                                    },
                                                });
                                        }}
                                    >
                                        Any location
                                    </MenuItem>
                                    {locations.map((d) => (
                                        <MenuItem
                                            onClick={() => {
                                                if (value._type == 'create')
                                                    onChange({
                                                        ...value,
                                                        data: {
                                                            ...value.data,
                                                            location: d._id,
                                                        },
                                                    });
                                                else
                                                    onChange({
                                                        ...value,
                                                        data: {
                                                            ...value.data,
                                                            location: d._id,
                                                        },
                                                    });
                                            }}
                                            key={d._id}
                                            value={d._id}
                                        >
                                            {d.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormRow>
                            <FormRow p={3}>
                                <ListSelection
                                    label="Permissions"
                                    getProps={(permission) => ({
                                        id: permission.name,
                                        primary: permission.name,
                                        secondary: permission.description,
                                    })}
                                    value={UiPermissions.filter((d) =>
                                        d.permissions.every((p) =>
                                            value.data.permissions.includes(p)
                                        )
                                    )}
                                    onChange={(data) => {
                                        const permissions = [
                                            ...new Set(
                                                data
                                                    .map((d) => d.permissions)
                                                    .flat()
                                            ),
                                        ];

                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    permissions,
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    permissions,
                                                },
                                            });
                                    }}
                                >
                                    {UiPermissions}
                                </ListSelection>
                            </FormRow>
                        </Box>
                        <FormRow>
                            <Box>
                                <Tooltip title={holdup || ''} arrow>
                                    <Box>
                                        <LoadingButton
                                            onClick={() => submit()}
                                            variant="contained"
                                            disabled={Boolean(holdup)}
                                            endIcon={<MdCheck />}
                                            loading={loading}
                                        >
                                            Save
                                        </LoadingButton>
                                    </Box>
                                </Tooltip>
                            </Box>
                            {value._type == 'update' && (
                                <CarefullButton
                                    endIcon={<MdDelete />}
                                    onClick={() => {
                                        submit(true);
                                    }}
                                >
                                    Delete team
                                </CarefullButton>
                            )}
                        </FormRow>
                    </Box>
                ),
            }}
        </NavContent>
    );
};

export default TeamFormRender;
