import { cloneDeep } from '@apollo/client/utilities';
import {
    Box,
    ButtonBase,
    IconButton,
    MenuItem,
    Switch,
    TextField,
    Typography,
    useTheme,
    FormControlLabel,
} from '@mui/material';
import format from 'date-fns/format';
import React, { ReactElement } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MdDragHandle, MdClear } from 'react-icons/md';
import { RecipeExplorerWrap } from '../../../../../../../../components/RecipeExplorer';
import { useRecipeVersion } from '../../../../../../../../graphql/queries/recipe/useRecipeVersion';
import { useTinyRecipe } from '../../../../../../../../graphql/queries/recipe/useTinyRecipe';
import { MixingCardLineInput } from '../../../../../../../../graphql/schema/MixingCardLine/MixingCardLineInputs';
import { dateFormats } from '../../../../../../../../utils/dateFormats';
import VersionSelector from './components/VersionSelector';

export interface MixingCardLineFormProps {
    value: MixingCardLineInput;
    index: number;
    onChange: (data: MixingCardLineInput) => void;
    onDrop: () => void;
}

const MixingCardLineForm = (props: MixingCardLineFormProps): ReactElement => {
    const { value, index, onChange, onDrop } = props;

    const { palette, shape } = useTheme();

    const [selectVersion, setSelectVersion] = React.useState(false);

    const [focused, setFocused] = React.useState<null | {
        element: Element;
        line: MixingCardLineInput;
        index: number;
    }>(null);

    const { data, error, loading } = useTinyRecipe({
        variables: {
            id: value.recipe,
        },
        skip: !value.recipe,
    });

    const { data: versionData, loading: versionLoading } = useRecipeVersion({
        variables: {
            id: value.recipe_version || '',
        },
        skip: !value.recipe_version,
    });

    const version = versionData ? versionData.recipeVersion : null;

    const recipe = data ? data.tinyRecipe : null;

    return (
        <Box>
            <Draggable
                index={index}
                draggableId={'line_' + index}
                key={'lineForm_' + index}
            >
                {(drag, dragSnap) => (
                    <Box ref={drag.innerRef} {...drag.draggableProps}>
                        <Box
                            sx={{
                                display: 'flex',
                                p: 2,
                                gap: 2,
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                {...drag.dragHandleProps}
                                sx={{
                                    display: 'flex',
                                    fontSize: '1.25rem',
                                    alignItems: 'center',
                                }}
                            >
                                <MdDragHandle />
                            </Box>
                            <Box sx={{ paddingRight: 4 }}>
                                <ButtonBase
                                    onClick={(event) => {
                                        setFocused({
                                            index: index,
                                            element: event.currentTarget,
                                            line: value,
                                        });
                                    }}
                                    sx={{
                                        ...shape,
                                        p: 0.5,
                                        color:
                                            value.recipe == ''
                                                ? palette.text.disabled
                                                : undefined,
                                        display: 'flex',
                                        flexFlow: 'column',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <Typography>
                                        {value.recipe
                                            ? recipe
                                                ? recipe.name
                                                : loading
                                                ? 'loading...'
                                                : error
                                                ? '(error)'
                                                : ''
                                            : 'Select a recipe'}
                                    </Typography>
                                    {recipe && (
                                        <Typography
                                            color="textSecondary"
                                            variant="caption"
                                        >
                                            {recipe.item.english}
                                        </Typography>
                                    )}
                                </ButtonBase>
                            </Box>
                            {typeof value.recipe_version == 'string' ? (
                                <Box
                                    sx={{
                                        flex: 1,
                                    }}
                                >
                                    <ButtonBase
                                        disabled={!value.recipe}
                                        onClick={(event) => {
                                            setSelectVersion(true);
                                        }}
                                        sx={{
                                            ...shape,
                                            p: 0.5,
                                            color:
                                                value.recipe == ''
                                                    ? palette.text.disabled
                                                    : undefined,
                                            display: 'flex',
                                            flexFlow: 'column',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: !value.recipe_version
                                                    ? palette.text.disabled
                                                    : palette.text.primary,
                                            }}
                                        >
                                            {value.recipe_version
                                                ? version
                                                    ? format(
                                                          new Date(
                                                              version.date_created
                                                          ),
                                                          dateFormats.condensedDate
                                                      )
                                                    : versionLoading
                                                    ? 'loading'
                                                    : '(error)'
                                                : 'Select a recipe version'}
                                        </Typography>
                                        {value.recipe_version && (
                                            <Typography
                                                color="textSecondary"
                                                variant="caption"
                                            >
                                                Version
                                            </Typography>
                                        )}
                                    </ButtonBase>
                                </Box>
                            ) : (
                                <Box sx={{ flex: 1 }} />
                            )}
                            <Box
                                sx={{
                                    flex: 1,
                                }}
                            >
                                <TextField
                                    value={
                                        value.limit == undefined
                                            ? 'Until stopped'
                                            : value.limit + ''
                                    }
                                    fullWidth
                                    select
                                    placeholder="Batch Count"
                                    variant="standard"
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    onChange={(e) => {
                                        if (
                                            e.target.value == 'Until stopped' ||
                                            isNaN(parseInt(e.target.value))
                                        ) {
                                            const copy = cloneDeep(value);
                                            copy.limit = undefined;
                                            onChange(copy);
                                        } else {
                                            const copy = cloneDeep(value);
                                            copy.limit = parseInt(
                                                e.target.value
                                            );
                                            onChange(copy);
                                        }
                                    }}
                                >
                                    <MenuItem value={'Until stopped'}>
                                        Until stopped
                                    </MenuItem>
                                    {Array.from(Array(20).keys()).map(
                                        (k, i) => (
                                            <MenuItem
                                                value={i + 1 + ''}
                                                key={'batchCount_' + i}
                                            >
                                                {`${i + 1} batches`}
                                            </MenuItem>
                                        )
                                    )}
                                </TextField>
                            </Box>
                            <Box sx={{ paddingLeft: 2 }}>
                                <FormControlLabel
                                    control={<Switch />}
                                    label="Latest version"
                                    checked={
                                        typeof value.recipe_version !== 'string'
                                    }
                                    onChange={(e, checked) => {
                                        onChange({
                                            ...value,
                                            recipe_version: checked
                                                ? undefined
                                                : '',
                                        });
                                    }}
                                />
                            </Box>
                            <Box>
                                <IconButton size="small" onClick={onDrop}>
                                    <MdClear />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Draggable>

            <RecipeExplorerWrap
                element={focused ? focused.element : null}
                value={focused ? focused.line.recipe : ''}
                onChange={(recipe) => {
                    if (focused) {
                        setFocused({
                            ...focused,
                            line: {
                                ...focused.line,
                                recipe,
                                recipe_version: undefined,
                            },
                        });
                    }
                }}
                onClose={(val) => {
                    if (focused) {
                        onChange({
                            ...focused.line,
                            recipe: val,
                            recipe_version: undefined,
                        });
                        setFocused(null);
                    }
                }}
            />
            <VersionSelector
                recipe_id={value.recipe}
                value={value.recipe_version || ''}
                open={selectVersion}
                onClose={() => setSelectVersion(false)}
                onChange={(version) => {
                    onChange({
                        ...value,
                        recipe_version: version._id,
                    });
                    setSelectVersion(false);
                }}
            />
        </Box>
    );
};

export default MixingCardLineForm;
