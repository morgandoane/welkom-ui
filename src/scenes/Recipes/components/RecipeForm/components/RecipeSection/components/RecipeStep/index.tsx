import {
    Autocomplete,
    Box,
    TextField,
    useTheme,
    useThemeProps,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdDragHandle } from 'react-icons/md';
import { RecipeStepState } from '../../../../../../../../graphql/schema/RecipeStep/RecipeStepInput';
import { Draggable } from 'react-beautiful-dnd';
import { useTinyItems } from '../../../../../../../../graphql/queries/items/useTinyItems';
import TextFormField from '../../../../../../../../components/Forms/components/TextFormField';
import UnitField from '../../../../../../../../components/Forms/components/UnitField';
import NumberField from '../../../../../../../../components/Forms/components/NumberField';
import CarefulButton from '../../../../../../../../components/Forms/CarefulButton';
import { IoMdRemove } from 'react-icons/io';

export interface RecipeStepProps {
    step: RecipeStepState;
    setStep: (step: RecipeStepState) => void;
    children: ReactElement;
    index: number;
    drop: () => void;
}

export const DropButton = (props: { onClick: () => void }) => {
    const { palette } = useTheme();
    return (
        <CarefulButton
            from={{
                startIcon: <IoMdRemove />,
                color: 'primary',
                variant: 'text',
                sx: {
                    height: 32,
                    width: 32,
                    minWidth: 0,
                    color: palette.text.secondary,
                    paddingLeft: 3,
                    borderRadius: 16,
                },
            }}
            to={{
                startIcon: <IoMdRemove />,
                color: 'error',
                variant: 'contained',
                sx: {
                    height: 32,
                    width: 32,
                    minWidth: 0,
                    color: palette.error.contrastText,
                    paddingLeft: 3,
                    borderRadius: 16,
                },
            }}
            onClick={props.onClick}
        >
            {' '}
        </CarefulButton>
    );
};

const RecipeStep = (props: RecipeStepProps): ReactElement => {
    const { step, setStep, children: handle, drop } = props;

    const { typography } = useTheme();

    const { data } = useTinyItems({
        variables: {
            filter: {
                skip: 0,
                take: 250,
            },
        },
    });

    const items = data ? data.items.items : [];

    return (
        <Box>
            <Box sx={{ display: 'flex', p: 1, alignItems: 'center' }}>
                <Box>{handle}</Box>
                {'content' in step ? (
                    <Box
                        sx={{ display: 'flex', flexFlow: 'row', width: '100%' }}
                    >
                        <Box sx={{ minWidth: 250 }}>
                            <Autocomplete
                                multiple
                                options={items}
                                getOptionLabel={(option) =>
                                    option?.english || ''
                                }
                                renderTags={(d) =>
                                    d.map((i) => i.english).join(', ')
                                }
                                value={items.filter((i) =>
                                    step.content.items.includes(i._id)
                                )}
                                onChange={(event, val) =>
                                    setStep({
                                        ...step,
                                        content: {
                                            ...step.content,
                                            items: val.map((v) => v._id),
                                        },
                                    })
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size="small"
                                        variant="standard"
                                        placeholder={
                                            step.content.items.length == 0
                                                ? 'Select an item'
                                                : ''
                                        }
                                        InputProps={{
                                            ...params.InputProps,
                                            disableUnderline: true,
                                            sx: { ...typography.body2 },
                                        }}
                                    />
                                )}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }} />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box sx={{ maxWidth: 80 }}>
                                <NumberField
                                    naked
                                    label="Qty"
                                    value={step.content.quantity}
                                    onChange={(val) =>
                                        setStep({
                                            ...step,
                                            content: {
                                                ...step.content,
                                                quantity: val,
                                            },
                                        })
                                    }
                                />
                            </Box>
                            <Box sx={{ minWidth: 140 }}>
                                <UnitField
                                    plural={step.content.quantity !== 1}
                                    naked
                                    size="small"
                                    label="Unit"
                                    value={step.content.unit}
                                    onChange={(val) =>
                                        setStep({
                                            ...step,
                                            content: {
                                                ...step.content,
                                                unit: val || '',
                                            },
                                        })
                                    }
                                />
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <Box>
                        <TextFormField
                            sx={{ ...typography.body2 }}
                            size="small"
                            label="Instruction"
                            naked
                            value={step.instruction}
                            onChange={(val) =>
                                setStep({ ...step, instruction: val || '' })
                            }
                        />
                    </Box>
                )}
                <Box sx={{ flex: 1 }} />
                <Box>
                    <DropButton onClick={drop} />
                </Box>
            </Box>
        </Box>
    );
};

export const RecipeStepWrap = (props: RecipeStepProps): ReactElement => {
    const { step, index } = props;
    const { transitions, shape, palette, shadows } = useTheme();

    return (
        <Draggable key={step.id} draggableId={'step_' + step.id} index={index}>
            {(provided, snapshot) => (
                <Box
                    sx={{
                        background: palette.background.default,
                        boxShadow: 'none',
                        borderBottom: `1px solid ${palette.divider}`,
                        ...(snapshot.isDragging
                            ? {
                                  boxShadow: shadows[6],
                                  background: palette.background.default,
                              }
                            : {}),
                    }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <RecipeStep {...props}>
                        <Box
                            {...provided.dragHandleProps}
                            sx={{
                                fontSize: '1.25rem',
                                display: 'flex',
                                paddingRight: 2,
                                color: palette.text.disabled,
                            }}
                        >
                            <MdDragHandle />
                        </Box>
                    </RecipeStep>
                </Box>
            )}
        </Draggable>
    );
};

export default RecipeStep;
