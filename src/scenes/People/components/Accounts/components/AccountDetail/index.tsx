import {
    Avatar,
    Box,
    Dialog,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import {
    MdCalendarToday,
    MdClear,
    MdComputer,
    MdEdit,
    MdCheck,
} from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../../../../components/Inputs/BackButton';
import AppNav from '../../../../../../components/Layout/AppNav/components';
import NavContent from '../../../../../../components/Layout/AppNav/components/NavContent';
import TabFade from '../../../../../../components/Layout/TabFade';
import { useProfile } from '../../../../../../graphql/schema/Profile/useProfile';
import { dateFormats } from '../../../../../../utils/dateFormats';
import { ImBlocked } from 'react-icons/im';
import { BsCheckCircle } from 'react-icons/bs';
import { AiOutlineReload } from 'react-icons/ai';
import AppFab from '../../../../../../components/Inputs/AppFab';
import { LoadingButton } from '@mui/lab';
import { useProfileUpdate } from '../../../../../../graphql/schema/Profile/useProfileUpdate';
import FormRow from '../../../../../../components/Layout/FormRow';
import {
    checkPassword,
    PasswordPolicy,
} from '../../../../../../utils/regexCheck';

const Account = (): ReactElement => {
    const { id } = useParams();
    const nav = useNavigate();

    const { palette, spacing, shape } = useTheme();

    const [reset, setReset] = React.useState<null | {
        value: string;
        confirmation: string;
    }>(null);

    const { data, error, loading } = useProfile({
        variables: { id: id || '' },
    });

    const [update, { loading: updateLoading }] = useProfileUpdate({
        onCompleted: () => setReset(null),
    });

    const account = data ? data.profile : null;

    const handleBlock = () => {
        update({
            variables: account
                ? {
                      id: id || '',
                      data: {
                          blocked: account.blocked ? false : true,
                          given_name: account.given_name || '',
                          family_name: account.family_name || '',
                          role: account.roles[0],
                      },
                  }
                : undefined,
        });
    };

    const handlePasswordReset = () => {
        if (reset && account)
            update({
                variables: {
                    id: id || '',
                    data: {
                        given_name: account.given_name || '',
                        family_name: account.family_name || '',
                        role: account.roles[0],
                        password: reset.value,
                    },
                },
            });
    };

    const [ready, validation] = checkPassword(
        reset ? reset.value : '',
        reset ? reset.confirmation : ''
    );

    return (
        <AppNav error={error} loading={loading}>
            {account && (
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
                                                nav('/people/accounts')
                                            }
                                        >
                                            Accounts
                                        </BackButton>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                        }}
                                    >
                                        <Avatar src={account.picture} />
                                        <Typography variant="crisp">
                                            {account.given_name &&
                                            account.family_name
                                                ? `${account.given_name} ${account.family_name}`
                                                : account.name}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ),
                        content: (
                            <TabFade>
                                {{
                                    Details: (
                                        <Box>
                                            <List>
                                                <ListItem>
                                                    <ListItemAvatar
                                                        sx={{ paddingRight: 2 }}
                                                    >
                                                        <MdCalendarToday
                                                            style={{
                                                                fontSize:
                                                                    '40px',
                                                            }}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            !account.last_login
                                                                ? 'Never'
                                                                : format(
                                                                      new Date(
                                                                          account.last_login
                                                                      ),
                                                                      dateFormats.condensedDate +
                                                                          ' - ' +
                                                                          dateFormats.time
                                                                  )
                                                        }
                                                        secondary="Last login"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemAvatar
                                                        sx={{ paddingRight: 2 }}
                                                    >
                                                        <MdComputer
                                                            style={{
                                                                fontSize:
                                                                    '40px',
                                                            }}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            !account.last_ip
                                                                ? 'None'
                                                                : account.last_ip
                                                        }
                                                        secondary="Last IP Address"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemAvatar
                                                        sx={{ paddingRight: 2 }}
                                                    >
                                                        {account.blocked ? (
                                                            <ImBlocked
                                                                style={{
                                                                    fontSize:
                                                                        '40px',
                                                                    color: palette
                                                                        .error
                                                                        .main,
                                                                }}
                                                            />
                                                        ) : (
                                                            <BsCheckCircle
                                                                style={{
                                                                    fontSize:
                                                                        '40px',
                                                                    color: palette
                                                                        .success
                                                                        .main,
                                                                }}
                                                            />
                                                        )}
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            account.blocked
                                                                ? 'Blocked'
                                                                : 'Active'
                                                        }
                                                        secondary="Account Status"
                                                    />
                                                </ListItem>
                                            </List>
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: spacing(8),
                                                    right: spacing(8),
                                                    display: 'flex',
                                                    gap: 2,
                                                }}
                                            >
                                                <LoadingButton
                                                    color="inherit"
                                                    loading={updateLoading}
                                                    onClick={() => {
                                                        setReset({
                                                            value: '',
                                                            confirmation: '',
                                                        });
                                                    }}
                                                    variant="contained"
                                                    sx={{
                                                        borderRadius: 24,
                                                    }}
                                                    loadingPosition="start"
                                                    startIcon={
                                                        <AiOutlineReload />
                                                    }
                                                >
                                                    Reset password
                                                </LoadingButton>
                                                {account.blocked ? (
                                                    <LoadingButton
                                                        color="inherit"
                                                        loading={updateLoading}
                                                        onClick={handleBlock}
                                                        variant="contained"
                                                        sx={{
                                                            borderRadius: 24,
                                                        }}
                                                        loadingPosition="start"
                                                        startIcon={
                                                            <AiOutlineReload />
                                                        }
                                                    >
                                                        Unblock
                                                    </LoadingButton>
                                                ) : (
                                                    <LoadingButton
                                                        loading={updateLoading}
                                                        onClick={handleBlock}
                                                        color="error"
                                                        variant="contained"
                                                        sx={{
                                                            borderRadius: 24,
                                                        }}
                                                        loadingPosition="start"
                                                        startIcon={
                                                            <ImBlocked />
                                                        }
                                                    >
                                                        Block
                                                    </LoadingButton>
                                                )}
                                                <AppFab
                                                    icon={<MdEdit />}
                                                    onClick={() => nav('edit')}
                                                >
                                                    Edit account
                                                </AppFab>
                                            </Box>
                                            <Dialog
                                                open={Boolean(reset)}
                                                onClose={() => setReset(null)}
                                                PaperProps={{ sx: { p: 2 } }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        paddingBottom: 2,
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{ paddingRight: 6 }}
                                                        variant="h6"
                                                    >{`Reset ${account.given_name} ${account.family_name}'s password`}</Typography>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() =>
                                                            setReset(null)
                                                        }
                                                    >
                                                        <MdClear />
                                                    </IconButton>
                                                </Box>
                                                <FormRow p={2}>
                                                    <TextField
                                                        label="New password"
                                                        fullWidth
                                                        value={
                                                            reset
                                                                ? reset.value
                                                                : ''
                                                        }
                                                        onChange={(e) => {
                                                            if (reset) {
                                                                setReset({
                                                                    ...reset,
                                                                    value: e
                                                                        .target
                                                                        .value,
                                                                });
                                                            }
                                                        }}
                                                    />
                                                </FormRow>
                                                <FormRow p={3}>
                                                    <TextField
                                                        label="Confirm password"
                                                        fullWidth
                                                        value={
                                                            reset
                                                                ? reset.confirmation
                                                                : ''
                                                        }
                                                        onChange={(e) => {
                                                            if (reset) {
                                                                setReset({
                                                                    ...reset,
                                                                    confirmation:
                                                                        e.target
                                                                            .value,
                                                                });
                                                            }
                                                        }}
                                                    />
                                                </FormRow>
                                                <Box>
                                                    {Object.keys(
                                                        validation
                                                    ).map(
                                                        (key, policyIndex) => (
                                                            <Box
                                                                key={`policy_${policyIndex}`}
                                                                sx={{
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                    gap: 1,
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        display:
                                                                            'flex',
                                                                        alignItems:
                                                                            'center',
                                                                        paddingBottom: 0.5,
                                                                    }}
                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            height: 8,
                                                                            width: 8,
                                                                            borderRadius: 16,
                                                                            background:
                                                                                validation[
                                                                                    key as PasswordPolicy
                                                                                ]
                                                                                    ? palette
                                                                                          .success
                                                                                          .main
                                                                                    : palette
                                                                                          .error
                                                                                          .main,
                                                                        }}
                                                                    />
                                                                </Box>
                                                                <Typography variant="body2">
                                                                    {key}
                                                                </Typography>
                                                            </Box>
                                                        )
                                                    )}
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'flex-end',
                                                    }}
                                                >
                                                    <LoadingButton
                                                        loading={updateLoading}
                                                        disabled={!ready}
                                                        variant="contained"
                                                        startIcon={<MdCheck />}
                                                        loadingPosition="start"
                                                        onClick={
                                                            handlePasswordReset
                                                        }
                                                    >
                                                        Save
                                                    </LoadingButton>
                                                </Box>
                                            </Dialog>
                                        </Box>
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

export default Account;
