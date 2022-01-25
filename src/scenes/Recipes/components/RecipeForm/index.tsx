import {
    Box,
    Button,
    Dialog,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd, MdCheck, MdClear, MdDragHandle } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import AppNav from '../../../../components/AppNav';
import ColumnBox from '../../../../components/Layout/ColumnBox';
import {
    RecipeQuery,
    useRecipe,
} from '../../../../graphql/queries/recipe/useRecipe';
import {
    RecipeVersionQuery,
    useRecipeVersion,
} from '../../../../graphql/queries/recipe/useRecipeVersion';
import {
    convertRecipeVersionState,
    RecipeVersionState,
} from '../../../../graphql/schema/RecipeVersion/RecipeVersionInput';
import { RecipeSection } from './components/RecipeSection';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd';
import { cloneDeep } from '@apollo/client/utilities';
import { relocate } from '../../../../utils/relocate';
import { uuid } from 'uuidv4';
import PageTitle from '../../../../components/PageTitle';
import AppFab from '../../../../components/AppFab';
import { IoMdCloudOutline } from 'react-icons/io';
import { LoadingButton } from '@mui/lab';
import PanelHeader from '../../../../components/PanelComponents/PanelHeader';
import TextFormField from '../../../../components/Forms/components/TextFormField';
import { DropButton } from './components/RecipeSection/components/RecipeStep';
import {
    CreateRecipeVersionRes,
    useRecipeVersionCreation,
} from '../../../../graphql/mutations/recipeVersion/useRecipeVersionCreation';
import { OperationResult } from '../../../../graphql/types';
import Message from '../../../../components/Message';
import { UnitClass } from '../../../../graphql/schema/Unit/Unit';
import { useTinyItems } from '../../../../graphql/queries/items/useTinyItems';
import { useTinyUnits } from '../../../../graphql/queries/units/useTinyUnits';

