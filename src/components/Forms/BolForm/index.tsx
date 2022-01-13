import { LoadingButton } from '@mui/lab';
import {
    Box,
    Button,
    ButtonBase,
    Collapse,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import { setHours, startOfDay } from 'date-fns';
import React, { ReactElement } from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { MdAdd, MdCheck, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import {
    CreateBolRes,
    useBolCreation,
} from '../../../graphql/mutations/bol/useBolCreation';
import {
    UpdateBolRes,
    useBolUpdate,
} from '../../../graphql/mutations/bol/useBolUpdate';
import { useBol } from '../../../graphql/queries/bols/useBol';
import { useItinerary } from '../../../graphql/queries/itinerary/useItinerary';
import { OrderQuery, useOrder } from '../../../graphql/queries/orders/Order';
import { useOrderSetup } from '../../../graphql/queries/orders/useOrderSetup';
import {
    CreateBolInput,
    UpdateBolInput,
} from '../../../graphql/schema/Bol/BolInput';
import { CodeType } from '../../../graphql/schema/Code/Code';
import { BolItemContent } from '../../../graphql/schema/Content/Content';
import { OperationResult } from '../../../graphql/types';
import AppNav from '../../AppNav';
import Info from '../../Info';
import ColumnBox from '../../Layout/ColumnBox';
import Message from '../../Message';
import PageTitle from '../../PageTitle';
import PanelHeader from '../../PanelComponents/PanelHeader';
import ResponsiveDialog from '../../ResponsiveDialog';
import CarefulButton from '../CarefulButton';
import BooleanField from '../components/BooleanField';
import CodeField from '../components/CodeField';
import CompanyField from '../components/CompanyField';
import DateField from '../components/DateField';
import FormRow from '../components/FormRow';
import ItemField from '../components/ItemField';
import LocationField from '../components/LocationField';
import NumberField from '../components/NumberField';
import UnitField from '../components/UnitField';

const BolForm = (props: {
    back?: string;
    back_label?: string;
}): ReactElement => {
    const { id, order_id, itinerary_id } = useParams();
    const nav = useNavigate();
    const theme = useTheme();

    const baseState: CreateBolInput = {
        itinerary: itinerary_id || '',
        code: '',
        from: {
            company: '',
            date: setHours(startOfDay(new Date()), 9),
        },
        to: {
            company: '',
            date: setHours(startOfDay(new Date()), 9),
        },
        contents: [],
    };

    const [state, setState] = React.useState<UpdateBolInput | CreateBolInput>(
        baseState
    );

    const [result, setResult] = React.useState<OperationResult<
        CreateBolRes | UpdateBolRes
    > | null>(null);

    const [handleCreate, { loading: createLoading }] = useBolCreation({
        onCompleted: (data) => {
            setResult({ success: true, data });
        },
        onError: (error) => {
            setResult({ success: false, error });
        },
        refetchQueries: [OrderQuery],
    });

    const [handleUpdate, { loading: updateLoading }] = useBolUpdate({
        onCompleted: (data) => {
            setResult({ success: true, data });
        },
        onError: (error) => {
            setResult({ success: false, error });
        },
        refetchQueries: [OrderQuery],
    });

    const submit = () => {
        if (id && id !== '' && !('order' in state)) {
            // update
            handleUpdate({
                variables: {
                    id,
                    data: state,
                },
            });
        } else {
            // create
            handleCreate({
                variables: {
                    data: { ...state, itinerary: itinerary_id || '' },
                },
            });
        }
    };

    const [focusedContent, setFocusedContent] = React.useState<
        ({ index: number } & CreateBolInput['contents'][number]) | null
    >(null);

    const {
        data: orderData,
        loading: orderLoading,
        error: orderError,
    } = useOrder({
        variables: {
            id: order_id || '',
        },
        skip: !order_id || order_id == '',
    });

    const { data: itineraryData } = useItinerary({
        variables: {
            id: itinerary_id || '',
        },
        skip: !itinerary_id || itinerary_id == '',
    });

    const {
        loading: setupLoading,
        data: { items, locations, units, profiles },
    } = useOrderSetup();

    const { loading, error } = useBol({
        variables: {
            id: id || '',
        },
        skip: !id || id == '',
        onCompleted: ({ bol: { code, from, to, contents } }) => {
            setState({
                code: code || '',
                from: {
                    location: from.location ? from.location._id : undefined,
                    company: from.company._id,
                    date: from.date,
                },
                to: {
                    location: to.location ? to.location._id : undefined,
                    company: to.company._id,
                    date: to.date,
                },
                contents: contents.map(({ item, unit, quantity }) => ({
                    item: item._id,
                    unit: unit._id,
                    quantity,
                })),
            });
        },
    });

    const { code, from, to, contents } = state;

    const getFocusedHoldup = (): string | null => {
        if (focusedContent) {
            if (
                state.contents.map((c) => c.item).includes(focusedContent.item)
            ) {
                const match = items.find((i) => i._id == focusedContent.item);
                return `BOL already contains ${match?.english || ''}`;
            }
            if (focusedContent.quantity == 0) return 'Please enter a quantity';
            if (focusedContent.unit == '') return 'Please select a unit';
            if (focusedContent.item == '') return 'Please select an item';
        }
        return null;
    };

    const getBolHoldup = (): string | null => {
        if (state.from.company == '')
            return 'Please select a company to pickup from';
        if (state.to.company == '')
            return 'Please select a company to dropoff at';
        if (state.code == '') return 'Please generate a BOL number';
        return null;
    };

    const focusedHoldup = getFocusedHoldup();
    const bolHoldup = getBolHoldup();

    return (
        <AppNav
            loading={loading || orderLoading || setupLoading}
            error={error || orderError}
        >
            {result && result.success == true ? (
                <Message
                    type="Success"
                    message={
                        'updateBol' in result.data
                            ? result.data.updateBol.deleted == true
                                ? 'BOL deleted!'
                                : 'BOL updated!'
                            : 'Bol saved!'
                    }
                    onComplete={() =>
                        nav(
                            props.back
                                ? props.back
                                : '/logistics/orders/' + order_id
                        )
                    }
                />
            ) : result ? (
                <Message
                    type="Warning"
                    message={result.error.message}
                    action={
                        <Button variant="text" onClick={() => setResult(null)}>
                            Try again
                        </Button>
                    }
                />
            ) : (
                <ColumnBox>
                    {{
                        header: (
                            <Box sx={{ paddingBottom: 2 }}>
                                <Button
                                    startIcon={<MdChevronLeft />}
                                    variant="text"
                                    color="inherit"
                                    onClick={() =>
                                        nav(
                                            props.back
                                                ? props.back
                                                : '/logistics/orders/' +
                                                      order_id
                                        )
                                    }
                                >
                                    {props.back_label || 'Back to order'}
                                </Button>
                                <PageTitle>
                                    {id && id.length > 0
                                        ? 'Update BOL'
                                        : 'Create BOL'}
                                </PageTitle>
                                <Typography color="textSecondary">
                                    {orderData
                                        ? `on behalf of order ${orderData.order.code}`
                                        : ''}
                                </Typography>
                                <Typography color="textSecondary">
                                    {itineraryData
                                        ? `as part of itinerary ${itineraryData.itinerary.code}`
                                        : ''}
                                </Typography>
                            </Box>
                        ),
                        content: (
                            <Box>
                                <Box sx={{ paddingBottom: 4, maxWidth: 320 }}>
                                    <CodeField
                                        type={CodeType.BOL}
                                        value={state.code}
                                        onChange={(code) =>
                                            setState({ ...state, code })
                                        }
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 4,
                                        maxWidth: 850,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexFlow: 'column',
                                            flex: 1,
                                            gap: 2,
                                        }}
                                    >
                                        <Typography variant="h6">
                                            Pickup
                                        </Typography>
                                        <CompanyField
                                            label="From company"
                                            value={from.company}
                                            onChange={(val) =>
                                                setState({
                                                    ...state,
                                                    from: {
                                                        ...state.from,
                                                        company: val || '',
                                                    },
                                                })
                                            }
                                        />
                                        <DateField
                                            value={from.date}
                                            onChange={(date) => {
                                                if (date) {
                                                    setState({
                                                        ...state,
                                                        from: {
                                                            ...state.from,
                                                            date,
                                                        },
                                                    });
                                                }
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexFlow: 'row',
                                            }}
                                        >
                                            <BooleanField
                                                label="Location"
                                                value={
                                                    from.location !== undefined
                                                }
                                                onChange={(val) => {
                                                    setState({
                                                        ...state,
                                                        from: {
                                                            ...state.from,
                                                            location:
                                                                val == true
                                                                    ? ''
                                                                    : undefined,
                                                        },
                                                    });
                                                }}
                                            />
                                            <Box sx={{ flex: 1 }}>
                                                <Collapse
                                                    in={
                                                        from.location !==
                                                        undefined
                                                    }
                                                >
                                                    <LocationField
                                                        company={from.company}
                                                        label="From location"
                                                        value={
                                                            from.location || ''
                                                        }
                                                        onChange={(val) =>
                                                            setState({
                                                                ...state,
                                                                from: {
                                                                    ...state.from,
                                                                    location:
                                                                        val ||
                                                                        '',
                                                                },
                                                            })
                                                        }
                                                    />
                                                </Collapse>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            fontSize: '1.75rem',
                                        }}
                                    >
                                        <MdChevronRight />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexFlow: 'column',
                                                flex: 1,
                                                gap: 2,
                                            }}
                                        >
                                            <Typography variant="h6">
                                                Dropoff
                                            </Typography>
                                            <CompanyField
                                                label="To company"
                                                value={to.company}
                                                onChange={(val) =>
                                                    setState({
                                                        ...state,
                                                        to: {
                                                            ...state.to,
                                                            company: val || '',
                                                        },
                                                    })
                                                }
                                            />
                                            <DateField
                                                value={to.date}
                                                onChange={(date) => {
                                                    if (date) {
                                                        setState({
                                                            ...state,
                                                            to: {
                                                                ...state.to,
                                                                date,
                                                            },
                                                        });
                                                    }
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexFlow: 'row',
                                                }}
                                            >
                                                <BooleanField
                                                    label="Location"
                                                    value={
                                                        to.location !==
                                                        undefined
                                                    }
                                                    onChange={(val) => {
                                                        setState({
                                                            ...state,
                                                            to: {
                                                                ...state.to,
                                                                location:
                                                                    val == true
                                                                        ? ''
                                                                        : undefined,
                                                            },
                                                        });
                                                    }}
                                                />
                                                <Box sx={{ flex: 1 }}>
                                                    <Collapse
                                                        in={
                                                            to.location !==
                                                            undefined
                                                        }
                                                    >
                                                        <LocationField
                                                            company={to.company}
                                                            label="To location"
                                                            value={
                                                                to.location ||
                                                                ''
                                                            }
                                                            onChange={(val) =>
                                                                setState({
                                                                    ...state,
                                                                    to: {
                                                                        ...state.to,
                                                                        location:
                                                                            val ||
                                                                            '',
                                                                    },
                                                                })
                                                            }
                                                        />
                                                    </Collapse>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ paddingTop: 4 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{ paddingBottom: 2 }}
                                    >
                                        Contents
                                    </Typography>
                                    {contents.length == 0 && (
                                        <Box>
                                            <Typography color="textSecondary">
                                                This BOL has no contents
                                            </Typography>
                                        </Box>
                                    )}
                                    {contents.map((content, contentIndex) => {
                                        const item = items.find(
                                            (i) => i._id === content.item
                                        );
                                        const unit = units.find(
                                            (i) => i._id === content.unit
                                        );

                                        const isReady =
                                            unit !== undefined &&
                                            item !== undefined;

                                        if (!isReady)
                                            return (
                                                <ButtonBase
                                                    onClick={() =>
                                                        setFocusedContent({
                                                            index: contentIndex,
                                                            item: content.item,
                                                            unit: content.unit,
                                                            quantity:
                                                                content.quantity,
                                                        })
                                                    }
                                                    sx={{
                                                        padding: 1,
                                                        ...theme.shape,
                                                        alignItems:
                                                            'flex-start',
                                                    }}
                                                    color="warning.main"
                                                >
                                                    BOL line needs attention
                                                </ButtonBase>
                                            );
                                        else
                                            return (
                                                <ButtonBase
                                                    onClick={() =>
                                                        setFocusedContent({
                                                            index: contentIndex,
                                                            item: content.item,
                                                            unit: content.unit,
                                                            quantity:
                                                                content.quantity,
                                                        })
                                                    }
                                                    sx={{
                                                        padding: 1,
                                                        ...theme.shape,
                                                        display: 'flex',
                                                        flexFlow: 'row',
                                                        justifyContent:
                                                            'flex-start',
                                                        textAlign: 'center',
                                                        gap: 2,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            fontSize: '2rem',
                                                            color: theme.palette
                                                                .text.secondary,
                                                        }}
                                                    >
                                                        <BsBoxSeam />
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            textAlign: 'left',
                                                        }}
                                                    >
                                                        <Typography
                                                            fontWeight={500}
                                                            variant="body1"
                                                        >
                                                            {item.english}
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                                gap: 1,
                                                            }}
                                                            color="textSecondary"
                                                        >
                                                            {`${
                                                                content.quantity
                                                            } ${
                                                                unit[
                                                                    content.quantity ==
                                                                    1
                                                                        ? 'english'
                                                                        : 'english_plural'
                                                                ]
                                                            }`}
                                                        </Typography>
                                                    </Box>
                                                </ButtonBase>
                                            );
                                    })}
                                    <Box sx={{ paddingTop: 2 }}>
                                        <Button
                                            onClick={() => {
                                                setFocusedContent({
                                                    index: -1,
                                                    item: '',
                                                    unit: '',
                                                    quantity: 0,
                                                });
                                            }}
                                            variant="text"
                                            startIcon={<MdAdd />}
                                        >
                                            Add item
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        ),
                        footer: (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexFlow: 'row',
                                    alignItems: 'flex-end',
                                }}
                            >
                                <Box sx={{ padding: 2 }}>
                                    <Tooltip
                                        title={bolHoldup || ''}
                                        arrow
                                        placement="top"
                                    >
                                        <Box>
                                            <LoadingButton
                                                onClick={submit}
                                                variant="contained"
                                                loading={
                                                    updateLoading ||
                                                    createLoading
                                                }
                                                disabled={bolHoldup !== null}
                                                size="large"
                                                endIcon={<MdCheck />}
                                            >
                                                Save BOL
                                            </LoadingButton>
                                        </Box>
                                    </Tooltip>
                                </Box>
                            </Box>
                        ),
                    }}
                </ColumnBox>
            )}
            <ResponsiveDialog
                open={Boolean(focusedContent)}
                onClose={() => setFocusedContent(null)}
            >
                <PanelHeader onClose={() => setFocusedContent(null)}>
                    BOL item
                </PanelHeader>
                <FormRow>
                    <ItemField
                        value={focusedContent ? focusedContent.item : ''}
                        onChange={(val) => {
                            if (focusedContent)
                                setFocusedContent({
                                    ...focusedContent,
                                    item: val || '',
                                });
                        }}
                    />
                </FormRow>
                <FormRow>
                    <NumberField
                        label="Quantity"
                        value={focusedContent ? focusedContent.quantity : 0}
                        onChange={(val) => {
                            if (focusedContent)
                                setFocusedContent({
                                    ...focusedContent,
                                    quantity: val || 0,
                                });
                        }}
                    />
                    <UnitField
                        value={focusedContent ? focusedContent.unit : ''}
                        onChange={(val) => {
                            if (focusedContent)
                                setFocusedContent({
                                    ...focusedContent,
                                    unit: val || '',
                                });
                        }}
                    />
                </FormRow>
                <Box sx={{ display: 'flex' }}>
                    {focusedContent && focusedContent.index !== -1 && (
                        <Box>
                            <CarefulButton
                                onClick={() => {
                                    if (focusedContent) {
                                        const contents = [...state.contents];
                                        contents.splice(
                                            focusedContent.index,
                                            1
                                        );
                                        setState({ ...state, contents });
                                        setFocusedContent(null);
                                    }
                                }}
                            >
                                Drop
                            </CarefulButton>
                        </Box>
                    )}
                    <Box sx={{ flex: 1 }} />
                    <Tooltip title={focusedHoldup || ''} arrow placement="top">
                        <Box>
                            <Button
                                disabled={focusedHoldup !== null}
                                onClick={() => {
                                    if (focusedContent) {
                                        const { index, ...rest } =
                                            focusedContent;
                                        setState({
                                            ...state,
                                            contents: [...state.contents, rest],
                                        });
                                        setFocusedContent(null);
                                    }
                                }}
                            >
                                Apply
                            </Button>
                        </Box>
                    </Tooltip>
                </Box>
            </ResponsiveDialog>
        </AppNav>
    );
};

export default BolForm;
