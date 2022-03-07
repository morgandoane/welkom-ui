import { LoadingButton } from '@mui/lab';
import {
    Box,
    Button,
    Collapse,
    InputAdornment,
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
    BaseUnit,
    IngredientUnitClass,
} from '../../../../../../graphql/inputsTypes';
import {
    CreateIngredientArgs,
    UpdateIngredientArgs,
} from '../../../../../../graphql/mutationArgs';
import NavContent from '../../../../../Layout/AppNav/components/NavContent';
import FormRow from '../../../../../Layout/FormRow';
import BackButton from '../../../../BackButton';
import CarefullButton from '../../../../CarefulButton';
import { EntityFormProps } from '../../AppForm';
import PalletConfiguration from '../PalletConfiguration';

const IngredientFormRender = (
    props: EntityFormProps<CreateIngredientArgs, UpdateIngredientArgs>
): ReactElement => {
    const nav = useNavigate();
    const { loading, value, onChange, submit } = props;

    const { palette, shape } = useTheme();

    const getHoldup = (): string | null => {
        if (!value.data.names.english) return 'Please enter a english name.';
        if (value.data.pallet_configurations.length == 0)
            return 'Please provide a pallet configuration.';
        if (value.data.pallet_configurations.some((c) => !c.name))
            return 'Please enter a name for each pallet configuration.';
        if (value.data.pallet_configurations.some((c) => !c.capacity))
            return 'Please enter a capacity for each pallet configuration.';
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
                                        nav(`/library/ingredients`);
                                    } else {
                                        nav(`/library/ingredients/${value.id}`);
                                    }
                                }}
                            >
                                {value._type == 'update'
                                    ? 'Ingredient profile'
                                    : 'Ingredient'}
                            </BackButton>
                        </Box>
                        <Typography variant="crisp">
                            {value._type == 'create'
                                ? 'New Ingredient'
                                : 'Update Ingredient'}
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
                                                    base_unit: BaseUnit.Pounds,
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
                            <FormRow p={3}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Measured in"
                                    value={value.data.unit_class}
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    unit_class: e.target
                                                        .value as IngredientUnitClass,
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    unit_class: e.target
                                                        .value as IngredientUnitClass,
                                                },
                                            });
                                    }}
                                >
                                    {Object.keys(IngredientUnitClass).map(
                                        (key) => (
                                            <MenuItem
                                                value={key}
                                                key={'op_' + key}
                                            >
                                                {key}
                                            </MenuItem>
                                        )
                                    )}
                                </TextField>
                            </FormRow>
                            <Collapse
                                in={
                                    value.data.unit_class ==
                                    IngredientUnitClass.Volume
                                }
                            >
                                <FormRow p={3}>
                                    <TextField
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Button variant="text">
                                                        Help
                                                    </Button>
                                                </InputAdornment>
                                            ),
                                        }}
                                        type="number"
                                        inputProps={{ step: 0.1 }}
                                        fullWidth
                                        label="Gallons per Pound"
                                        value={
                                            value.data.per_base_unit == null
                                                ? ''
                                                : value.data.per_base_unit
                                        }
                                        onChange={(e) => {
                                            const parsed = parseFloat(
                                                e.target.value
                                            );

                                            const per_base_unit = isNaN(parsed)
                                                ? null
                                                : parsed;

                                            if (value._type == 'create')
                                                onChange({
                                                    ...value,
                                                    data: {
                                                        ...value.data,
                                                        per_base_unit,
                                                    },
                                                });
                                            else
                                                onChange({
                                                    ...value,
                                                    data: {
                                                        ...value.data,
                                                        per_base_unit,
                                                    },
                                                });
                                        }}
                                    />
                                </FormRow>
                            </Collapse>
                            <FormRow>
                                <PalletConfiguration
                                    value={value.data.pallet_configurations}
                                    onChange={(pallet_configurations) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    pallet_configurations,
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    pallet_configurations,
                                                },
                                            });
                                    }}
                                />
                            </FormRow>
                        </Box>
                        <Box p={1} />
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
                                    Delete ingredient
                                </CarefullButton>
                            )}
                        </FormRow>
                    </Box>
                ),
            }}
        </NavContent>
    );
};

export default IngredientFormRender;
