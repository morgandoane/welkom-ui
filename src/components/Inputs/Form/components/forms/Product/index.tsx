import { LoadingButton } from '@mui/lab';
import { Box, TextField, Tooltip, Typography, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdCheck, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { BaseUnit } from '../../../../../../graphql/inputsTypes';
import {
    CreateProductArgs,
    UpdateProductArgs,
} from '../../../../../../graphql/mutationArgs';
import NavContent from '../../../../../Layout/AppNav/components/NavContent';
import FormRow from '../../../../../Layout/FormRow';
import BackButton from '../../../../BackButton';
import CarefullButton from '../../../../CarefulButton';
import CompanySelection from '../../../../CompanySelection';
import { EntityFormProps } from '../../AppForm';
import PalletConfiguration from '../PalletConfiguration';

const ProductFormRender = (
    props: EntityFormProps<CreateProductArgs, UpdateProductArgs>
): ReactElement => {
    const nav = useNavigate();
    const { loading, value, onChange, submit } = props;

    const { palette, shape } = useTheme();

    const getHoldup = (): string | null => {
        if (!value.data.names.english) return 'Please enter a product name.';
        if (!value.data.upc) return 'Please enter a upc.';
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
                                        nav(`/library/products`);
                                    } else {
                                        nav(`/library/products/${value.id}`);
                                    }
                                }}
                            >
                                {value._type == 'update'
                                    ? 'Product profile'
                                    : 'Product'}
                            </BackButton>
                        </Box>
                        <Typography variant="crisp">
                            {value._type == 'create'
                                ? 'New Product'
                                : 'Update Product'}
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
                                    label="Product name"
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
                            <FormRow p={3}>
                                <TextField
                                    fullWidth
                                    label="Upc"
                                    value={value.data.upc}
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    upc: e.target.value || '',
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    upc: e.target.value || '',
                                                },
                                            });
                                    }}
                                />
                            </FormRow>
                            <FormRow p={3}>
                                <CompanySelection
                                    value={value.data.company}
                                    onChange={(val) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    company: val,
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    company: val,
                                                },
                                            });
                                    }}
                                />
                            </FormRow>
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
                                    Delete product
                                </CarefullButton>
                            )}
                        </FormRow>
                    </Box>
                ),
            }}
        </NavContent>
    );
};

export default ProductFormRender;
