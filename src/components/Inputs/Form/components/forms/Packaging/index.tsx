import { LoadingButton } from '@mui/lab';
import { Box, TextField, Tooltip, Typography, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdCheck, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { BaseUnit } from '../../../../../../graphql/inputsTypes';
import {
    CreatePackagingArgs,
    UpdatePackagingArgs,
} from '../../../../../../graphql/mutationArgs';
import NavContent from '../../../../../Layout/AppNav/components/NavContent';
import FormRow from '../../../../../Layout/FormRow';
import BackButton from '../../../../BackButton';
import CarefullButton from '../../../../CarefulButton';
import { EntityFormProps } from '../../AppForm';

const PackagingFormRender = (
    props: EntityFormProps<CreatePackagingArgs, UpdatePackagingArgs>
): ReactElement => {
    const nav = useNavigate();
    const { loading, value, onChange, submit } = props;

    const { palette, shape } = useTheme();

    const getHoldup = (): string | null => {
        if (!value.data.names.english) return 'Please enter a english name.';
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
                                        nav(`/library/packaging`);
                                    } else {
                                        nav(`/library/packaging/${value.id}`);
                                    }
                                }}
                            >
                                {value._type == 'update'
                                    ? 'Packaging profile'
                                    : 'Packaging'}
                            </BackButton>
                        </Box>
                        <Typography variant="crisp">
                            {value._type == 'create'
                                ? 'New Packaging Item'
                                : 'Update Packaging Item'}
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
                                    label="Item name"
                                    value={value.data.names.english}
                                    onChange={(e) => {
                                        if (value._type == 'create') {
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    base_unit: BaseUnit.Count,
                                                    per_base_unit: 1,
                                                    names: {
                                                        ...value.data.names,
                                                        english:
                                                            e.target.value ||
                                                            '',
                                                        spanish:
                                                            e.target.value ||
                                                            '',
                                                    },
                                                },
                                            });
                                        } else {
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    names: {
                                                        ...value.data.names,
                                                        english:
                                                            e.target.value ||
                                                            '',
                                                        spanish:
                                                            e.target.value ||
                                                            '',
                                                    },
                                                },
                                            });
                                        }
                                    }}
                                />
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
                                    Delete packaging
                                </CarefullButton>
                            )}
                        </FormRow>
                    </Box>
                ),
            }}
        </NavContent>
    );
};

export default PackagingFormRender;
