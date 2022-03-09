import { LoadingButton } from '@mui/lab';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Dialog,
    Grow,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd, MdClear, MdEdit, MdOutlineArrowBack } from 'react-icons/md';
import Message from '../../../../../../../../components/feedback/Message';
import AppFab from '../../../../../../../../components/Inputs/AppFab';
import SearchInput from '../../../../../../../../components/Inputs/SearchInput';
import { UpdateTeamInput } from '../../../../../../../../graphql/inputsTypes';
import { useProfiles } from '../../../../../../../../graphql/schema/Profile/useProfiles';
import { Team } from '../../../../../../../../graphql/schema/Team/Team';
import { TeamQuery } from '../../../../../../../../graphql/schema/Team/useTeam';
import { useTeamUpdate } from '../../../../../../../../graphql/schema/Team/useTeamUpdate';

export interface TeamMembersProps {
    children: Team;
}

const TeamMembers = (props: TeamMembersProps): ReactElement => {
    const { children: team } = props;

    const [search, setSearch] = React.useState('');

    const { palette } = useTheme();

    const [edits, setEdits] = React.useState<null | UpdateTeamInput>(null);

    const [update, { error: updateError, loading: updateLoading }] =
        useTeamUpdate({
            variables: edits
                ? {
                      id: team._id,
                      data: edits,
                  }
                : undefined,
            onCompleted: () => {
                setEdits(null);
                setSearch('');
            },
            refetchQueries: [TeamQuery],
        });

    const { data, error, loading } = useProfiles({
        variables: {
            filter: {
                skip: 0,
                take: 150,
            },
        },
    });

    const profiles = data ? data.profiles.items : [];
    const members = profiles.filter((p) =>
        (!edits ? team.members : edits.members).includes(p.user_id)
    );

    const filtered = profiles.filter((profile) => {
        const name =
            profile.given_name && profile.family_name
                ? `${profile.given_name} ${profile.family_name}`
                : profile.name;
        return (
            name.toLowerCase().includes(search.toLowerCase()) ||
            (profile.email && profile.email.toLowerCase().includes(search))
        );
    });

    return (
        <Box
            sx={{
                height: '100%',
                overflow: 'auto',
                position: 'relative',
            }}
        >
            {members.length > 0 && (
                <AppFab
                    icon={<MdEdit />}
                    absolute
                    onClick={() =>
                        setEdits({
                            deleted: team.deleted,
                            name: team.name,
                            company: team.company._id,
                            location: team.location ? team.location._id : null,
                            permissions: team.permissions,
                            members: team.members,
                        })
                    }
                >
                    Edit team members
                </AppFab>
            )}
            {loading ? (
                <Message type="Loading" />
            ) : !data || error ? (
                <Message
                    type="Error"
                    message={
                        error ? error.message : 'Oh boy. Something went wrong.'
                    }
                />
            ) : members.length > 0 ? (
                <List>
                    {members.map((member, index) => (
                        <ListItem key={'member_' + member.user_id}>
                            <ListItemAvatar>
                                <Avatar src={member.picture} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    member.given_name && member.family_name
                                        ? `${member.given_name} ${member.family_name}`
                                        : member.name
                                }
                                secondary={member.username || member.email}
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Message
                    type="No Data"
                    message="No team members yet"
                    action={
                        <Button
                            onClick={() =>
                                setEdits({
                                    deleted: team.deleted,
                                    name: team.name,
                                    company: team.company._id,
                                    location: team.location
                                        ? team.location._id
                                        : null,
                                    permissions: team.permissions,
                                    members: team.members,
                                })
                            }
                            sx={{ marginTop: 2 }}
                            endIcon={<MdAdd />}
                        >
                            Add members
                        </Button>
                    }
                />
            )}
            <Dialog
                open={Boolean(edits)}
                onClose={() => setEdits(null)}
                fullWidth
                maxWidth="lg"
                PaperProps={{
                    sx: {
                        height: '80vh',
                        background: palette.background.default,
                        display: 'flex',
                        flexFlow: 'column',
                        overflow: 'hidden',
                    },
                }}
            >
                <Box
                    sx={{
                        borderBottom: `1px solid ${palette.divider}`,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: palette.background.paper,
                    }}
                >
                    <Box>
                        <Typography variant="h6">{team.name}</Typography>
                        <Typography color="textSecondary">
                            Team members
                        </Typography>
                    </Box>
                    <IconButton onClick={() => setEdits(null)}>
                        <MdClear />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'stretch',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            borderRight: `1px solid ${palette.divider}`,
                            display: 'flex',
                            flexFlow: 'column',
                        }}
                    >
                        <Box
                            sx={{
                                padding: 1,
                                borderBottom: `1px solid ${palette.divider}`,
                            }}
                        >
                            <SearchInput
                                value={search}
                                onChange={(val) => setSearch(val)}
                            />
                        </Box>
                        <Box
                            sx={{
                                height: '100%',
                                flex: 1,
                                overflow: 'auto',
                                minWidth: 240,
                            }}
                        >
                            <List>
                                {filtered.map((profile) => (
                                    <ListItem
                                        disablePadding
                                        divider
                                        key={'profile_' + profile.user_id}
                                    >
                                        <ListItemButton
                                            role={undefined}
                                            onClick={() => {
                                                if (
                                                    edits &&
                                                    edits.members.includes(
                                                        profile.user_id
                                                    )
                                                ) {
                                                    setEdits({
                                                        ...edits,
                                                        members:
                                                            edits.members.filter(
                                                                (m) =>
                                                                    m !==
                                                                    profile.user_id
                                                            ),
                                                    });
                                                } else if (edits) {
                                                    setEdits({
                                                        ...edits,
                                                        members: [
                                                            ...edits.members,
                                                            profile.user_id,
                                                        ],
                                                    });
                                                }
                                            }}
                                            dense
                                        >
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={
                                                        edits !== null &&
                                                        edits.members.includes(
                                                            profile.user_id
                                                        )
                                                    }
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    profile.given_name &&
                                                    profile.family_name
                                                        ? `${profile.given_name} ${profile.family_name}`
                                                        : profile.name
                                                }
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '16px',
                                left: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <MdOutlineArrowBack />
                            <Typography variant="body2" color="textSecondary">
                                Click to add
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexFlow: 'column',
                                gap: 3,
                                marginTop: 2,
                                paddingBottom: 2,
                                overflow: 'auto',
                                maxHeight: '100%',
                            }}
                        >
                            {members.map((member) => (
                                <Grow in key={'mem_' + member.user_id}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                        }}
                                    >
                                        <Box>
                                            <Avatar src={member.picture} />
                                        </Box>
                                        <Box>
                                            <Typography>
                                                {member.given_name &&
                                                member.family_name
                                                    ? `${member.given_name} ${member.family_name}`
                                                    : member.name}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                variant="body2"
                                            >
                                                {member.username ||
                                                    member.email}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grow>
                            ))}
                        </Box>
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '32px',
                                right: '32px',
                            }}
                        >
                            <LoadingButton
                                loading={updateLoading}
                                variant="contained"
                                onClick={() => {
                                    if (edits) update();
                                }}
                            >
                                Save
                            </LoadingButton>
                        </Box>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
};

export default TeamMembers;
