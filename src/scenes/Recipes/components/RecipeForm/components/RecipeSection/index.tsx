import { Box, Button, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdAdd, MdDragHandle } from 'react-icons/md';
import TextFormField from '../../../../../../components/Forms/components/TextFormField';
import { RecipeSectionState } from '../../../../../../graphql/schema/RecipeStep/RecipeStepInput';
import { DropButton, RecipeStepWrap } from './components/RecipeStep';

import { Droppable, Draggable } from 'react-beautiful-dnd';
import { cloneDeep } from '@apollo/client/utilities';
import { uuid } from 'uuidv4';

export interface RecipeSectionProps {
    section: RecipeSectionState;
    setSection: (data: RecipeSectionState) => void;
    index: number;
    drop: null | (() => void);
}

export const RecipeSection = (props: RecipeSectionProps): ReactElement => {
    const { section, setSection, index, drop } = props;
    const { palette, shape, shadows, typography } = useTheme();
    return (
        <Draggable draggableId={'section_' + section.id} index={index}>
            {(draggableProvided, draggableSnapshot) => (
                <Box
                    sx={{
                        border: `1px solid ${palette.divider}`,
                        ...shape,
                        marginBottom: 3,
                        ...(draggableSnapshot.isDragging
                            ? {
                                  background: palette.background.default,
                                  boxShadow: shadows[12],
                              }
                            : { boxShadow: shadows[2] }),
                    }}
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                >
                    <Droppable droppableId={'section_' + section.id}>
                        {(provided, snapshot) => (
                            <Box
                                ref={provided.innerRef}
                                sx={snapshot.isDraggingOver ? {} : {}}
                                {...provided.droppableProps}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        background: palette.background.paper,
                                        borderBottom: `1px solid ${palette.divider}`,
                                        p: 1,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        {...draggableProvided.dragHandleProps}
                                        sx={{ paddingRight: 2 }}
                                    >
                                        <Box
                                            sx={{
                                                fontSize: '1.25rem',
                                                display: 'flex',
                                                color: palette.text.disabled,
                                            }}
                                        >
                                            <MdDragHandle />
                                        </Box>
                                    </Box>
                                    <Box>
                                        <TextFormField
                                            sx={{ ...typography.body1 }}
                                            label="Section"
                                            naked
                                            value={section.label || ''}
                                            onChange={(val) =>
                                                setSection({
                                                    ...section,
                                                    label: val || '',
                                                })
                                            }
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }} />
                                    {drop && (
                                        <Box>
                                            <DropButton onClick={drop} />
                                        </Box>
                                    )}
                                </Box>
                                <Box>
                                    {section.steps.map((step, index) => (
                                        <RecipeStepWrap
                                            index={index}
                                            key={'stepWrap' + step.id}
                                            step={step}
                                            setStep={(d) => {
                                                const copy = cloneDeep(section);
                                                copy.steps[index] = d;
                                                setSection(copy);
                                            }}
                                            drop={() => {
                                                const copy = cloneDeep(section);
                                                copy.steps.splice(index, 1);
                                                setSection(copy);
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    fontSize: '2rem',
                                                    display: 'flex',
                                                }}
                                            >
                                                <MdDragHandle />
                                            </Box>
                                        </RecipeStepWrap>
                                    ))}
                                    {provided.placeholder}
                                    <Box sx={{ display: 'flex', gap: 2, p: 1 }}>
                                        <Button
                                            onClick={() => {
                                                setSection({
                                                    ...section,
                                                    steps: [
                                                        ...section.steps,
                                                        {
                                                            id: uuid(),
                                                            content: {
                                                                items: [],
                                                                unit: '',
                                                                quantity: null,
                                                            },
                                                        },
                                                    ],
                                                });
                                            }}
                                            variant="text"
                                            startIcon={<MdAdd />}
                                            size="small"
                                        >
                                            Ingredient
                                        </Button>
                                        <Button
                                            variant="text"
                                            startIcon={<MdAdd />}
                                            size="small"
                                            onClick={() =>
                                                setSection({
                                                    ...section,
                                                    steps: [
                                                        ...section.steps,
                                                        {
                                                            id: uuid(),
                                                            instruction: '',
                                                        },
                                                    ],
                                                })
                                            }
                                        >
                                            Instruction
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </Droppable>
                </Box>
            )}
        </Draggable>
    );
};
