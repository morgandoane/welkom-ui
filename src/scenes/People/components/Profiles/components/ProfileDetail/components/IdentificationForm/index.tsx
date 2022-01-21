import {
    Box,
    Button,
    ButtonBase,
    CircularProgress,
    Collapse,
    IconButton,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FaKey } from 'react-icons/fa';
import { MdAdd, MdExpandMore } from 'react-icons/md';
import Anima from '../../../../../../../../components/Anima';
import Details from '../../../../../../../../components/Details';
import CarefulButton from '../../../../../../../../components/Forms/CarefulButton';
import Info from '../../../../../../../../components/Info';
import { useProfileIdentifierCreation } from '../../../../../../../../graphql/mutations/profiles/useProfileIdentifierCreation';
import { useProfileIdentifierDeletion } from '../../../../../../../../graphql/mutations/profiles/useProfileIdentifierDeletion';
import { ManagedProfile } from '../../../../../../../../graphql/queries/managedProfile/useManagedProfile';
import { dateFormats } from '../../../../../../../../utils/dateFormats';

export interface IdentificationFormProps {
    profile: ManagedProfile;
}

const IdentificationForm = (props: IdentificationFormProps): ReactElement => {
    const { profile } = props;

    const { palette, shape } = useTheme();

    const [expanded, setExpanded] = React.useState(false);
    const [visible, setVisible] = React.useState(false);

    const [create, { loading: createLoading }] = useProfileIdentifierCreation({
        variables: {
            data: {
                profile: profile.user_id || '',
            },
        },
        refetchQueries: [ManagedProfile],
        onCompleted: (data) => {
            setExpanded(false);
            setVisible(false);
        },
    });

    const [remove, { loading: deleteLoading }] = useProfileIdentifierDeletion({
        variables: {
            profile: profile.user_id || '',
        },
        refetchQueries: [ManagedProfile],
        onCompleted: (data) => {
            setExpanded(false);
            setVisible(false);
        },
    });

    if (!profile.identifier)
        return (
            <Box sx={{ paddingTop: 3 }}>
                <Info>
                    Profile identifers grant a user access to other internal
                    applications, like Mixing and Packing.
                </Info>
                <Box p={2} />
                <ButtonBase
                    onClick={() => create()}
                    sx={{
                        ...shape,
                        padding: 4,
                        border: `1px solid ${palette.divider}`,
                        flexFlow: 'column',
                        gap: 3,
                        ':hover': {
                            background: palette.action.hover,
                        },
                    }}
                >
                    {createLoading ? (
                        <CircularProgress />
                    ) : (
                        <FaKey style={{ fontSize: '3rem' }} />
                    )}
                    <Box
                        sx={{
                            display: 'flex',
                            flexFlow: 'row',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <MdAdd style={{ fontSize: '1.25rem' }} />
                        <Typography>Create a profile identifier</Typography>
                    </Box>
                </ButtonBase>
            </Box>
        );

    return (
        <Box sx={{ paddingTop: 3 }}>
            <Info>
                Profile identifers grant a user access to other internal
                applications, like Mixing and Packing.
            </Info>
            <Box p={2} />
            <Box
                sx={{
                    ...shape,
                    border: `1px solid ${palette.divider}`,
                    display: 'inline-block',
                    minWidth: 500,
                }}
            >
                <Box p={2}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <Typography variant="h6">Identifier</Typography>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" color="textSecondary">
                                {visible
                                    ? profile.identifier.code
                                    : profile.identifier.code
                                          .substring(
                                              0,
                                              profile.identifier.code.length - 4
                                          )
                                          .split('')
                                          .map((d) => '*')
                                          .join('') +
                                      profile.identifier.code.substring(
                                          profile.identifier.code.length - 4
                                      )}
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton onClick={() => setVisible(!visible)}>
                                {visible ? (
                                    <AiFillEye />
                                ) : (
                                    <AiFillEyeInvisible />
                                )}
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        p: 1,
                        background: palette.background.paper,
                        borderTop: `1px solid ${palette.divider}`,
                    }}
                >
                    <Collapse in={expanded}>
                        <Box sx={{ padding: 1 }}>
                            <Box sx={{ display: 'inline-block' }}>
                                <Details>
                                    {[
                                        {
                                            key: 'Created by',
                                            value: profile.identifier.created_by
                                                .name,
                                        },
                                        {
                                            key: 'Date created',
                                            value: format(
                                                new Date(
                                                    profile.identifier.date_created
                                                ),
                                                dateFormats.condensedDate
                                            ),
                                        },
                                    ]}
                                </Details>
                                <CarefulButton onClick={() => remove()}>
                                    Delete
                                </CarefulButton>
                            </Box>
                        </Box>
                    </Collapse>
                    <Button
                        onClick={() => setExpanded(!expanded)}
                        variant="text"
                        endIcon={
                            <Box sx={{ display: 'flex' }}>
                                <Anima type="rotate" in={expanded}>
                                    <Box sx={{ display: 'flex' }}>
                                        <MdExpandMore />
                                    </Box>
                                </Anima>
                            </Box>
                        }
                    >
                        Details
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default IdentificationForm;
