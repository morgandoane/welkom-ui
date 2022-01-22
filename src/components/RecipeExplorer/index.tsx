import {
    Popover,
    PopoverOrigin,
    SxProps,
    Theme,
    Box,
    Button,
    LinearProgress,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import { useTheme } from '@mui/system';
import React, { ReactElement } from 'react';
import { BsFillFileEarmarkTextFill } from 'react-icons/bs';
import { MdChevronLeft, MdFolder } from 'react-icons/md';
import { FolderRes, useFolder } from '../../graphql/queries/folder/useFolder';
import { useRecipe } from '../../graphql/queries/recipe/useRecipe';
import { Recipe } from '../../graphql/schema/Recipe/Recipe';
import { OperationResult } from '../../graphql/types';
import ColumnBox from '../Layout/ColumnBox';
import Message from '../Message';

export interface RecipeExplorerProps {
    origin?: string;
    value: string;
    onChange: (version_id: string) => void;
    sx?: SxProps<Theme>;
}

export interface RecipeExplorerWrapProps extends RecipeExplorerProps {
    element: Element | null;
    onClose: (value: string) => void;
    anchorOrigin?: PopoverOrigin;
}

const RecipeExplorer = (props: RecipeExplorerProps): ReactElement => {
    const { origin, value, sx, onChange } = props;

    const { palette } = useTheme();

    const [selected, setSelected] = React.useState(value);

    const [result, setResult] =
        React.useState<OperationResult<FolderRes> | null>(null);

    const [id, setId] = React.useState<string | null>(origin || null);

    const { loading: recipeLoading } = useRecipe({
        variables: {
            id: value || '',
            skip: 0,
            take: 1,
        },
        skip: !value,
        onCompleted: (d) => setId(d.recipe.folder ? d.recipe.folder._id : null),
    });

    const { loading } = useFolder({
        variables: {
            id,
        },
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
        fetchPolicy: 'network-only',
    });

    const folder = result && result.success ? result.data.folder : null;

    return (
        <Box
            sx={{
                height: 350,
                width: 350,
                position: 'relative',
                background: palette.background.default,
            }}
        >
            {(loading || recipeLoading) && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '8px',
                        zIndex: 100,
                    }}
                >
                    <LinearProgress />
                </Box>
            )}
            {result && result.success == false ? (
                <Message
                    type="Warning"
                    action={
                        <Box sx={{ p: 1 }}>
                            <Button onClick={() => setResult(null)}>
                                Try again
                            </Button>
                        </Box>
                    }
                />
            ) : folder ? (
                <ColumnBox>
                    {{
                        header: (
                            <Box
                                sx={{
                                    background: palette.background.paper,
                                    p: 2,
                                    borderBottom: `1px solid ${palette.divider}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                {folder.name !== 'Home' && (
                                    <IconButton
                                        onClick={() => {
                                            if (
                                                folder.parent !== null &&
                                                folder.parent.name !== 'Home'
                                            )
                                                setId(folder.parent._id);
                                            else setId(null);
                                        }}
                                        size="small"
                                    >
                                        <MdChevronLeft />
                                    </IconButton>
                                )}
                                <Typography>
                                    {folder.name == 'Home'
                                        ? 'Recipes'
                                        : folder.name}
                                </Typography>
                            </Box>
                        ),
                        content: (
                            <Box>
                                <List>
                                    {folder.folders.map((child, childIndex) => (
                                        <ListItem
                                            divider
                                            button
                                            key={child._id}
                                            onClick={() => {
                                                setId(child._id);
                                                setSelected('');
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    paddingRight: 2,
                                                }}
                                            >
                                                <MdFolder />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={child.name}
                                            />
                                        </ListItem>
                                    ))}
                                    {folder.recipes.map(
                                        (recipe, recipeIndex) => (
                                            <ListItem
                                                divider
                                                button
                                                key={recipe._id}
                                                selected={
                                                    recipe._id === selected
                                                }
                                                onClick={() => {
                                                    setSelected(recipe._id);
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        paddingRight: 2,
                                                        color: palette.primary
                                                            .main,
                                                    }}
                                                >
                                                    <BsFillFileEarmarkTextFill />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={recipe.name}
                                                    secondary={
                                                        recipe.item.english
                                                    }
                                                />
                                            </ListItem>
                                        )
                                    )}
                                </List>
                            </Box>
                        ),
                        footer: (
                            <Box
                                sx={{
                                    background: palette.background.paper,
                                    p: 2,
                                    borderTop: `1px solid ${palette.divider}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Box>
                                    <Button
                                        disabled={!selected}
                                        onClick={() => {
                                            onChange(selected);
                                        }}
                                    >
                                        Use recipe
                                    </Button>
                                </Box>
                            </Box>
                        ),
                    }}
                </ColumnBox>
            ) : (
                ''
            )}
        </Box>
    );
};

const RecipeExplorerWrap = (props: RecipeExplorerWrapProps): ReactElement => {
    const {
        element,
        onClose,
        anchorOrigin = {
            vertical: 'top',
            horizontal: 'left',
        },
        onChange,
        ...rest
    } = props;

    return (
        <Popover
            anchorEl={element}
            open={Boolean(element)}
            onClose={() => {
                onClose(rest.value);
            }}
            anchorOrigin={anchorOrigin}
        >
            <RecipeExplorer
                {...rest}
                onChange={(val) => {
                    onChange(val);
                    onClose(val);
                }}
            />
        </Popover>
    );
};

export { RecipeExplorerWrap, RecipeExplorer };
