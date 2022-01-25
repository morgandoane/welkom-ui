import { LoadingButton } from '@mui/lab';
import {
    Box,
    Button,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
} from '@mui/material';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import {
    MdArrowDownward,
    MdArrowUpward,
    MdCheck,
    MdChevronLeft,
} from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import AppNav from '../../../../../../components/AppNav';
import FormRow from '../../../../../../components/Forms/components/FormRow';
import TextFormField from '../../../../../../components/Forms/components/TextFormField';
import ColumnBox from '../../../../../../components/Layout/ColumnBox';
import Message from '../../../../../../components/Message';
import PageTitle from '../../../../../../components/PageTitle';
import {
    CreateFulfillmentRes,
    useFulfillmentCreation,
} from '../../../../../../graphql/mutations/fulfillment/useFulfillmentCreation';
import {
    UpdateFulfillmentRes,
    useFulfillmentUpdate,
} from '../../../../../../graphql/mutations/fulfillment/useFulfillmentUpdate';
import {
    BolQuery,
    useBol,
} from '../../../../../../graphql/queries/bols/useBol';
import { TinyBolsQuery } from '../../../../../../graphql/queries/bols/useTinyBols';
import { useFulfillment } from '../../../../../../graphql/queries/fulfillment/useFulfillment';
import { FulfillmentType } from '../../../../../../graphql/schema/Fulfillment/Fulfillment';
import {
    CreateFulfillmentInput,
    UpdateFulfillmentInput,
} from '../../../../../../graphql/schema/Fulfillment/FulfillmentInput';
import { OperationResult } from '../../../../../../graphql/types';
import { dateFormats } from '../../../../../../utils/dateFormats';
import FulfillmentItemForm from './components/FulfillmentItemForm';
import FulfillmentReview from './components/FulfillmentReview';

