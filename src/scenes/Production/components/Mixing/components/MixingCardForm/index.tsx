import { cloneDeep } from '@apollo/client/utilities';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Tooltip, Typography, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { MdAdd, MdCheck, MdChevronLeft, MdDelete } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import {
    UiPermission,
    UiPermissionData,
    UiPermissions,
} from '../../../../../../auth/UiPermission';
import AppNav from '../../../../../../components/AppNav';
import CarefulButton from '../../../../../../components/Forms/CarefulButton';
import FormRow from '../../../../../../components/Forms/components/FormRow';
import LocationField from '../../../../../../components/Forms/components/LocationField';
import PersonField from '../../../../../../components/Forms/components/PersonField';
import ProductionLineField from '../../../../../../components/Forms/components/ProductionLineField';
import ColumnBox from '../../../../../../components/Layout/ColumnBox';
import Message from '../../../../../../components/Message';
import PageTitle from '../../../../../../components/PageTitle';
import {
    CreateMixingCardArgs,
    CreateMixingCardRes,
    useMixingCardCreation,
} from '../../../../../../graphql/mutations/recipeCard/useRecipeCardCreation';
import {
    UpdateMixingCardArgs,
    UpdateMixingCardRes,
    useMixingCardUpdate,
} from '../../../../../../graphql/mutations/recipeCard/useRecipeCardUpdate';
import { useMixingCard } from '../../../../../../graphql/queries/mixingCards/useMixingCard';
import { MixingCardsQuery } from '../../../../../../graphql/queries/mixingCards/useMixingCards';
import { OperationResult } from '../../../../../../graphql/types';
import { relocate } from '../../../../../../utils/relocate';
import MixingCardLineForm from './components/MixingCardLineForm';

export type MixingCardFormState =
    | ({ _type: 'create' } & CreateMixingCardArgs)
    | ({ _type: 'update' } & UpdateMixingCardArgs);