const RecipeForm = (): ReactElement => {
    const { id, version_id } = useParams();
    const nav = useNavigate();
    const { palette, shape, shadows } = useTheme();

    const [prompt, setPrompt] = React.useState(false);
    const [changed, setChanged] = React.useState(false);

    const { data: itemData } = useTinyItems({
        variables: {
            filter: {
                skip: 0,
                take: 250,
            },
        },
    });

    const { data: unitData } = useTinyUnits({
        variables: {
            filter: {
                skip: 0,
                take: 250,
            },
        },
    });

    const [state, setState] = React.useState<RecipeVersionState>({
        note: '',
        base_units_produced: 0,
        sections: [
            {
                id: uuid(),
                label: '',
                steps: [
                    {
                        id: uuid(),
                        content: {
                            unit: '',
                            items: [],
                            quantity: null,
                        },
                    },
                ],
            },
        ],
        recipe: id || '',
        parameters: [],
    });

    const items = itemData ? itemData.items.items : [];
    const units = unitData ? unitData.units.items : [];
    const steps = state.sections.map((sec) => sec.steps).flat();
    const calculated = steps.reduce((sum, step) => {
        if ('content' in step) {
            if (step.content.unit && step.content.quantity) {
                const unit = units.find((u) => u._id === step.content.unit);
                const theseItems = items.filter((i) =>
                    step.content.items.includes(i._id)
                );
                if (unit) {
                    const averageMultiplier =
                        theseItems.reduce((sum, item) => {
                            return item.to_base_unit + sum;
                        }, 0) / theseItems.length;
                    return (
                        sum +
                        step.content.quantity *
                            averageMultiplier *
                            unit.base_per_unit
                    );
                } else return sum;
            } else return sum;
        } else return sum + 1;
    }, 0);

    const [result, setResult] =
        React.useState<null | OperationResult<CreateRecipeVersionRes>>(null);

    const [create, { loading: createLoading }] = useRecipeVersionCreation({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
        refetchQueries: [RecipeQuery, RecipeVersionQuery],
        variables: {
            data: convertRecipeVersionState({
                ...state,
                base_units_produced: calculated,
            }),
        },
    });

    const { data, error, loading } = useRecipe({
        variables: {
            id: id || '',
            skip: 0,
            take: 1,
        },
        skip: !id,
    });

    const recipe = data ? data.recipe : null;

    const { error: versionError, loading: versionLoading } = useRecipeVersion({
        variables: {
            id: version_id || '',
        },
        skip: !version_id,
        onCompleted: ({ recipeVersion }) => {
            setState({
                note: '',
                base_units_produced: recipeVersion.base_units_produced,
                sections: recipeVersion.sections.map((section) => ({
                    id: section._id,
                    label: section.label,
                    steps: section.steps.map((step) => {
                        if (step.content) {
                            return {
                                id: step._id,
                                content: {
                                    items: step.content.items.map(
                                        (item) => item._id
                                    ),
                                    unit: step.content.unit._id,
                                    quantity: step.content.quantity,
                                },
                            };
                        } else {
                            return {
                                id: step._id,
                                instruction: step.instruction || '',
                            };
                        }
                    }),
                })),
                recipe: recipeVersion.recipe._id,
                parameters: recipeVersion.parameters,
            });
        },
    });

    const onDragEnd = ({ draggableId, source, destination }: DropResult) => {
        const [type, id] = draggableId.split('_');
        const [sourceType, sourcedId] = source.droppableId.split('_');

        if (destination) {
            const [destinationType, destinationId] =
                destination.droppableId.split('_');

            if (type == 'section' && source.droppableId == 'root') {
                const copy = cloneDeep(state);
                copy.sections = relocate(
                    copy.sections,
                    source.index,
                    destination.index
                );
                setChanged(true);
                setState(copy);
            } else if (
                destinationType == 'section' &&
                sourceType == 'section' &&
                type == 'step'
            ) {
                const step = state.sections
                    .map((s) => s.steps)
                    .flat()
                    .find((s) => s.id === id);

                const newSection = state.sections.find(
                    (s) => s.id === destinationId
                );

                const oldSection = state.sections.find(
                    (s) => s.id === sourcedId
                );

                if (step && newSection && oldSection) {
                    if (oldSection.id !== newSection.id) {
                        const copy = cloneDeep(state);

                        for (const section of copy.sections) {
                            if (section.id === newSection.id) {
                                section.steps.splice(
                                    destination.index,
                                    0,
                                    step
                                );
                            } else {
                                section.steps = section.steps.filter(
                                    (s) => s.id !== step.id
                                );
                            }
                        }
                        setChanged(true);
                        setState(copy);
                    } else {
                        const copy = cloneDeep(state);

                        for (const section of copy.sections) {
                            if (section.id === newSection.id) {
                                section.steps = relocate(
                                    section.steps,
                                    source.index,
                                    destination.index
                                );
                            }
                        }
                        setChanged(true);
                        setState(copy);
                    }
                }
            }
        }
    };

    const getHoldup = (): string | null => {
        const errors: string[] = [];

        if (state.sections.length == 0)
            return 'Recipe needs at least one section';

        if (state.parameters.some((p) => p === ''))
            return 'Please remove empty parameters';

        for (const section of state.sections) {
            if (section.steps.length == 0)
                errors.push('Each section needs a step.');

            if (
                section.steps.some(
                    (step) => 'content' in step && !step.content.unit
                )
            )
                errors.push('Each ingredient step needs a unit.');

            if (
                section.steps.some(
                    (step) => 'content' in step && !step.content.quantity
                )
            )
                errors.push('Each ingredient step needs a quantity.');

            if (
                section.steps.some(
                    (step) =>
                        'content' in step && step.content.items.length == 0
                )
            )
                errors.push('Each ingredient step needs an item.');

            if (
                section.steps.some(
                    (step) => !('content' in step) && !step.instruction
                )
            )
                errors.push('Please remove empty instructions.');
        }

        if (errors[0]) return errors[0];

        return null;
    };

    const holdup = getHoldup();

    return (
        <AppNav
            error={error || versionError}
            loading={loading || versionLoading || createLoading}
            discrete={false}
            padding={0}
        >
            {result && result.success ? (
                <Message
                    type="Success"
                    message="Recipe updated!"
                    onComplete={() => nav(`/recipes/${id}`)}
                />
            ) : result ? (
                <Message
                    action={
                        <Button
                            sx={{ marginTop: 2 }}
                            onClick={() => setResult(null)}
                        >
                            Try again
                        </Button>
                    }
                    type="Warning"
                    message={result.error.message}
                />
            ) : (
                <ColumnBox>
                    {{
                        header: (
                            <Box sx={{ padding: 2, paddingBottom: 0 }}>
                                {recipe && (
                                    <PageTitle>
                                        {[
                                            'Edit ' + recipe.name,
                                            `Recipe for ${recipe.item.english}`,
                                        ]}
                                    </PageTitle>
                                )}
                            </Box>
                        ),
                        content: (
                            <Box
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexFlow: 'row',
                                    justifyContent: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        flex: 1,
                                        maxWidth: 600,
                                    }}
                                >
                                    <Box p={1} />
                                    <DragDropContext onDragEnd={onDragEnd}>
                                        <Droppable
                                            droppableId="root"
                                            type="section"
                                        >
                                            {(provided, snapshot) => (
                                                <Box
                                                    ref={provided.innerRef}
                                                    sx={{
                                                        ...(snapshot.isDraggingOver
                                                            ? {}
                                                            : {}),
                                                    }}
                                                    {...provided.droppableProps}
                                                >
                                                    {state.sections.map(
                                                        (section, index) => (
                                                            <RecipeSection
                                                                drop={
                                                                    state
                                                                        .sections
                                                                        .length <
                                                                    2
                                                                        ? null
                                                                        : () => {
                                                                              setChanged(
                                                                                  true
                                                                              );
                                                                              const copy =
                                                                                  cloneDeep(
                                                                                      state
                                                                                  );
                                                                              copy.sections.splice(
                                                                                  index,
                                                                                  1
                                                                              );
                                                                              setState(
                                                                                  copy
                                                                              );
                                                                          }
                                                                }
                                                                index={index}
                                                                key={
                                                                    'sectionWrap' +
                                                                    section.id
                                                                }
                                                                section={
                                                                    section
                                                                }
                                                                setSection={(
                                                                    d
                                                                ) => {
                                                                    setChanged(
                                                                        true
                                                                    );
                                                                    const copy =
                                                                        cloneDeep(
                                                                            state
                                                                        );

                                                                    copy.sections[
                                                                        index
                                                                    ] = d;
                                                                    setState(
                                                                        copy
                                                                    );
                                                                }}
                                                            />
                                                        )
                                                    )}
                                                    {provided.placeholder}
                                                </Box>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                    <Box>
                                        <Button
                                            sx={{
                                                marginTop: -1,
                                                marginBottom: 2,
                                            }}
                                            onClick={() => {
                                                setState({
                                                    ...state,
                                                    sections: [
                                                        ...state.sections,
                                                        {
                                                            id: uuid(),
                                                            label: '',
                                                            steps: [],
                                                        },
                                                    ],
                                                });
                                            }}
                                            variant="text"
                                            startIcon={<MdAdd />}
                                        >
                                            Add section
                                        </Button>
                                    </Box>
                                    <Box
                                        sx={{
                                            ...shape,
                                            marginBottom: 3,
                                            border: `1px solid ${palette.divider}`,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                background:
                                                    palette.background.paper,
                                                p: 1.5,
                                                paddingLeft: 2,
                                                borderBottom: `1px solid ${palette.divider}`,
                                            }}
                                        >
                                            <Typography>Parameters</Typography>
                                        </Box>
                                        <Box>
                                            <DragDropContext
                                                onDragEnd={({
                                                    draggableId,
                                                    source,
                                                    destination,
                                                }) => {
                                                    if (destination) {
                                                        const from =
                                                            source.index;
                                                        const to =
                                                            destination.index;

                                                        const copy =
                                                            cloneDeep(state);

                                                        copy.parameters =
                                                            relocate(
                                                                copy.parameters,
                                                                from,
                                                                to
                                                            );

                                                        setState(copy);
                                                    }
                                                }}
                                            >
                                                <Droppable droppableId="params">
                                                    {(provided, snapshot) => (
                                                        <Box
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.droppableProps}
                                                        >
                                                            {state.parameters.map(
                                                                (
                                                                    param,
                                                                    paramIndex
                                                                ) => (
                                                                    <Draggable
                                                                        draggableId={
                                                                            'param_' +
                                                                            paramIndex
                                                                        }
                                                                        index={
                                                                            paramIndex
                                                                        }
                                                                        key={
                                                                            'param_' +
                                                                            paramIndex
                                                                        }
                                                                    >
                                                                        {(
                                                                            draggableProvided,
                                                                            draggableSnaphot
                                                                        ) => (
                                                                            <Box
                                                                                ref={
                                                                                    draggableProvided.innerRef
                                                                                }
                                                                                {...draggableProvided.draggableProps}
                                                                                sx={{
                                                                                    p: 1.25,
                                                                                    borderBottom: `1px solid ${palette.divider}`,
                                                                                    display:
                                                                                        'flex',
                                                                                    alignItems:
                                                                                        'center',
                                                                                }}
                                                                            >
                                                                                <Box
                                                                                    {...draggableProvided.dragHandleProps}
                                                                                    sx={{
                                                                                        display:
                                                                                            'flex',
                                                                                        paddingRight: 1.5,
                                                                                        fontSize:
                                                                                            '1.25rem',
                                                                                        color: palette
                                                                                            .text
                                                                                            .disabled,
                                                                                    }}
                                                                                >
                                                                                    <MdDragHandle />
                                                                                </Box>
                                                                                <Box
                                                                                    sx={{
                                                                                        flex: 1,
                                                                                    }}
                                                                                >
                                                                                    <TextFormField
                                                                                        naked
                                                                                        size="small"
                                                                                        label="Parameter"
                                                                                        value={
                                                                                            param
                                                                                        }
                                                                                        onChange={(
                                                                                            val
                                                                                        ) => {
                                                                                            const copy =
                                                                                                cloneDeep(
                                                                                                    state
                                                                                                );
                                                                                            copy.parameters[
                                                                                                paramIndex
                                                                                            ] =
                                                                                                val ||
                                                                                                '';
                                                                                            setState(
                                                                                                copy
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                </Box>
                                                                                <Box>
                                                                                    <DropButton
                                                                                        onClick={() => {
                                                                                            const copy =
                                                                                                cloneDeep(
                                                                                                    state
                                                                                                );
                                                                                            copy.parameters.splice(
                                                                                                paramIndex,
                                                                                                1
                                                                                            );
                                                                                            setState(
                                                                                                copy
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                </Box>
                                                                            </Box>
                                                                        )}
                                                                    </Draggable>
                                                                )
                                                            )}

                                                            {
                                                                provided.placeholder
                                                            }
                                                        </Box>
                                                    )}
                                                </Droppable>
                                            </DragDropContext>
                                            <Box p={1}>
                                                <Button
                                                    onClick={() => {
                                                        setState({
                                                            ...state,
                                                            parameters: [
                                                                ...state.parameters,
                                                                '',
                                                            ],
                                                        });
                                                    }}
                                                    variant="text"
                                                    startIcon={<MdAdd />}
                                                >
                                                    Add parameter
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: 2,
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-end',
                                        }}
                                    >
                                        <Box>
                                            {recipe && (
                                                <TextField
                                                    disabled
                                                    value={calculated}
                                                    onChange={(e) =>
                                                        setState({
                                                            ...state,
                                                            base_units_produced:
                                                                isNaN(
                                                                    parseFloat(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                )
                                                                    ? null
                                                                    : parseFloat(
                                                                          e
                                                                              .target
                                                                              .value
                                                                      ),
                                                        })
                                                    }
                                                    type="number"
                                                    placeholder="Units produced"
                                                    variant="standard"
                                                    helperText={
                                                        <Box
                                                            sx={{
                                                                maxWidth: 200,
                                                            }}
                                                        >{`How many ${
                                                            recipe.item
                                                                .unit_class ==
                                                            UnitClass.Weight
                                                                ? 'pounds'
                                                                : recipe.item
                                                                      .unit_class ==
                                                                  UnitClass.Count
                                                                ? 'count'
                                                                : recipe.item
                                                                      .unit_class ==
                                                                  UnitClass.Time
                                                                ? 'minutes'
                                                                : recipe.item
                                                                      .unit_class ==
                                                                  UnitClass.Volume
                                                                ? 'gallons'
                                                                : 'gallons'
                                                        } of ${
                                                            recipe.item.english
                                                        } does this recipe produce?`}</Box>
                                                    }
                                                />
                                            )}
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <LoadingButton
                                                size="large"
                                                color="inherit"
                                                variant="contained"
                                                endIcon={<MdClear />}
                                                onClick={() => {
                                                    if (changed)
                                                        setPrompt(true);
                                                    else nav(`/recipes/${id}`);
                                                }}
                                            >
                                                Cancel
                                            </LoadingButton>
                                            <Tooltip title={holdup || ''} arrow>
                                                <Box>
                                                    <LoadingButton
                                                        disabled={
                                                            !changed ||
                                                            Boolean(holdup)
                                                        }
                                                        size="large"
                                                        variant="contained"
                                                        endIcon={<MdCheck />}
                                                        onClick={() => {
                                                            create();
                                                        }}
                                                    >
                                                        Publish
                                                    </LoadingButton>
                                                </Box>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                    <Box p={6} />
                                </Box>
                            </Box>
                        ),
                    }}
                </ColumnBox>
            )}
            <Dialog
                PaperProps={{ sx: { p: 2 } }}
                open={prompt}
                onClose={() => setPrompt(false)}
            >
                <PanelHeader onClose={() => setPrompt(false)}>
                    Unsaved changes
                </PanelHeader>
                <Typography>Are you sure you want to leave?</Typography>
                <Box sx={{ display: 'flex', gap: 2, paddingTop: 2 }}>
                    <Button
                        color="inherit"
                        fullWidth
                        onClick={() => setPrompt(false)}
                    >
                        No
                    </Button>
                    <Button fullWidth onClick={() => nav(`/recipes/${id}`)}>
                        Yes
                    </Button>
                </Box>
            </Dialog>
        </AppNav>
    );
};

export default RecipeForm;
