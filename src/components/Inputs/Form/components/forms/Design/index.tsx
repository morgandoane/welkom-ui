import { cloneDeep } from '@apollo/client/utilities';
import { LoadingButton } from '@mui/lab';
import {
    Box,
    InputAdornment,
    MenuItem,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd, MdCheck, MdDelete } from 'react-icons/md';
``;
import { useNavigate } from 'react-router-dom';
import {
    DesignCategory,
    DesignLocation,
} from '../../../../../../graphql/inputsTypes';
import {
    CreateDesignArgs,
    UpdateDesignArgs,
} from '../../../../../../graphql/mutationArgs';
import { useDesign } from '../../../../../../graphql/schema/Design/useDesign';
import NavContent from '../../../../../Layout/AppNav/components/NavContent';
import FormRow from '../../../../../Layout/FormRow';
import BackButton from '../../../../BackButton';
import CarefullButton from '../../../../CarefulButton';
import { EntityFormProps } from '../../AppForm';

export const DesignLocationNumber: Record<DesignLocation, string> = {
    [DesignLocation.Draper]: '01',
    [DesignLocation.WestJordan]: '02',
    [DesignLocation.Misc]: '09',
};

export const DesignCategoryNumber: Record<DesignCategory, string> = {
    [DesignCategory.Conveyor]: '01',
    [DesignCategory.Oven]: '02',
    [DesignCategory.Packing]: '03',
    [DesignCategory.Sprial]: '04',
};

const DesignFormRender = (
    props: EntityFormProps<CreateDesignArgs, UpdateDesignArgs>
): ReactElement => {
    const nav = useNavigate();
    const { loading, value, onChange, submit } = props;

    const { data } = useDesign({
        variables: {
            id: value.data.parent || '',
        },
        skip: !value.data.parent,
    });

    const parent = data ? data.design : null;

    const { palette, shape } = useTheme();

    const getHoldup = (): string | null => {
        if (!value.data.part_number) return 'Please eneter a part number.';
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
                                        nav(`/design`);
                                    } else {
                                        nav(`/design/detail/${value.id}`);
                                    }
                                }}
                            >
                                {value._type == 'update' ? 'Design' : 'Designs'}
                            </BackButton>
                        </Box>
                        <Typography variant="crisp">
                            {value._type == 'create'
                                ? 'New Design'
                                : 'Update Design'}
                        </Typography>
                    </Box>
                ),
                content: (
                    <Box sx={{ maxWidth: 800 }}>
                        <Box sx={{ maxWidth: 400 }}>
                            <FormRow p={3}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Location"
                                    value={value.data.location}
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    location: e.target
                                                        .value as DesignLocation,
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    location: e.target
                                                        .value as DesignLocation,
                                                },
                                            });
                                    }}
                                >
                                    {Object.keys(DesignLocation).map(
                                        (locationKey) => (
                                            <MenuItem
                                                key={'op_' + locationKey}
                                                value={locationKey}
                                            >
                                                {locationKey}
                                            </MenuItem>
                                        )
                                    )}
                                </TextField>
                                <TextField
                                    fullWidth
                                    select
                                    label="Category"
                                    value={value.data.category}
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    category: e.target
                                                        .value as DesignCategory,
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    category: e.target
                                                        .value as DesignCategory,
                                                },
                                            });
                                    }}
                                >
                                    {Object.keys(DesignCategory).map(
                                        (categoryKey) => (
                                            <MenuItem
                                                key={'op_' + categoryKey}
                                                value={categoryKey}
                                            >
                                                {categoryKey}
                                            </MenuItem>
                                        )
                                    )}
                                </TextField>
                            </FormRow>
                            <FormRow p={3}>
                                <TextField
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        paddingTop: 0.5,
                                                    }}
                                                >
                                                    <Typography color="textSecondary">{`${
                                                        DesignLocationNumber[
                                                            value.data.location
                                                        ]
                                                    } - ${
                                                        DesignCategoryNumber[
                                                            value.data.category
                                                        ]
                                                    } -`}</Typography>
                                                </Box>
                                            </InputAdornment>
                                        ),
                                    }}
                                    fullWidth
                                    label="Part number"
                                    value={value.data.part_number}
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    part_number:
                                                        e.target.value || '',
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    part_number:
                                                        e.target.value || '',
                                                },
                                            });
                                    }}
                                />
                            </FormRow>
                            <FormRow p={3}>
                                <TextField
                                    multiline
                                    rows={3}
                                    fullWidth
                                    label="Description"
                                    value={value.data.description}
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    description:
                                                        e.target.value || '',
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    description:
                                                        e.target.value || '',
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
                                    Delete design
                                </CarefullButton>
                            )}
                        </FormRow>
                    </Box>
                ),
            }}
        </NavContent>
    );
};

export default DesignFormRender;
