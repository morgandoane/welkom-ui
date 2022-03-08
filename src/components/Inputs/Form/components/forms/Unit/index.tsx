import { LoadingButton } from '@mui/lab';
import {
    Box,
    TextField,
    Tooltip,
    Typography,
    useTheme,
    MenuItem,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdCheck, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { UnitClass } from '../../../../../../graphql/inputsTypes';
import {
    CreateUnitArgs,
    UpdateUnitArgs,
} from '../../../../../../graphql/mutationArgs';
import NavContent from '../../../../../Layout/AppNav/components/NavContent';
import FormRow from '../../../../../Layout/FormRow';
import BackButton from '../../../../BackButton';
import CarefullButton from '../../../../CarefulButton';
import { EntityFormProps } from '../../AppForm';

const UnitFormRender = (
    props: EntityFormProps<CreateUnitArgs, UpdateUnitArgs>
): ReactElement => {
    const nav = useNavigate();
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
                                        nav(`/library/units`);
                                    } else {
                                        nav(`/library/units/${value.id}`);
                                    }
                                }}
                            >
                                {value._type == 'update' ? 'Unit' : 'Units'}
                            </BackButton>
                        </Box>
                        <Typography variant="crisp">
                            {value._type == 'create'
                                ? 'New Unit'
                                : 'Update Unit'}
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
                                    label="English"
                                    value={value.data.names.english}
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    names: {
                                                        ...value.data.names,
                                                        english: e.target.value,
                                                    },
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    names: {
                                                        ...value.data.names,
                                                        english: e.target.value,
                                                    },
                                                },
                                            });
                                    }}
                                />
                                <TextField
                                    autoFocus
                                    fullWidth
                                    label="English plural"
                                    value={value.data.names.english_plural}
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    names: {
                                                        ...value.data.names,
                                                        english_plural:
                                                            e.target.value,
                                                    },
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    names: {
                                                        ...value.data.names,
                                                        english_plural:
                                                            e.target.value,
                                                    },
                                                },
                                            });
                                    }}
                                />
                            </FormRow>
                            <FormRow p={3}>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    label="Spanish"
                                    value={value.data.names.spanish}
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    names: {
                                                        ...value.data.names,
                                                        spanish: e.target.value,
                                                    },
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    names: {
                                                        ...value.data.names,
                                                        spanish: e.target.value,
                                                    },
                                                },
                                            });
                                    }}
                                />
                                <TextField
                                    autoFocus
                                    fullWidth
                                    label="Spanish plural"
                                    value={value.data.names.spanish_plural}
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    names: {
                                                        ...value.data.names,
                                                        spanish_plural:
                                                            e.target.value,
                                                    },
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    names: {
                                                        ...value.data.names,
                                                        spanish_plural:
                                                            e.target.value,
                                                    },
                                                },
                                            });
                                    }}
                                />
                            </FormRow>
                            <FormRow p={3}>
                                <Tooltip
                                    arrow
                                    title={
                                        value._type == 'update'
                                            ? 'Cannot be changed'
                                            : ''
                                    }
                                >
                                    <TextField
                                        fullWidth
                                        label="Type"
                                        value={value.data.unit_class}
                                        select
                                        disabled={value._type == 'update'}
                                        onChange={(e) => {
                                            if (value._type == 'create')
                                                onChange({
                                                    ...value,
                                                    data: {
                                                        ...value.data,
                                                        unit_class: e.target
                                                            .value as UnitClass,
                                                    },
                                                });
                                            else
                                                onChange({
                                                    ...value,
                                                    data: {
                                                        ...value.data,
                                                        unit_class: e.target
                                                            .value as UnitClass,
                                                    },
                                                });
                                        }}
                                    >
                                        {Object.keys(UnitClass).map((key) => (
                                            <MenuItem
                                                key={'key_' + key}
                                                value={key}
                                            >
                                                {key}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Tooltip>
                            </FormRow>
                            <FormRow p={3}>
                                <TextField
                                    fullWidth
                                    value={value.data.to_base_unit}
                                    label={`${
                                        value.data.names.english_plural ||
                                        'Units'
                                    } per ${
                                        value.data.unit_class == UnitClass.Count
                                            ? 'Each'
                                            : value.data.unit_class ==
                                              UnitClass.Volume
                                            ? 'Gallon'
                                            : 'Pound'
                                    }`}
                                    onChange={(e) => {
                                        const parsed = parseFloat(
                                            e.target.value
                                        );

                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    to_base_unit: isNaN(parsed)
                                                        ? null
                                                        : parsed,
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    to_base_unit: isNaN(parsed)
                                                        ? null
                                                        : parsed,
                                                },
                                            });
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
                                    Delete unit
                                </CarefullButton>
                            )}
                        </FormRow>
                    </Box>
                ),
            }}
        </NavContent>
    );
};

export default UnitFormRender;
