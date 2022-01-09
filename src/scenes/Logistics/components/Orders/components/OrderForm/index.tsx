import { LoadingButton } from '@mui/lab';
import {
    Box,
    Button,
    ButtonBase,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import {
    MdAdd,
    MdArrowForward,
    MdCancel,
    MdCheck,
    MdChevronLeft,
    MdChevronRight,
    MdClear,
} from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import AppNav from '../../../../../../components/AppNav';
import CarefulButton from '../../../../../../components/Forms/CarefulButton';
import CodeField from '../../../../../../components/Forms/components/CodeField';
import CompanyField from '../../../../../../components/Forms/components/CompanyField';
import DateField from '../../../../../../components/Forms/components/DateField';
import FormRow from '../../../../../../components/Forms/components/FormRow';
import ItemField from '../../../../../../components/Forms/components/ItemField';
import LocationField from '../../../../../../components/Forms/components/LocationField';
import NumberField from '../../../../../../components/Forms/components/NumberField';
import UnitField from '../../../../../../components/Forms/components/UnitField';
import ColumnBox from '../../../../../../components/Layout/ColumnBox';
import Message from '../../../../../../components/Message';
import PageTitle from '../../../../../../components/PageTitle';
import PanelHeader from '../../../../../../components/PanelComponents/PanelHeader';
import ResponsiveDialog from '../../../../../../components/ResponsiveDialog';
import {
    CreateOrderRes,
    useOrderCreation,
} from '../../../../../../graphql/mutations/order/useOrderCreation';
import {
    UpdateOrderRes,
    useOrderUpdate,
} from '../../../../../../graphql/mutations/order/useOrderUpdate';
import { useTinyCompanies } from '../../../../../../graphql/queries/companies/useTinyCompanies';
import { useTinyItems } from '../../../../../../graphql/queries/items/useTinyItems';
import { useTinyLocations } from '../../../../../../graphql/queries/locations/useTinyLocations';
import { useOrder } from '../../../../../../graphql/queries/orders/Order';
import { useTinyUnits } from '../../../../../../graphql/queries/units/useTinyUnits';
import { CodeType } from '../../../../../../graphql/schema/Code/Code';
import { OrderContentInput } from '../../../../../../graphql/schema/Content/ContentInputs';
import {
    CreateOrderInput,
    UpdateOrderInput,
} from '../../../../../../graphql/schema/Order/OrderInputs';
import { OperationResult } from '../../../../../../graphql/types';
import { dateFormats } from '../../../../../../utils/dateFormats';

const baseDate = new Date();

const OrderForm = (): ReactElement => {
    const { id } = useParams();
    const nav = useNavigate();
    const theme = useTheme();

    const companyData = useTinyCompanies({
        variables: {
            filter: {
                skip: 0,
                take: 200,
            },
        },
    });

    const unitData = useTinyUnits({
        variables: {
            filter: {
                skip: 0,
                take: 200,
            },
        },
    });

    const itemData = useTinyItems({
        variables: {
            filter: {
                skip: 0,
                take: 200,
            },
        },
    });

    const locationData = useTinyLocations({
        variables: {
            filter: {
                skip: 0,
                take: 200,
            },
        },
    });

    const companies = companyData.data ? companyData.data.companies.items : [];
    const units = unitData.data ? unitData.data.units.items : [];
    const items = itemData.data ? itemData.data.items.items : [];
    const locations = locationData.data
        ? locationData.data.locations.items
        : [];

    const [result, setResult] = React.useState<null | OperationResult<
        UpdateOrderRes | CreateOrderRes
    >>(null);

    const [handleCreate, { loading: createLoading }] = useOrderCreation({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
    });
    const [handleUpdate, { loading: updateLoading }] = useOrderUpdate({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
    });

    const resultLoading = createLoading || updateLoading;

    const [edits, setEdits] = React.useState<
        | ({ _type: 'create' } & CreateOrderInput)
        | ({ _type: 'update' } & UpdateOrderInput)
    >({
        _type: 'create',
        contents: [],
        code: '',
    });

    const handleSubmit = () => {
        if (edits._type == 'create') {
            const { _type, ...data } = edits;
            handleCreate({ variables: { data } });
        } else if (id !== undefined) {
            const { _type, ...data } = edits;
            handleUpdate({ variables: { id, data } });
        }
    };

    const [focusedContent, setFocusedContent] = React.useState<
        ({ index: number } & OrderContentInput) | null
    >(null);

    const focusedCustomer =
        companies.find((c) => c._id === edits.customer) || null;

    const focusedVendor = companies.find((c) => c._id === edits.vendor) || null;

    const {
        data,
        error,
        loading: orderLoading,
    } = useOrder({
        variables: { id: id || '' },
        skip: !id || id == '',
    });

    React.useEffect(() => {
        if (data) {
            const { vendor, customer, contents, deleted, code } = data.order;
            setEdits({
                _type: 'update',
                code,
                vendor: vendor ? vendor._id : '',
                customer: customer ? customer._id : '',
                deleted,
                contents: contents.map((content) => {
                    const { item, unit, quantity, location, due } = content;
                    return {
                        item: item ? item._id : '',
                        unit: unit ? unit._id : '',
                        location: location ? location._id : '',
                        quantity,
                        due,
                    };
                }),
            });
        }
    }, [data]);

    const original = data ? data.order : null;

    const editContent = (index: number, data: Partial<OrderContentInput>) => {
        const copy = { ...edits };
        if (copy.contents && copy.contents[index]) {
            copy.contents[index] = { ...copy.contents[index], ...data };
            setEdits(copy);
        }
    };

    const popContent = (index?: number) => {
        const copy = { ...edits };
        if (copy.contents !== undefined) {
            if (index == undefined) {
                const newContent: OrderContentInput = {
                    item: '',
                    unit: '',
                    quantity: 0,
                    location: '',
                    due: baseDate,
                };
                setFocusedContent({
                    ...newContent,
                    index: copy.contents.length,
                });
                copy.contents.push(newContent);
                setEdits(copy);
            } else {
                copy.contents.splice(index, 1);
                setEdits(copy);
            }
        }
    };

    const getHoldup = (): string | null => {
        if (!edits.code || edits.code == '') return 'Order needs a PO number';
        if (!focusedVendor) return 'Select a vendor';
        if (!focusedCustomer) return 'Select a customer';
        const contentErrors: string[] = [];
        if (edits.contents)
            for (const { item, unit, quantity, location } of edits.contents) {
                if (!item) contentErrors.push('Each content needs an item');
                if (!unit) contentErrors.push('Each content needs a unit');
                if (!location)
                    contentErrors.push('Each content needs a location');
                if (quantity == 0)
                    contentErrors.push('Each content needs a quantity');
            }
        if (contentErrors[0]) return contentErrors[0];
        return null;
    };

    const holdup = getHoldup();

    return (
        <AppNav error={error} loading={orderLoading}>
            <ColumnBox>
                {{
                    header: (
                        <PageTitle>
                            {original || id ? 'Update order' : 'Create order'}
                        </PageTitle>
                    ),
                    content:
                        result && result.success == true ? (
                            <Message
                                type="Success"
                                message="Order saved"
                                onComplete={() => {
                                    if (result && result.success == true) {
                                        if ('updateOrder' in result.data)
                                            nav(
                                                '/logistics/orders/' +
                                                    result.data.updateOrder._id
                                            );
                                        else
                                            nav(
                                                '/logistics/orders/' +
                                                    result.data.createOrder._id
                                            );
                                    }
                                }}
                            />
                        ) : result && result.success == false ? (
                            <Message
                                type="Warning"
                                message={result.error.message}
                                action={
                                    <Button
                                        startIcon={<MdChevronLeft />}
                                        onClick={() => setResult(null)}
                                    >
                                        Try again
                                    </Button>
                                }
                            />
                        ) : (
                            <Box sx={{ paddingTop: 2 }}>
                                <Box sx={{ maxWidth: 240 }}>
                                    <CodeField
                                        type={CodeType.PO}
                                        value={
                                            edits.code
                                                ? edits.code
                                                : data
                                                ? data.order.code
                                                : ''
                                        }
                                        onChange={(code) =>
                                            setEdits({ ...edits, code })
                                        }
                                    />
                                </Box>
                                <Box p={2} />
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                >
                                    Companies
                                </Typography>
                                <Box p={0.5} />
                                <Box sx={{ maxWidth: 600 }}>
                                    <FormRow>
                                        <CompanyField
                                            label="Vendor"
                                            value={edits.vendor || null}
                                            onChange={(val) => {
                                                setEdits({
                                                    ...edits,
                                                    vendor: val || undefined,
                                                });
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                fontSize: '2rem',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <MdArrowForward />
                                        </Box>
                                        <CompanyField
                                            label="Customer"
                                            value={edits.customer || null}
                                            onChange={(val) => {
                                                setEdits({
                                                    ...edits,
                                                    customer: val || undefined,
                                                });
                                            }}
                                        />
                                    </FormRow>
                                </Box>
                                <Box p={1} />
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                >
                                    Order contents
                                </Typography>
                                <Box p={0.5} />
                                <Box
                                    sx={{ display: 'flex', flexFlow: 'column' }}
                                >
                                    {edits.contents &&
                                        edits.contents.map((content, index) => {
                                            const item = items.find(
                                                (i) => i._id === content.item
                                            );
                                            const unit = units.find(
                                                (i) => i._id === content.unit
                                            );
                                            const location = locations.find(
                                                (i) => i._id == content.location
                                            );
                                            const isReady =
                                                unit !== undefined &&
                                                item !== undefined &&
                                                location !== undefined &&
                                                focusedCustomer !== null;
                                            return (
                                                <ButtonBase
                                                    sx={{
                                                        padding: 2,
                                                        paddingLeft: 0,
                                                        borderBottom: `1px solid ${theme.palette.divider}`,
                                                        justifyContent:
                                                            'flex-start',
                                                    }}
                                                    key={'orderLine_' + index}
                                                    onClick={() =>
                                                        setFocusedContent({
                                                            ...content,
                                                            index,
                                                        })
                                                    }
                                                >
                                                    {isReady ? (
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                gap: 2,
                                                            }}
                                                        >
                                                            <Typography>
                                                                {`${
                                                                    content.quantity
                                                                } ${
                                                                    unit[
                                                                        content.quantity ==
                                                                        1
                                                                            ? 'english'
                                                                            : 'english_plural'
                                                                    ]
                                                                } of ${
                                                                    item.english
                                                                }`}
                                                            </Typography>
                                                            <Box
                                                                sx={{
                                                                    fontSize:
                                                                        '1.5rem',
                                                                    display:
                                                                        'flex',
                                                                }}
                                                            >
                                                                <MdChevronRight />
                                                            </Box>
                                                            <Typography>
                                                                {`to ${
                                                                    focusedCustomer.name
                                                                } (${
                                                                    location.label
                                                                        ? location.label
                                                                        : location.address
                                                                        ? location
                                                                              .address
                                                                              .city
                                                                        : 'Unknown location'
                                                                }) by ${format(
                                                                    new Date(
                                                                        content.due
                                                                    ),
                                                                    dateFormats.condensedDate
                                                                )}`}
                                                            </Typography>
                                                        </Box>
                                                    ) : (
                                                        <Box>
                                                            <Typography color="warning.main">
                                                                Specify content
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </ButtonBase>
                                            );
                                        })}
                                </Box>
                                <Box p={0.5} />
                                <Button
                                    disabled={
                                        !focusedCustomer || !focusedVendor
                                    }
                                    startIcon={<MdAdd />}
                                    variant="text"
                                    onClick={() => popContent()}
                                >
                                    Add item
                                </Button>
                            </Box>
                        ),
                    footer: (
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box>
                                <CarefulButton
                                    onClick={() => {
                                        if (id && id.length > 0)
                                            nav(`/logistics/orders/${id}`);
                                        else nav('/');
                                    }}
                                    size="large"
                                    endIcon={<MdClear />}
                                >
                                    Cancel edits
                                </CarefulButton>
                            </Box>
                            <Tooltip title={holdup || ''} arrow>
                                <Box>
                                    <LoadingButton
                                        onClick={handleSubmit}
                                        loading={resultLoading}
                                        disabled={holdup !== null}
                                        variant="contained"
                                        size="large"
                                        endIcon={<MdCheck />}
                                    >
                                        {id !== undefined && id.length > 0
                                            ? 'Save'
                                            : 'Submit'}{' '}
                                        order
                                    </LoadingButton>
                                </Box>
                            </Tooltip>
                        </Box>
                    ),
                }}
            </ColumnBox>

            <ResponsiveDialog
                open={Boolean(focusedContent)}
                onClose={() => setFocusedContent(null)}
            >
                <PanelHeader onClose={() => setFocusedContent(null)}>
                    Order content
                </PanelHeader>
                <FormRow>
                    <LocationField
                        label={
                            focusedCustomer
                                ? `${focusedCustomer.name} destination`
                                : 'Dropoff location'
                        }
                        company={
                            focusedCustomer ? focusedCustomer._id : undefined
                        }
                        onChange={(val) => {
                            if (focusedContent)
                                setFocusedContent({
                                    ...focusedContent,
                                    location: val || '',
                                });
                        }}
                        value={focusedContent ? focusedContent.location : ''}
                    />
                </FormRow>
                <FormRow>
                    <DateField
                        label="Due"
                        value={focusedContent ? focusedContent.due : null}
                        onChange={(val) => {
                            if (focusedContent && val)
                                setFocusedContent({
                                    ...focusedContent,
                                    due: val,
                                });
                        }}
                    />
                </FormRow>
                <FormRow>
                    <ItemField
                        onChange={(val) => {
                            if (focusedContent)
                                setFocusedContent({
                                    ...focusedContent,
                                    item: val || '',
                                });
                        }}
                        value={focusedContent ? focusedContent.item : ''}
                    />
                </FormRow>
                <FormRow>
                    <Box sx={{ maxWidth: 300 }}>
                        <NumberField
                            label="Quantity"
                            onChange={(val) => {
                                if (focusedContent && val !== null)
                                    setFocusedContent({
                                        ...focusedContent,
                                        quantity: val,
                                    });
                            }}
                            value={
                                focusedContent ? focusedContent.quantity : null
                            }
                        />
                    </Box>
                    <UnitField
                        onChange={(val) => {
                            if (focusedContent)
                                setFocusedContent({
                                    ...focusedContent,
                                    unit: val || '',
                                });
                        }}
                        value={focusedContent ? focusedContent.unit : ''}
                    />
                </FormRow>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ flex: 1 }} />
                    <Box>
                        <CarefulButton
                            onClick={() => {
                                popContent(
                                    focusedContent ? focusedContent.index : -1
                                );
                                setFocusedContent(null);
                            }}
                        >
                            Remove
                        </CarefulButton>
                    </Box>
                    <Button
                        onClick={() => {
                            if (focusedContent) {
                                const { index, ...rest } = focusedContent;
                                editContent(index, { ...rest });
                                setFocusedContent(null);
                            }
                        }}
                    >
                        Apply
                    </Button>
                </Box>
            </ResponsiveDialog>
        </AppNav>
    );
};

export default OrderForm;