const FulfillmentForm = (props: {
    action?: 'ship' | 'receive';
}): ReactElement => {
    const { action } = props;
    const { fulfillment_id, bol_id } = useParams();
    const nav = useNavigate();

    const [index, setIndex] = React.useState(0);

    const [state, setState] = React.useState<
        | ({ _type: 'create' } & CreateFulfillmentInput)
        | ({ _type: 'update' } & UpdateFulfillmentInput)
    >({
        _type: 'create',
        bol: bol_id || '',
        type:
            action == 'receive'
                ? FulfillmentType.Receipt
                : FulfillmentType.Shipment,
        items: [],
        location: '',
        company: '',
    });

    const {
        data: bolData,
        error: bolError,
        loading: bolLoading,
    } = useBol({
        variables: {
            id: bol_id || '',
        },
        onCompleted: ({ bol: { from, to, contents } }) => {
            if (state._type !== 'update')
                setState({
                    ...state,
                    location:
                        action === 'receive'
                            ? to.location?._id || ''
                            : from.location?._id || '',
                    company:
                        action === 'receive'
                            ? to.company?._id || ''
                            : from.company?._id || '',
                    items: contents.map((content) => ({
                        item: content.item._id,
                        lots: [
                            {
                                location: undefined,
                                company: from.company?._id || '',
                                code: '',
                                quantity: content.quantity,
                                unit: content.unit._id,
                            },
                        ],
                        quality_check_responses: [],
                    })),
                });
        },
    });

    const [result, setResult] = React.useState<null | OperationResult<
        CreateFulfillmentRes | UpdateFulfillmentRes
    >>(null);

    const { _type, ...rest } = state;

    const [create, { loading: createLoading }] = useFulfillmentCreation({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
        variables:
            _type == 'create'
                ? {
                      data: rest,
                      items: rest.items.map((item) => ({
                          ...item,
                          lots: item.lots.map((lot) => ({
                              ...lot,
                              location: lot.location || undefined,
                          })),
                      })),
                  }
                : undefined,
        refetchQueries: [TinyBolsQuery, BolQuery],
    });
    const [update, { loading: updateLoading }] = useFulfillmentUpdate({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
        variables:
            _type == 'update'
                ? {
                      id: fulfillment_id || '',
                      data: {
                          ...rest,
                      },
                  }
                : undefined,
        refetchQueries: [TinyBolsQuery, BolQuery],
    });

    const submit = () => {
        if (state._type == 'create') {
            create();
        } else update();
    };

    const bol = bolData ? bolData.bol : null;

    const itinerary = bol ? bol.itinerary : null;

    const { data, error, loading } = useFulfillment({
        variables: !fulfillment_id
            ? undefined
            : {
                  id: fulfillment_id,
              },
        skip: !fulfillment_id,
        onCompleted: ({
            fulfillment: { lots, type, location, company, bol },
        }) => {
            setState({
                _type: 'update',
                bol: bol_id || '',
                seal: bol.seal || undefined,
                items: lots.map(({ item, contents }) => ({
                    item: item._id,
                    lots: contents.map(
                        ({
                            lot: { code, company, location },
                            quantity,
                            unit,
                        }) => ({
                            code,
                            quantity,
                            unit: unit._id,
                            company: company ? company._id : '',
                            location: location ? location._id : undefined,
                        })
                    ),
                    quality_check_responses: lots
                        .map((lot) => lot.quality_check_responses)
                        .flat()
                        .map((response) => ({
                            qualityCheck: response.qualityCheck._id,
                            response: response.response,
                        })),
                })),
                type,
                location: location._id,
                company: company._id,
            });
        },
    });

    const fulfillment = data ? data.fulfillment : null;

    const formType = fulfillment
        ? fulfillment.type
        : action == 'receive'
        ? FulfillmentType.Receipt
        : FulfillmentType.Shipment;

    const from = !bol ? null : bol.from;
    const to = !bol ? null : bol.to;

    return (
        <AppNav
            error={error || bolError}
            loading={loading || bolLoading}
            discrete={false}
        >
            {result && result.success ? (
                <Message
                    type="Success"
                    message="Receipt saved!"
                    onComplete={() => {
                        if ('createFulfillment' in result.data) {
                            nav(
                                formType == FulfillmentType.Receipt
                                    ? `/warehouse/receiving/${result.data.createFulfillment.bol._id}/${result.data.createFulfillment._id}/print`
                                    : `/warehouse/shipping/${result.data.createFulfillment.bol._id}/${result.data.createFulfillment._id}/print`
                            );
                        } else {
                            nav(
                                formType == FulfillmentType.Receipt
                                    ? '/warehouse/receiving'
                                    : '/warehouse/shipping'
                            );
                        }
                    }}
                />
            ) : result ? (
                <Message
                    type="Warning"
                    message={result.error.message}
                    action={
                        <Button onClick={() => setResult(null)}>
                            Try again
                        </Button>
                    }
                />
            ) : (
                <ColumnBox>
                    {{
                        content: (
                            <Box>
                                <Box sx={{ display: 'flex', flexFlow: 'row' }}>
                                    <Box>
                                        <Button
                                            variant="text"
                                            color="inherit"
                                            startIcon={<MdChevronLeft />}
                                            onClick={() =>
                                                nav(
                                                    fulfillment
                                                        ? `/warehouse/${
                                                              fulfillment.type ===
                                                              FulfillmentType.Receipt
                                                                  ? 'receiving'
                                                                  : 'shipping'
                                                          }/${
                                                              fulfillment.bol
                                                                  ._id
                                                          }/${fulfillment._id}`
                                                        : `/warehouse/${
                                                              action ==
                                                              'receive'
                                                                  ? 'receiving'
                                                                  : 'shipping'
                                                          }`
                                                )
                                            }
                                        >
                                            {fulfillment
                                                ? fulfillment.type
                                                : 'Back to BOL'}
                                        </Button>
                                        <PageTitle>
                                            {formType == FulfillmentType.Receipt
                                                ? fulfillment_id
                                                    ? 'Update Receipt'
                                                    : 'New Receipt'
                                                : fulfillment_id
                                                ? 'Update Shipment'
                                                : 'New Shipment'}
                                        </PageTitle>
                                        <Typography variant="h6">
                                            {bol ? bol.code : ''}
                                        </Typography>
                                        <Typography variant="h6">
                                            {bol
                                                ? bol.contents
                                                      .map(
                                                          (c) => c.item.english
                                                      )
                                                      .join(', ')
                                                : ''}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }} />
                                    {from && bol && to && (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexFlow: 'column',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: 6,
                                                }}
                                            >
                                                <Box>
                                                    <Typography
                                                        variant="caption"
                                                        color="textSecondary"
                                                    >
                                                        From
                                                    </Typography>
                                                    <Typography>
                                                        {from.company.name +
                                                            (from.location
                                                                ? ` (${
                                                                      from
                                                                          .location
                                                                          .label ||
                                                                      from
                                                                          .location
                                                                          .address
                                                                          ?.city
                                                                  })`
                                                                : '')}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {format(
                                                            new Date(from.date),
                                                            dateFormats.condensedDate
                                                        )}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography
                                                        variant="caption"
                                                        color="textSecondary"
                                                    >
                                                        To
                                                    </Typography>
                                                    <Typography>
                                                        {to.company.name +
                                                            (to.location
                                                                ? ` (${
                                                                      to
                                                                          .location
                                                                          .label ||
                                                                      to
                                                                          .location
                                                                          .address
                                                                          ?.city
                                                                  })`
                                                                : '')}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {format(
                                                            new Date(to.date),
                                                            dateFormats.condensedDate
                                                        )}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                                <Box sx={{ p: 1 }} />
                                <Stepper
                                    activeStep={index}
                                    orientation="vertical"
                                >
                                    <Step>
                                        <StepLabel>Details</StepLabel>
                                        <StepContent>
                                            <Box
                                                sx={{
                                                    maxWidth: 400,
                                                    padding: 2,
                                                }}
                                            >
                                                {bol && (
                                                    <Box>
                                                        <FormRow gap={4}>
                                                            <TextFormField
                                                                label="BOL number"
                                                                value={
                                                                    state.bol_code_override ||
                                                                    bol.code ||
                                                                    ''
                                                                }
                                                                onChange={(
                                                                    val
                                                                ) => {
                                                                    setState({
                                                                        ...state,
                                                                        bol_code_override:
                                                                            val ||
                                                                            undefined,
                                                                    });
                                                                }}
                                                            />
                                                        </FormRow>

                                                        {action !== 'ship' && (
                                                            <FormRow gap={4}>
                                                                <TextFormField
                                                                    label="Seal number"
                                                                    value={
                                                                        state.seal ||
                                                                        ''
                                                                    }
                                                                    onChange={(
                                                                        val
                                                                    ) => {
                                                                        setState(
                                                                            {
                                                                                ...state,
                                                                                seal:
                                                                                    val ||
                                                                                    '',
                                                                            }
                                                                        );
                                                                    }}
                                                                />
                                                            </FormRow>
                                                        )}
                                                    </Box>
                                                )}
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Button
                                                        disabled={
                                                            !bol ||
                                                            (!bol.code &&
                                                                !state.bol_code_override) ||
                                                            (!state.seal &&
                                                                state.type ===
                                                                    FulfillmentType.Receipt)
                                                        }
                                                        endIcon={
                                                            <MdArrowDownward />
                                                        }
                                                        onClick={() =>
                                                            setIndex(index + 1)
                                                        }
                                                    >
                                                        Next
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </StepContent>
                                    </Step>
                                    {bol &&
                                        state.items.map((item, itemIndex) => {
                                            const contents = bol
                                                ? bol.contents
                                                : [];
                                            const content = contents.find(
                                                (c) => c.item._id === item.item
                                            );
                                            const lots = item.lots;
                                            if (content)
                                                return (
                                                    <Step
                                                        key={
                                                            'content_' +
                                                            itemIndex
                                                        }
                                                    >
                                                        <StepLabel>
                                                            {`${
                                                                content.item
                                                                    .english
                                                            } - ${
                                                                content.quantity
                                                            } ${
                                                                content.unit[
                                                                    content.quantity ==
                                                                    1
                                                                        ? 'english'
                                                                        : 'english_plural'
                                                                ]
                                                            }`}
                                                        </StepLabel>
                                                        <StepContent
                                                            TransitionProps={{
                                                                unmountOnExit:
                                                                    false,
                                                            }}
                                                        >
                                                            <FulfillmentItemForm
                                                                initiate={
                                                                    state._type !==
                                                                    'update'
                                                                }
                                                                droppable={
                                                                    lots.length >
                                                                    1
                                                                }
                                                                tiny_item={
                                                                    content.item
                                                                }
                                                                item={item}
                                                                setItem={(
                                                                    value
                                                                ) => {
                                                                    const copy =
                                                                        {
                                                                            ...state,
                                                                        };
                                                                    copy.items[
                                                                        itemIndex
                                                                    ] = value;
                                                                    setState(
                                                                        copy
                                                                    );
                                                                }}
                                                                next={() =>
                                                                    setIndex(
                                                                        index +
                                                                            1
                                                                    )
                                                                }
                                                                previous={() =>
                                                                    setIndex(
                                                                        index -
                                                                            1
                                                                    )
                                                                }
                                                                drop={(i) => {
                                                                    const copy =
                                                                        {
                                                                            ...state,
                                                                        };
                                                                    copy.items[
                                                                        itemIndex
                                                                    ].lots.splice(
                                                                        i,
                                                                        1
                                                                    );
                                                                    setState(
                                                                        copy
                                                                    );
                                                                }}
                                                            />
                                                        </StepContent>
                                                    </Step>
                                                );
                                        })}
                                    <Step>
                                        <StepLabel>Review</StepLabel>
                                        <StepContent>
                                            <Box sx={{ p: 2 }}>
                                                <FulfillmentReview
                                                    value={state}
                                                    bol={bol}
                                                />
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        gap: 2,
                                                    }}
                                                >
                                                    <LoadingButton
                                                        loading={
                                                            createLoading ||
                                                            updateLoading
                                                        }
                                                        color="inherit"
                                                        variant="outlined"
                                                        endIcon={
                                                            <MdArrowUpward />
                                                        }
                                                        onClick={() =>
                                                            setIndex(index - 1)
                                                        }
                                                    >
                                                        Previous
                                                    </LoadingButton>
                                                    <LoadingButton
                                                        loading={
                                                            createLoading ||
                                                            updateLoading
                                                        }
                                                        variant="contained"
                                                        color="success"
                                                        endIcon={<MdCheck />}
                                                        onClick={submit}
                                                    >
                                                        Save
                                                        {formType ==
                                                        FulfillmentType.Receipt
                                                            ? ' receipt'
                                                            : ' shipment'}
                                                    </LoadingButton>
                                                </Box>
                                            </Box>
                                        </StepContent>
                                    </Step>
                                </Stepper>
                            </Box>
                        ),
                    }}
                </ColumnBox>
            )}
        </AppNav>
    );
};

export default FulfillmentForm;