const MixingCardForm = (): ReactElement => {
    const { id } = useParams();
    const nav = useNavigate();

    const { palette, shape, transitions } = useTheme();

    const requiredPermissions = (
        UiPermissions.find(
            (p) => p.name == UiPermission.Mixing
        ) as UiPermissionData
    ).permissions;

    const [state, setState] = React.useState<MixingCardFormState>({
        _type: 'create',
        data: {
            location: '',
            profile: '',
            production_line: null,
            lines: [
                {
                    recipe: '',
                },
            ],
        },
    });

    const [result, setResult] = React.useState<OperationResult<
        CreateMixingCardRes | UpdateMixingCardRes
    > | null>(null);

    const [create, { loading: createLoading }] = useMixingCardCreation({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
        variables:
            state._type == 'create'
                ? {
                      data: state.data,
                  }
                : undefined,
        refetchQueries: [MixingCardsQuery],
    });

    const [update, { loading: updateLoading }] = useMixingCardUpdate({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
        variables:
            state._type == 'update'
                ? {
                      id: state.id,
                      data: state.data,
                  }
                : undefined,
        refetchQueries: [MixingCardsQuery],
    });

    const submit = () => {
        if (state._type == 'create') create();
        else update();
    };

    const { loading, error } = useMixingCard({
        variables: {
            id: id || '',
        },
        skip: !id,
        onCompleted: ({ mixingCard }) => {
            setState({
                _type: 'update',
                id: mixingCard._id,
                data: {
                    production_line: mixingCard.production_line?._id || null,
                    profile: mixingCard.profile.user_id,
                    location: mixingCard.location._id,
                    lines: mixingCard.lines.map((line) => ({
                        recipe: line.recipe._id,
                        recipe_version: line.recipe_version?._id || null,
                        limit: line.limit || undefined,
                    })),
                },
            });
        },
        fetchPolicy: 'network-only',
    });

    const getHoldup = (): string | null => {
        if (!state.data.location)
            return 'Please specify a location for this card.';

        if (!state.data.profile)
            return 'Please specify a profile for this card.';

        if (state.data.lines.length == 0)
            return 'Please add at least 1 batch to this card';

        if (state.data.lines.some((line) => !line.recipe))
            return 'Please sepcify a recipe for each line in card';

        if (state.data.lines.some((line) => line.recipe_version === ''))
            return 'Please specify a recipe version or use the latest.';

        return null;
    };

    const holdup = getHoldup();

    return (
        <AppNav padding={0} loading={loading} error={error} discrete={false}>
            {result && result.success ? (
                <Message
                    type="Success"
                    message={
                        'createMixingCard' in result.data
                            ? 'Recipe card created!'
                            : result.data.updateMixingCard.deleted
                            ? 'Recipe card deleted'
                            : 'Recipe card updated!'
                    }
                    onComplete={() => nav('/production/mixing')}
                />
            ) : result ? (
                <Message
                    type="Warning"
                    message={result.error.message}
                    action={
                        <Box sx={{ p: 1 }}>
                            <Button onClick={() => setResult(null)}>
                                Try again
                            </Button>
                        </Box>
                    }
                />
            ) : (
                <ColumnBox>
                    {{
                        header: (
                            <Box sx={{ paddingLeft: 4, paddingTop: 4 }}>
                                <Button
                                    onClick={() => nav('/production/mixing')}
                                    startIcon={<MdChevronLeft />}
                                    variant="text"
                                    color="inherit"
                                >
                                    Mixing Board
                                </Button>
                                <PageTitle>
                                    {id
                                        ? 'Edit Mixing Card'
                                        : 'New Mixing Card'}
                                </PageTitle>
                            </Box>
                        ),
                        content: (
                            <Box sx={{ padding: 4, paddingTop: 1 }}>
                                <Box
                                    sx={{
                                        maxWidth: 950,
                                        display: 'flex',
                                        flexFlow: 'column',
                                        gap: 1,
                                    }}
                                >
                                    <Box sx={{ maxWidth: 300 }}>
                                        <FormRow>
                                            <PersonField
                                                has_permissions={
                                                    requiredPermissions
                                                }
                                                label="Profile"
                                                value={state.data.profile}
                                                onChange={(val) => [
                                                    setState({
                                                        ...state,
                                                        data: {
                                                            ...state.data,
                                                            profile: val || '',
                                                        },
                                                    }),
                                                ]}
                                            />
                                        </FormRow>
                                        <FormRow>
                                            <LocationField
                                                mine
                                                label="Location"
                                                value={
                                                    state.data.location || ''
                                                }
                                                onChange={(val) => [
                                                    setState({
                                                        ...state,
                                                        data: {
                                                            ...state.data,
                                                            location: val || '',
                                                        },
                                                    }),
                                                ]}
                                            />
                                        </FormRow>
                                        <FormRow>
                                            <ProductionLineField
                                                value={
                                                    state.data
                                                        .production_line || null
                                                }
                                                location={
                                                    state.data.location ||
                                                    undefined
                                                }
                                                onChange={(production_line) => [
                                                    setState({
                                                        ...state,
                                                        data: {
                                                            ...state.data,
                                                            production_line,
                                                        },
                                                    }),
                                                ]}
                                            />
                                        </FormRow>
                                    </Box>
                                    <Box
                                        sx={{
                                            ...shape,
                                            border: `1px solid ${palette.divider}`,
                                            transition: transitions.create(
                                                'all',
                                                { duration: 250 }
                                            ),
                                            marginRight: state.data.lines.some(
                                                (l) =>
                                                    typeof l.recipe_version ==
                                                    'string'
                                            )
                                                ? '0%'
                                                : '25%',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                p: 2,
                                                background:
                                                    palette.background.paper,
                                            }}
                                        >
                                            <Typography>Batches</Typography>
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                            >{`Sorted in order that the mixer should complete them`}</Typography>
                                        </Box>
                                        <DragDropContext
                                            onDragEnd={(event) => {
                                                const { destination, source } =
                                                    event;

                                                if (destination && source) {
                                                    const copy =
                                                        cloneDeep(state);
                                                    copy.data.lines = relocate(
                                                        copy.data.lines,
                                                        source.index,
                                                        destination.index
                                                    );
                                                    setState(copy);
                                                }
                                            }}
                                        >
                                            <Droppable droppableId="root">
                                                {(drop, dropSnap) => (
                                                    <Box
                                                        ref={drop.innerRef}
                                                        {...drop.droppableProps}
                                                    >
                                                        {state.data.lines.map(
                                                            (
                                                                line,
                                                                lineIndex
                                                            ) => (
                                                                <MixingCardLineForm
                                                                    key={
                                                                        'lineForm_' +
                                                                        lineIndex
                                                                    }
                                                                    value={line}
                                                                    index={
                                                                        lineIndex
                                                                    }
                                                                    onChange={(
                                                                        val
                                                                    ) => {
                                                                        const copy =
                                                                            cloneDeep(
                                                                                state
                                                                            );

                                                                        copy.data.lines[
                                                                            lineIndex
                                                                        ] = val;

                                                                        setState(
                                                                            copy
                                                                        );
                                                                    }}
                                                                    onDrop={() => {
                                                                        const copy =
                                                                            cloneDeep(
                                                                                state
                                                                            );

                                                                        copy.data.lines.splice(
                                                                            lineIndex,
                                                                            1
                                                                        );

                                                                        setState(
                                                                            copy
                                                                        );
                                                                    }}
                                                                />
                                                            )
                                                        )}
                                                        {drop.placeholder}
                                                    </Box>
                                                )}
                                            </Droppable>
                                        </DragDropContext>
                                    </Box>
                                    <Box>
                                        <Button
                                            onClick={() => {
                                                setState({
                                                    ...state,
                                                    data: {
                                                        ...state.data,
                                                        lines: [
                                                            ...state.data.lines,
                                                            {
                                                                recipe: '',
                                                            },
                                                        ],
                                                    },
                                                });
                                            }}
                                            variant="text"
                                            startIcon={<MdAdd />}
                                        >
                                            Batch
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        ),
                        footer: (
                            <Box sx={{ display: 'flex', padding: 4, gap: 3 }}>
                                <Tooltip arrow title={holdup || ''}>
                                    <Box>
                                        <LoadingButton
                                            onClick={submit}
                                            loading={
                                                createLoading || updateLoading
                                            }
                                            color="primary"
                                            variant="contained"
                                            disabled={Boolean(holdup)}
                                            size="large"
                                            endIcon={<MdCheck />}
                                        >
                                            Publish
                                        </LoadingButton>
                                    </Box>
                                </Tooltip>
                                {state._type == 'update' && (
                                    <Box>
                                        <CarefulButton
                                            onClick={() => {
                                                update({
                                                    onCompleted: (data) =>
                                                        setResult({
                                                            success: true,
                                                            data,
                                                        }),
                                                    onError: (error) =>
                                                        setResult({
                                                            success: false,
                                                            error,
                                                        }),
                                                    variables:
                                                        state._type == 'update'
                                                            ? {
                                                                  id: state.id,
                                                                  data: {
                                                                      ...state.data,
                                                                      deleted:
                                                                          true,
                                                                  },
                                                              }
                                                            : undefined,
                                                    refetchQueries: [
                                                        MixingCardsQuery,
                                                    ],
                                                });
                                            }}
                                            loading={
                                                createLoading || updateLoading
                                            }
                                            size="large"
                                            endIcon={<MdDelete />}
                                        >
                                            Delete mixing card
                                        </CarefulButton>
                                    </Box>
                                )}
                            </Box>
                        ),
                    }}
                </ColumnBox>
            )}
        </AppNav>
    );
};

export default MixingCardForm;
