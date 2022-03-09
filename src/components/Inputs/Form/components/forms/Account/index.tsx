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
import { MdCheck } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import usePermissions from '../../../../../../auth/usePermissions';
import { UserRole } from '../../../../../../auth/UserRole';
import {
    CreateProfileArgs,
    UpdateProfileArgs,
} from '../../../../../../graphql/mutationArgs';
import NavContent from '../../../../../Layout/AppNav/components/NavContent';
import FormRow from '../../../../../Layout/FormRow';
import BackButton from '../../../../BackButton';
import { EntityFormProps } from '../../AppForm';

const AccountFormRender = (
    props: EntityFormProps<CreateProfileArgs, UpdateProfileArgs>
): ReactElement => {
    const nav = useNavigate();
    const { roles } = usePermissions();
    const { loading, value, onChange, submit } = props;

    const { palette, shape } = useTheme();

    const getHoldup = (): string | null => {
        return null;
    };

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
                                        nav(`/people/accounts`);
                                    } else {
                                        nav(`/people/accounts/${value.id}`);
                                    }
                                }}
                            >
                                {value._type == 'update'
                                    ? 'Account'
                                    : 'Accounts'}
                            </BackButton>
                        </Box>
                        <Typography variant="crisp">
                            {value._type == 'create'
                                ? 'New Account'
                                : 'Update Account'}
                        </Typography>
                    </Box>
                ),
                content: (
                    <Box sx={{ maxWidth: 800 }}>
                        <Box sx={{ maxWidth: 500 }}>
                            {roles.includes(UserRole.Admin) && (
                                <FormRow p={3}>
                                    <TextField
                                        fullWidth
                                        label="User Role"
                                        value={value.data.role}
                                        onChange={(e) => {
                                            if (value._type == 'create')
                                                onChange({
                                                    ...value,
                                                    data: {
                                                        ...value.data,
                                                        role: e.target
                                                            .value as UserRole,
                                                    },
                                                });
                                            else
                                                onChange({
                                                    ...value,
                                                    data: {
                                                        ...value.data,
                                                        role: e.target
                                                            .value as UserRole,
                                                    },
                                                });
                                        }}
                                        select
                                    >
                                        {Object.keys(UserRole).map((key) => (
                                            <MenuItem
                                                key={'role_' + key}
                                                value={key}
                                            >
                                                {key}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </FormRow>
                            )}
                            <FormRow p={3}>
                                <TextField
                                    fullWidth
                                    label="Given name"
                                    value={value.data.given_name}
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    given_name: e.target.value,
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    given_name: e.target.value,
                                                },
                                            });
                                    }}
                                />
                            </FormRow>
                            <FormRow p={3}>
                                <TextField
                                    fullWidth
                                    label="Family name"
                                    value={value.data.family_name}
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    family_name: e.target.value,
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    family_name: e.target.value,
                                                },
                                            });
                                    }}
                                />
                            </FormRow>
                            <FormRow p={3}>
                                <TextField
                                    sx={{ maxWidth: 160 }}
                                    fullWidth
                                    label="Login with"
                                    value={
                                        value.data.username == null
                                            ? 'Email'
                                            : 'Username'
                                    }
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    username:
                                                        e.target.value ==
                                                        'Email'
                                                            ? null
                                                            : '',
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    username:
                                                        e.target.value ==
                                                        'Email'
                                                            ? null
                                                            : '',
                                                },
                                            });
                                    }}
                                    select
                                >
                                    <MenuItem value="Email">Email</MenuItem>
                                    <MenuItem value="Username">
                                        Username
                                    </MenuItem>
                                </TextField>
                                <TextField
                                    fullWidth
                                    label={
                                        value.data.username == null
                                            ? 'Email'
                                            : 'Username'
                                    }
                                    value={
                                        value.data.username == null
                                            ? value.data.email
                                            : value.data.username
                                    }
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    username:
                                                        value.data.username ==
                                                        null
                                                            ? null
                                                            : e.target.value,
                                                    email:
                                                        value.data.username ==
                                                        null
                                                            ? e.target.value
                                                            : '',
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    username:
                                                        value.data.username ==
                                                        null
                                                            ? null
                                                            : e.target.value,
                                                    email:
                                                        value.data.username ==
                                                        null
                                                            ? e.target.value
                                                            : '',
                                                },
                                            });
                                    }}
                                />
                            </FormRow>
                            {value._type == 'create' && (
                                <FormRow p={3}>
                                    <TextField
                                        label="Temporary password"
                                        fullWidth
                                        value={value.data.temporary_password}
                                        onChange={(e) => {
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    temporary_password:
                                                        e.target.value,
                                                },
                                            });
                                        }}
                                    />
                                </FormRow>
                            )}
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
                        </FormRow>
                    </Box>
                ),
            }}
        </NavContent>
    );
};

export default AccountFormRender;
