import { useLazyQuery } from '@apollo/client';
import { cloneDeep } from '@apollo/client/utilities';
import { LoadingButton } from '@mui/lab';
import {
    Box,
    Button,
    CircularProgress,
    ClickAwayListener,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd, MdCheck, MdDelete, MdRefresh } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import {
    CodeType,
    CodeQuery,
} from '../../../../../../graphql/schema/Code/useCode';
import { TinyCompany } from '../../../../../../graphql/schema/Company/Company';
import { useCompanies } from '../../../../../../graphql/schema/Company/useCompanies';
import { CreateOrderInput } from '../../../../../../graphql/schema/Order/CreateOrderInput';
import { UpdateOrderInput } from '../../../../../../graphql/schema/Order/UpdateOrderInput';
import FocusedLine from '../../../../../feedback/FocusLine';
import NavContent from '../../../../../Layout/AppNav/components/NavContent';
import FormRow from '../../../../../Layout/FormRow';
import BackButton from '../../../../BackButton';
import CarefullButton from '../../../../CarefulButton';
import EntityField from '../../../../EntityField';
import { EntityFormProps } from '../../AppForm';
import OrderAppointmentForm from './components/OrderAppointmentForm';

const OrderFormRender = (
    props: EntityFormProps<
        { data: CreateOrderInput },
        { id: string; data: UpdateOrderInput }
    >
): ReactElement => {
    const nav = useNavigate();
    const { loading, value, onChange, submit } = props;

    const { palette, shape } = useTheme();

    const [getCode, { loading: codeLoading, error: codeError }] = useLazyQuery<
        { code: string },
        { type: CodeType }
    >(CodeQuery, {
        variables: {
            type: CodeType.PO,
        },
        onCompleted: (data) => {
            if (value._type == 'create')
                onChange({
                    ...value,
                    data: {
                        ...value.data,
                        po: data.code,
                    },
                });
            else
                onChange({
                    ...value,
                    data: {
                        ...value.data,
                        po: data.code,
                    },
                });
        },
    });

    const getHoldup = (): string | null => {
        if (!value.data.po) return 'Please eneter a PO#';
        if (!value.data.vendor) return 'Please select a Vendor';
        if (!value.data.customer) return 'Please select a Customer';
        if (value.data.appointments.some((apt) => !apt.location))
            return 'Please select a Destination for each Delivery';
        if (value.data.appointments.some((apt) => !apt.date))
            return 'Please select a date for each Delivery';
        if (value.data.appointments.some((apt) => apt.contents.length == 0))
            return 'Each Delivery needs contents';
        if (
            value.data.appointments.some((apt) =>
                apt.contents.some((content) => !content.item)
            )
        )
            return 'Please select an item for each delivery content';
        if (
            value.data.appointments.some((apt) =>
                apt.contents.some((content) => !content.client_quantity)
            )
        )
            return 'Please enter a quantity for each delivery content';
        if (
            value.data.appointments.some((apt) =>
                apt.contents.some((content) => !content.client_unit)
            )
        )
            return 'Please select a unit for each delivery content';
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
                                <TextField
                                    error={Boolean(codeError)}
                                    helperText={
                                        codeError ? codeError.message : ''
                                    }
                                    label="PO#"
                                    value={value.data.po || ''}
                                    onChange={(e) => {
                                        if (value._type == 'create')
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    po: e.target.value,
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    po: e.target.value,
                                                },
                                            });
                                    }}
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {codeLoading ? (
                                                    <CircularProgress
                                                        size={20}
                                                    />
                                                ) : (
                                                    <IconButton
                                                        onClick={() =>
                                                            getCode()
                                                        }
                                                    >
                                                        <MdRefresh />
                                                    </IconButton>
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </FormRow>
                            <FormRow p={3}>
                                <EntityField
                                    fullWidth
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
                                <EntityField
                                    fullWidth
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
                                                    appointments:
                                                        value.data.appointments.map(
                                                            (apt) => ({
                                                                ...apt,
                                                                location: null,
                                                            })
                                                        ),
                                                },
                                            });
                                        else
                                            onChange({
                                                ...value,
                                                data: {
                                                    ...value.data,
                                                    customer,
                                                    appointments:
                                                        value.data.appointments.map(
                                                            (apt) => ({
                                                                ...apt,
                                                                location: null,
                                                            })
                                                        ),
                                                },
                                            });
                                    }}
                                />
                            </FormRow>
                        </Box>

                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                {`${value.data.appointments.length} ${
                                    value.data.appointments.length == 1
                                        ? 'Delivery'
                                        : 'Deliveries'
                                }`}
                            </Typography>
                        </Box>
                        <Box p={0.5} />
                        {value.data.appointments.map((apt, index) => (
                            <OrderAppointmentForm
                                key={'apt_' + index}
                                customer={value.data.customer}
                                value={apt}
                                onChange={(val) => {
                                    const copy = cloneDeep(value);
                                    if (val) {
                                        copy.data.appointments[index] = val;
                                        onChange(copy);
                                    } else {
                                        copy.data.appointments.splice(index, 1);
                                        onChange(copy);
                                    }
                                }}
                            />
                        ))}
                        <Box>
                            <Button
                                variant="text"
                                startIcon={<MdAdd />}
                                onClick={() => {
                                    if (value._type == 'create')
                                        onChange({
                                            ...value,
                                            data: {
                                                ...value.data,
                                                appointments: [
                                                    ...value.data.appointments,
                                                    {
                                                        contents: [],
                                                        date: null,
                                                        location: null,
                                                        time: null,
                                                    },
                                                ],
                                            },
                                        });
                                    else
                                        onChange({
                                            ...value,
                                            data: {
                                                ...value.data,
                                                appointments: [
                                                    ...value.data.appointments,
                                                    {
                                                        contents: [],
                                                        date: null,
                                                        location: null,
                                                        time: null,
                                                    },
                                                ],
                                            },
                                        });
                                }}
                            >
                                Delivery
                            </Button>
                        </Box>

                        <Box p={3} />
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
