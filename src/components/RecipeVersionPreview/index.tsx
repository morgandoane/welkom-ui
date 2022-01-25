import { Box, Typography, useTheme } from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';
import { Recipe } from '../../graphql/schema/Recipe/Recipe';
import {
    RecipeSection,
    RecipeStep,
} from '../../graphql/schema/RecipeStep/RecipeStep';
import { RecipeVersion } from '../../graphql/schema/RecipeVersion/RecipeVersion';

export interface AugmentedRecipeStep extends RecipeStep {
    element?: ReactNode;
}

export interface AugmentedRecipeSection extends RecipeSection {
    steps: AugmentedRecipeStep[];
}

export interface AugmentedRecipeVersion extends RecipeVersion {
    sections: AugmentedRecipeSection[];
}

export interface RecipeVersionPreviewProps {
    version: AugmentedRecipeVersion;
}

const RecipeVersionPreview = (
    props: RecipeVersionPreviewProps
): ReactElement | null => {
    const { version } = props;

    const { palette, shape } = useTheme();

    if (!version) return null;

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'column',
                    gap: 3,
                    textAlign: 'left',
                }}
            >
                {version.sections.map((section, sectionIndex) => (
                    <Box
                        key={section._id}
                        sx={{
                            ...shape,
                            border: `1px solid ${palette.divider}`,
                        }}
                    >
                        <Box
                            sx={{
                                background: palette.background.paper,
                                p: 2,
                            }}
                        >
                            <Typography>
                                {section.label || `Section ${sectionIndex + 1}`}
                            </Typography>
                        </Box>
                        <Box>
                            {section.steps.map((step, stepIndex) => (
                                <Box
                                    key={step._id}
                                    sx={{
                                        display: 'Flex',
                                        p: 2,
                                        gap: 4,
                                        borderBottom:
                                            stepIndex !==
                                            section.steps.length - 1
                                                ? `1px solid ${palette.divider}`
                                                : '',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flex: !step.element ? 1 : undefined,
                                            minWidth: step.element ? 200 : 0,
                                        }}
                                    >
                                        <Typography variant="body2">
                                            {step.content
                                                ? step.content.items
                                                      .map((i) => i.english)
                                                      .join(', ')
                                                : step.instruction}
                                        </Typography>
                                    </Box>
                                    {step.content && (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                minWidth: step.element
                                                    ? 200
                                                    : 0,
                                            }}
                                        >
                                            {step.content
                                                ? `${step.content.quantity} ${
                                                      step.content.unit[
                                                          step.content
                                                              .quantity == 1
                                                              ? 'english'
                                                              : 'english_plural'
                                                      ]
                                                  }`
                                                : step.instruction}
                                        </Typography>
                                    )}
                                    {step.element}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))}

                <Box sx={{ display: 'flex', flexFlow: 'column', gap: 0.5 }}>
                    {version.parameters.map((param, paramIndex) => (
                        <Typography key={'param_' + paramIndex}>
                            {param}
                        </Typography>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default RecipeVersionPreview;
