import { LoadingButton } from '@mui/lab';
import {
    Avatar,
    Box,
    Button,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList,
    Popover,
    Typography,
    useTheme,
} from '@mui/material';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import {
    MdCancel,
    MdCheck,
    MdChevronLeft,
    MdEdit,
    MdEmail,
    MdPassword,
} from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import AppFab from '../../../../../../components/AppFab';
import AppNav from '../../../../../../components/AppNav';
import Details from '../../../../../../components/Details';
import FormRow from '../../../../../../components/Forms/components/FormRow';
import TextFormField from '../../../../../../components/Forms/components/TextFormField';
import ColumnBox from '../../../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../../../components/PageTitle';
import PanelHeader from '../../../../../../components/PanelComponents/PanelHeader';
import ResponsiveDialog from '../../../../../../components/ResponsiveDialog';
import TabFade from '../../../../../../components/TabFade';
import { useProfileUpdate } from '../../../../../../graphql/mutations/profiles/useProfileUpdate';
import { useProfile } from '../../../../../../graphql/queries/profiles/useProfile';
import { useClickState } from '../../../../../../hooks/useClickState';
import { dateFormats } from '../../../../../../utils/dateFormats';

const ProfileDetail = (): ReactElement => {
    const { id } = useParams();
    const nav = useNavigate();

    const { palette } = useTheme();

    const [clickState, setClickState] = useClickState();

    const { data, error, loading } = useProfile({
        variables: {
            id: id || '',
        },
    });

    const [password, setPassword] = React.useState<null | [string, string]>(
        null
    );

    const profile = data ? data.profile : null;

    const [reset, { loading: resetLoading }] = useProfileUpdate({
        variables: !profile
            ? undefined
            : {
                  id: profile.user_id || '',
                  data: {
                      password: password ? password[0] : undefined,
                  },
              },
        onCompleted: () => setPassword(null),
    });

    const validation = {
        ['At least 8 characters']: password !== null && password[0].length > 7,
        ['Contains a number or character']:
            password !== null && password[0].length > 7,
        ['Matches confirmation']:
            password && password[0] && password[0] == password[1],
    };

    const valid = Object.values(validation).every((v) => v == true);

    return (
        <AppNav error={error} loading={loading} discrete={false}>
            {profile && (
                <ColumnBox>
                    {{
                        header: (
                            <Box>
                                <Button
                                    variant="text"
                                    color="inherit"
                                    startIcon={<MdChevronLeft />}
                                    onClick={() => nav('/people/profiles')}
                                >
                                    Profiles
                                </Button>
                                <Box sx={{ display: 'flex' }}>
                                    <PageTitle
                                        avatar={
                                            <Avatar
                                                src={profile.picture || ''}
                                                alt={
                                                    profile.given_name +
                                                    ' ' +
                                                    profile.family_name
                                                }
                                            />
                                        }
                                    >
                                        {profile.given_name &&
                                        profile.family_name
                                            ? `${profile.given_name} ${profile.family_name}`
                                            : profile.name}
                                    </PageTitle>
                                    <Box sx={{ flex: 1 }} />
                                    <Box>
                                        <Button
                                            onClick={(e) =>
                                                setClickState({
                                                    target: e.currentTarget,
                                                })
                                            }
                                        >
                                            Actions
                                        </Button>
                                        <Menu
                                            anchorEl={
                                                clickState
                                                    ? clickState.target
                                                    : null
                                            }
                                            open={Boolean(clickState)}
                                            onClose={() => setClickState(null)}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                        >
                                            <MenuItem
                                                onClick={() => {
                                                    setPassword(['', '']);
                                                    setClickState(null);
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <MdPassword />
                                                </ListItemIcon>
                                                <ListItemText>
                                                    Reset password
                                                </ListItemText>
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                </Box>
                            </Box>
                        ),
                        content: (
                            <TabFade>
                                {{
                                    Details: (
                                        <Box sx={{ paddingTop: 3 }}>
                                            <Details>
                                                {[
                                                    {
                                                        key: 'Account name',
                                                        value: profile.name,
                                                    },
                                                    {
                                                        key: 'Email',
                                                        value: profile.email,
                                                    },
                                                    {
                                                        key: 'Given name',
                                                        value: profile.given_name,
                                                    },
                                                    {
                                                        key: 'Family name',
                                                        value: profile.family_name,
                                                    },
                                                    {
                                                        key: 'Role',
                                                        value: profile.roles.join(
                                                            ', '
                                                        ),
                                                    },
                                                    {
                                                        key: 'Account blocked',
                                                        value: profile.blocked
                                                            ? 'Yes'
                                                            : 'No',
                                                    },
                                                    {
                                                        key: 'Last login',
                                                        value: profile.last_login
                                                            ? format(
                                                                  new Date(
                                                                      profile.last_login
                                                                  ),
                                                                  dateFormats.condensedDate
                                                              )
                                                            : 'Never',
                                                    },
                                                    {
                                                        key: 'Last password reset',
                                                        value: profile.last_password_reset
                                                            ? format(
                                                                  new Date(
                                                                      profile.last_password_reset
                                                                  ),
                                                                  dateFormats.condensedDate
                                                              )
                                                            : 'Never',
                                                    },
                                                    {
                                                        key: 'Last IP Address',
                                                        value:
                                                            profile.last_ip ||
                                                            'None',
                                                    },
                                                    {
                                                        key: 'Email verified',
                                                        value: profile.email_verified
                                                            ? 'Yes'
                                                            : 'No',
                                                    },
                                                    {
                                                        key: 'Unique identifier',
                                                        value: profile.user_id,
                                                    },
                                                ]}
                                            </Details>
                                            <AppFab
                                                icon={<MdEdit />}
                                                onClick={() => nav('edit')}
                                            >
                                                Edit
                                            </AppFab>
                                        </Box>
                                    ),
                                }}
                            </TabFade>
                        ),
                    }}
                </ColumnBox>
            )}
            <ResponsiveDialog
                open={Boolean(password)}
                onClose={() => setPassword(null)}
            >
                <Box>
                    <PanelHeader onClose={() => setPassword(null)}>
                        {['Reset Password', profile ? profile.name : '']}
                    </PanelHeader>
                    <FormRow>
                        <TextFormField
                            label="New password"
                            onChange={(val) => {
                                if (password)
                                    setPassword([val || '', password[1]]);
                            }}
                            value={password ? password[0] : ''}
                        />
                    </FormRow>
                    <FormRow>
                        <TextFormField
                            label="Confirm password"
                            onChange={(val) => {
                                if (password)
                                    setPassword([password[0], val || '']);
                            }}
                            value={password ? password[1] : ''}
                        />
                    </FormRow>
                    <LoadingButton
                        onClick={() => reset()}
                        variant="contained"
                        loading={resetLoading}
                        fullWidth
                        disabled={!valid}
                    >
                        Save
                    </LoadingButton>
                    <Box p={1} />
                    {Object.keys(validation).map((key, i) => (
                        <Box key={'v_' + i} sx={{ display: 'flex', gap: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {validation[key as keyof typeof validation] ? (
                                    <MdCheck
                                        style={{ color: palette.success.main }}
                                    />
                                ) : (
                                    <MdCancel
                                        style={{ color: palette.error.main }}
                                    />
                                )}
                            </Box>
                            <Box>
                                <Typography>{key}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </ResponsiveDialog>
        </AppNav>
    );
};

export default ProfileDetail;
