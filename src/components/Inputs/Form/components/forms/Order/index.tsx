import { LoadingButton } from '@mui/lab';
import { Box, Tooltip, Typography, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdCheck, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { TinyCompany } from '../../../../../../graphql/schema/Company/Company';
import { useCompanies } from '../../../../../../graphql/schema/Company/useCompanies';
import { CreateOrderInput } from '../../../../../../graphql/schema/Order/CreateOrderInput';
import { UpdateOrderInput } from '../../../../../../graphql/schema/Order/UpdateOrderInput';
import NavContent from '../../../../../Layout/AppNav/components/NavContent';
import FormRow from '../../../../../Layout/FormRow';
import BackButton from '../../../../BackButton';
import CarefullButton from '../../../../CarefulButton';
import EntityField from '../../../../EntityField';
import { EntityFormProps } from '../../AppForm';

const OrderFormRender = (
    props: EntityFormProps<
        { data: CreateOrderInput },
        { id: string; data: UpdateOrderInput }
    >
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
                                        nav(`/supplychain/orders`);
                                    } else {
                                        nav(`/supplychain/orders/${value.id}`);
                                    }
                                }}
                            >
                                {value._type == 'update' ? 'Order' : 'Orders'}
                            </BackButton>
                        </Box>
                        <Typography variant="crisp">
                            {value._type == 'create'
                                ? 'New Order'
                                : 'Update Order'}
                        </Typography>
                    </Box>
                ),
                content: (
                    <Box sx={{ maxWidth: 800 }}>
                        <Box sx={{ maxWidth: 400 }}>
                            <FormRow p={3}>
                                <EntityField
                                    label="Vendor"
                                    variables={{
                                        filter: { skip: 0, take: 100 },
                                    }}
                                    hook={useCompanies}
                                    getData={(res) => res.companies.items}
                                    getProps={(company: TinyCompany) => ({
                                        id: company._id,
                                        label: company.name,
                                    })}
                                    value={value.data.vendor || ''}
                                    onChange={(vendor) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: { ...value.data, vendor },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: { ...value.data, vendor },
                                            });
                                    }}
                                />
                            </FormRow>
                            <FormRow p={3}>
                                <EntityField
                                    label="Customer"
                                    variables={{
                                        filter: { skip: 0, take: 100 },
                                    }}
                                    hook={useCompanies}
                                    getData={(res) => res.companies.items}
                                    getProps={(company: TinyCompany) => ({
                                        id: company._id,
                                        label: company.name,
                                    })}
                                    value={value.data.customer || ''}
                                    onChange={(customer) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    customer,
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    customer,
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
                                    Delete order
                                </CarefullButton>
                            )}
                        </FormRow>
                    </Box>
                ),
            }}
        </NavContent>
    );
};

export default OrderFormRender;
