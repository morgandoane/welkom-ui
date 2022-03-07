import { cloneDeep } from '@apollo/client/utilities';
import { LoadingButton } from '@mui/lab';
import {
    Box,
    Button,
    TextField,
    Tooltip,
    Typography,
    useTheme,
    FormControlLabel,
    Switch,
    IconButton,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd, MdCheck, MdClear, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import {
    CreateCompanyArgs,
    UpdateCompanyArgs,
} from '../../../../../../graphql/mutationArgs';
import NavContent from '../../../../../Layout/AppNav/components/NavContent';
import FormRow from '../../../../../Layout/FormRow';
import BackButton from '../../../../BackButton';
import CarefullButton from '../../../../CarefulButton';
import { EntityFormProps } from '../../AppForm';

const CompanyFormRender = (
    props: EntityFormProps<CreateCompanyArgs, UpdateCompanyArgs>
): ReactElement => {
    const nav = useNavigate();
    const { loading, value, onChange, submit } = props;

    const { palette, shape } = useTheme();

    const getHoldup = (): string | null => {
        if (!value.data.name) return 'Please eneter a company name.';
        if (value.data.contacts.some((c) => !c.name))
            return 'Please eneter a name for each contact.';
        if (value.data.contacts.some((c) => !c.email))
            return 'Please eneter an email for each contact.';
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
                                        nav(`/library/companies`);
                                    } else {
                                        nav(`/library/companies/${value.id}`);
                                    }
                                }}
                            >
                                {value._type == 'update'
                                    ? 'Company profile'
                                    : 'Companies'}
                            </BackButton>
                        </Box>
                        <Typography variant="crisp">
                            {value._type == 'create'
                                ? 'New Company'
                                : 'Update Company'}
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
                                    onChange={(e) =>
                                        onChange({
                                            ...value,
                                            data: {
                                                ...value.data,
                                                name: e.target.value || '',
                                                contacts:
                                                    value.data.contacts || [],
                                            },
                                        })
                                    }
                                />
                            </FormRow>
                        </Box>
                        <FormRow p={4}>
                            <Box sx={{ flex: 1 }}>
                                <Box
                                    sx={{
                                        ...shape,
                                        border: `1px solid ${palette.divider}`,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            background:
                                                palette.background.paper,
                                            p: 1.5,
                                        }}
                                    >
                                        <Typography>Contacts</Typography>
                                    </Box>
                                    <Box sx={{ p: 1.5 }}>
                                        {value.data.contacts.map(
                                            (contact, index) => (
                                                <Box
                                                    key={'contact_' + index}
                                                    sx={{
                                                        borderBottom: `1px solid ${palette.divider}`,
                                                        p: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <TextField
                                                        fullWidth
                                                        onChange={(e) => {
                                                            const copy =
                                                                cloneDeep(
                                                                    value
                                                                );

                                                            copy.data.contacts[
                                                                index
                                                            ].name =
                                                                e.target
                                                                    .value ||
                                                                '';

                                                            onChange(copy);
                                                        }}
                                                        value={contact.name}
                                                        placeholder="Name"
                                                        variant="standard"
                                                        InputProps={{
                                                            disableUnderline:
                                                                true,
                                                        }}
                                                    />
                                                    <TextField
                                                        fullWidth
                                                        onChange={(e) => {
                                                            const copy =
                                                                cloneDeep(
                                                                    value
                                                                );

                                                            copy.data.contacts[
                                                                index
                                                            ].email =
                                                                e.target
                                                                    .value ||
                                                                '';

                                                            onChange(copy);
                                                        }}
                                                        value={contact.email}
                                                        placeholder="Email"
                                                        variant="standard"
                                                        InputProps={{
                                                            disableUnderline:
                                                                true,
                                                        }}
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={
                                                                    contact.email_on_order
                                                                }
                                                                onChange={(
                                                                    e,
                                                                    checked
                                                                ) => {
                                                                    const copy =
                                                                        cloneDeep(
                                                                            value
                                                                        );

                                                                    copy.data.contacts[
                                                                        index
                                                                    ].email_on_order =
                                                                        checked;

                                                                    onChange(
                                                                        copy
                                                                    );
                                                                }}
                                                            />
                                                        }
                                                        label={
                                                            <Box
                                                                sx={{
                                                                    whiteSpace:
                                                                        'nowrap',
                                                                    color: palette
                                                                        .text
                                                                        .secondary,
                                                                }}
                                                            >
                                                                Email on order
                                                            </Box>
                                                        }
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={
                                                                    contact.cc_on_order
                                                                }
                                                                onChange={(
                                                                    e,
                                                                    checked
                                                                ) => {
                                                                    const copy =
                                                                        cloneDeep(
                                                                            value
                                                                        );

                                                                    copy.data.contacts[
                                                                        index
                                                                    ].cc_on_order =
                                                                        checked;

                                                                    onChange(
                                                                        copy
                                                                    );
                                                                }}
                                                            />
                                                        }
                                                        label={
                                                            <Box
                                                                sx={{
                                                                    whiteSpace:
                                                                        'nowrap',
                                                                    color: palette
                                                                        .text
                                                                        .secondary,
                                                                }}
                                                            >
                                                                CC
                                                            </Box>
                                                        }
                                                    />
                                                    <IconButton
                                                        onClick={() => {
                                                            const copy =
                                                                cloneDeep(
                                                                    value
                                                                );

                                                            copy.data.contacts.splice(
                                                                index,
                                                                1
                                                            );

                                                            onChange(copy);
                                                        }}
                                                        size="small"
                                                    >
                                                        <MdClear />
                                                    </IconButton>
                                                </Box>
                                            )
                                        )}
                                        <Button
                                            sx={{ marginTop: 1 }}
                                            onClick={() =>
                                                onChange({
                                                    ...value,
                                                    data: {
                                                        ...value.data,
                                                        contacts: [
                                                            ...value.data
                                                                .contacts,
                                                            {
                                                                name: '',
                                                                email: '',
                                                                email_on_order:
                                                                    false,
                                                                cc_on_order:
                                                                    false,
                                                                title: undefined,
                                                            },
                                                        ],
                                                    },
                                                })
                                            }
                                            variant="text"
                                            startIcon={<MdAdd />}
                                        >
                                            Add contact
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </FormRow>
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
                                    Delete company
                                </CarefullButton>
                            )}
                        </FormRow>
                    </Box>
                ),
            }}
        </NavContent>
    );
};

export default CompanyFormRender;
