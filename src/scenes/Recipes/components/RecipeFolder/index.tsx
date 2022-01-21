import { LoadingButton } from '@mui/lab';
import {
    Box,
    Button,
    capitalize,
    Dialog,
    Divider,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
    useTheme,
} from '@mui/material';
import React, { ReactElement, useContext } from 'react';
import {
    MdAdd,
    MdCreateNewFolder,
    MdDelete,
    MdDocumentScanner,
    MdEdit,
    MdFolder,
    MdTableRows,
} from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import AppNav from '../../../../components/AppNav';
import RecipeFolderForm from '../../../../components/Forms/FolderForm';
import ColumnBox from '../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../components/PageTitle';
import PanelHeader from '../../../../components/PanelComponents/PanelHeader';
import ResponsiveDialog from '../../../../components/ResponsiveDialog';
import {
    Folder,
    FolderChild,
    FolderClass,
} from '../../../../graphql/schema/Folder/Folder';
import Folders, { FolderView } from '../../../../components/Folders';
import {
    CreateFolderArgs,
    useFolderCreation,
} from '../../../../graphql/mutations/folder/useFolderCreation';
import {
    UpdateFolderArgs,
    useFolderUpdation,
} from '../../../../graphql/mutations/folder/useFolderUpdate';
import {
    FolderQuery,
    useFolder,
} from '../../../../graphql/queries/folder/useFolder';
import {
    CreateRecipeArgs,
    useRecipeCreation,
} from '../../../../graphql/mutations/recipes/useRecipeCreation';
import {
    UpdateRecipeArgs,
    useRecipeUpdate,
} from '../../../../graphql/mutations/recipes/useRecipeUpdate';
import TextFormField from '../../../../components/Forms/components/TextFormField';
import FormRow from '../../../../components/Forms/components/FormRow';
import ItemField from '../../../../components/Forms/components/ItemField';
import { Recipe } from '../../../../graphql/schema/Recipe/Recipe';
import ButtonToggle from '../../../../components/ButtonToggle';
import { BsGridFill } from 'react-icons/bs';

const ContextMenu = (props: { add: (type: 'folder' | 'recipe') => void }) => {
    const theme = useTheme();
    return (
        <Box>
            <MenuItem
                sx={{ ...theme.typography.h6 }}
                onClick={() => props.add('folder')}
            >
                <ListItemIcon>
                    <MdCreateNewFolder />
                </ListItemIcon>
                New Folder
            </MenuItem>
            <MenuItem
                sx={{ ...theme.typography.h6 }}
                onClick={() => props.add('recipe')}
            >
                <ListItemIcon>
                    <MdDocumentScanner />
                </ListItemIcon>
                New Recipe
            </MenuItem>
        </Box>
    );
};

const RecipeFolderView = (): ReactElement => {
    const { id } = useParams();
    const nav = useNavigate();

    const [dragged, setDragged] = React.useState<
        null | Folder | Folder['parent'] | Recipe
    >(null);

    const [clearDragging, setClearDragging] = React.useState(false);

    const viewFromStorage = localStorage.getItem('recipe_folder_view');

    const [view, setView] = React.useState<FolderView>(
        viewFromStorage == 'Table' ? 'Table' : 'Grid'
    );

    React.useEffect(() => {
        if (clearDragging) {
            const timeout = setTimeout(() => {
                setClearDragging(false);
                setDragged(null);
            }, 150);

            return () => clearTimeout(timeout);
        }
    }, [clearDragging]);

    const [state, setState] = React.useState<
        | null
        | ({ _type: 'createFolder' } & CreateFolderArgs)
        | ({ _type: 'updateFolder' } & UpdateFolderArgs)
        | ({ _type: 'createRecipe' } & CreateRecipeArgs)
        | ({ _type: 'updateRecipe' } & UpdateRecipeArgs)
    >(null);

    const [deleteRecipe, setDeleteRecipe] = React.useState<{
        recipe: Recipe;
        confirmation: string;
    } | null>(null);

    const [folder, setFolder] = React.useState<null | Folder>(null);

    const { data, error, loading } = useFolder({
        variables: {
            id: id || null,
        },
        onCompleted: (data) => setFolder(data.folder),
        fetchPolicy: 'network-only',
    });

    const [rightContext, setRightContext] = React.useState<{
        target: EventTarget & HTMLButtonElement;
        data:
            | { _type: 'folder'; folder: Folder | FolderChild }
            | { _type: 'recipe'; recipe: Recipe };
    } | null>(null);

    const [context, setContext] = React.useState<
        | null
        | {
              x: number;
              y: number;
          }
        | { target: Element }
    >(null);

    const getFormValue = () => {
        if (state) {
            const { _type, ...rest } = state;
            return rest;
        } else return null;
    };

    const [updateFolder, { loading: updateLoading }] = useFolderUpdation({
        variables:
            state && state._type == 'updateFolder'
                ? {
                      id: state.id,
                      data: {
                          name: state.data.name,
                      },
                  }
                : undefined,
        refetchQueries: [FolderQuery],
        onCompleted: () => {
            setState(null);
            setRightContext(null);
            setClearDragging(true);
        },
    });

    const [createFolder, { loading: createLoading }] = useFolderCreation({
        variables:
            state && state._type == 'createFolder'
                ? {
                      data: {
                          class: FolderClass.Recipe,
                          name: state.data.name,
                          parent: id || null,
                      },
                  }
                : undefined,
        refetchQueries: [FolderQuery],
        onCompleted: () => {
            setState(null);
            setRightContext(null);
            setClearDragging(true);
        },
    });

    const [createRecipe, { loading: createRecipeLoading }] = useRecipeCreation({
        variables:
            state && state._type == 'createRecipe'
                ? {
                      data: {
                          name: state.data.name,
                          folder: id || undefined,
                          item: state.data.item,
                      },
                  }
                : undefined,
        refetchQueries: [FolderQuery],
        onCompleted: () => {
            setState(null);
            setRightContext(null);
        },
    });

    const [updateRecipe, { loading: updateRecipeLoading }] = useRecipeUpdate({
        variables:
            state && state._type == 'updateRecipe'
                ? {
                      id: state.id,
                      data: {
                          name: state.data.name,
                          folder: state.data.folder,
                          item: state.data.item,
                      },
                  }
                : undefined,
        refetchQueries: [FolderQuery],
        onCompleted: () => {
            setState(null);
            setRightContext(null);
        },
    });

    const submit = () => {
        if (state) {
            if (state._type == 'createFolder') {
                createFolder();
            } else if (state._type == 'updateFolder') {
                updateFolder();
            } else if (state._type == 'createRecipe') {
                createRecipe();
            } else if (state._type == 'updateRecipe') {
                updateRecipe();
            }
        }
    };

    const resultLoading =
        updateLoading ||
        createLoading ||
        createRecipeLoading ||
        updateRecipeLoading;

    return (
        <AppNav error={error} loading={loading}>
            <ColumnBox>
                {{
                    header: (
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <PageTitle>Recipes</PageTitle>
                                </Box>
                                <Box sx={{ flex: 1 }} />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        paddingBottom: 1,
                                    }}
                                >
                                    <ButtonToggle
                                        onChange={(val) => {
                                            setView(val.id as FolderView);
                                        }}
                                        value={{ id: view, label: view }}
                                        options={[
                                            {
                                                id: 'Grid',
                                                label: 'Grid',
                                                icon: <BsGridFill />,
                                            },
                                            {
                                                id: 'Table',
                                                label: 'Table',
                                                icon: <MdTableRows />,
                                            },
                                        ]}
                                    />
                                    <Button
                                        sx={{ paddingLeft: 4, paddingRight: 4 }}
                                        onClick={(e) =>
                                            setContext({
                                                target: e.currentTarget,
                                            })
                                        }
                                        endIcon={<MdAdd />}
                                    >
                                        New
                                    </Button>
                                    <Menu
                                        anchorEl={
                                            context && 'target' in context
                                                ? context.target
                                                : null
                                        }
                                        open={
                                            context !== null &&
                                            'target' in context
                                        }
                                        onClose={() => setContext(null)}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <ContextMenu
                                            add={(t) => {
                                                if (t == 'folder') {
                                                    setContext(null);
                                                    setState({
                                                        _type: 'createFolder',
                                                        data: {
                                                            name: '',
                                                            class: FolderClass.Recipe,
                                                            parent: id || null,
                                                        },
                                                    });
                                                } else {
                                                    setContext(null);
                                                    setState({
                                                        _type: 'createRecipe',
                                                        data: {
                                                            name: '',
                                                            item: '',
                                                            folder:
                                                                id || undefined,
                                                        },
                                                    });
                                                }
                                            }}
                                        />
                                    </Menu>
                                </Box>
                            </Box>
                            <Divider />
                        </Box>
                    ),
                    content: (
                        <ColumnBox>
                            {{
                                header: <Box></Box>,
                                content: (
                                    <Box sx={{ height: '100%' }}>
                                        <Box p={2} />
                                        <Folders
                                            view={view}
                                            focused={folder || undefined}
                                            folders={
                                                folder
                                                    ? folder.folders.filter(
                                                          (f) =>
                                                              !dragged ||
                                                              dragged._id !==
                                                                  f._id
                                                      )
                                                    : []
                                            }
                                            documents={
                                                folder
                                                    ? folder.recipes.filter(
                                                          (d) =>
                                                              !dragged ||
                                                              dragged._id !==
                                                                  d._id
                                                      )
                                                    : []
                                            }
                                            getDocumentProps={(recipe) => ({
                                                id: recipe._id,
                                                primary: recipe.name,
                                                data: recipe,
                                                view,
                                            })}
                                            onDrag={(target, destination) => {
                                                if (target._type == 'folder') {
                                                    setDragged(target.folder);
                                                    updateFolder({
                                                        refetchQueries: [
                                                            FolderQuery,
                                                        ],
                                                        variables: {
                                                            id: target.folder
                                                                ._id,
                                                            data: {
                                                                parent:
                                                                    destination.name ==
                                                                    'Home'
                                                                        ? null
                                                                        : destination._id,
                                                            },
                                                        },
                                                        onCompleted: () => {
                                                            setClearDragging(
                                                                true
                                                            );
                                                        },
                                                    });
                                                } else {
                                                    setDragged(target.document);
                                                    updateRecipe({
                                                        refetchQueries: [
                                                            FolderQuery,
                                                        ],
                                                        variables: {
                                                            id: target.document
                                                                ._id,
                                                            data: {
                                                                folder:
                                                                    destination.name ==
                                                                    'Home'
                                                                        ? null
                                                                        : destination._id,
                                                            },
                                                        },
                                                        onCompleted: () => {
                                                            setClearDragging(
                                                                true
                                                            );
                                                        },
                                                    });
                                                }
                                            }}
                                            onContext={(e, f) => {
                                                if (f._type === 'folder')
                                                    setRightContext({
                                                        target: e.currentTarget,
                                                        data: {
                                                            _type: 'folder',
                                                            folder: f.folder,
                                                        },
                                                    });
                                                else
                                                    setRightContext({
                                                        target: e.currentTarget,
                                                        data: {
                                                            _type: 'recipe',
                                                            recipe: f.document,
                                                        },
                                                    });
                                            }}
                                            onClick={(f) => {
                                                if (f._type == 'folder') {
                                                    nav(
                                                        `/recipes/folders/${
                                                            f.folder.name ==
                                                            'Home'
                                                                ? ''
                                                                : f.folder._id
                                                        }`
                                                    );
                                                } else {
                                                    nav(
                                                        `/recipes/${f.document._id}`
                                                    );
                                                }
                                            }}
                                        />
                                        <Menu
                                            anchorEl={
                                                rightContext
                                                    ? rightContext.target
                                                    : null
                                            }
                                            open={
                                                rightContext !== null &&
                                                rightContext.data._type ===
                                                    'folder'
                                            }
                                            onClose={() =>
                                                setRightContext(null)
                                            }
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <MenuItem
                                                onClick={() => {
                                                    if (
                                                        rightContext &&
                                                        rightContext.data
                                                            ._type === 'folder'
                                                    ) {
                                                        setRightContext(null);
                                                        setState({
                                                            _type: 'updateFolder',
                                                            id: rightContext
                                                                .data.folder
                                                                ._id,
                                                            data: {
                                                                name: rightContext
                                                                    .data.folder
                                                                    .name,
                                                            },
                                                        });
                                                    }
                                                }}
                                            >
                                                Rename
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    if (
                                                        rightContext &&
                                                        rightContext.data
                                                            ._type === 'folder'
                                                    )
                                                        updateFolder({
                                                            variables: {
                                                                id: rightContext
                                                                    .data.folder
                                                                    ._id,
                                                                data: {
                                                                    deleted:
                                                                        true,
                                                                },
                                                            },
                                                            refetchQueries: [
                                                                FolderQuery,
                                                            ],
                                                            onCompleted: () => {
                                                                setState(null);
                                                            },
                                                        });
                                                }}
                                            >
                                                Delete
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                ),
                            }}
                        </ColumnBox>
                    ),
                }}
            </ColumnBox>
            <Menu
                open={context !== null && !('target' in context)}
                onClose={() => setContext(null)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                anchorReference="anchorPosition"
                anchorPosition={
                    context && !('target' in context)
                        ? {
                              left: context.x - 2,
                              top: context.y - 4,
                          }
                        : undefined
                }
            >
                <ContextMenu
                    add={(t) => {
                        if (t == 'folder') {
                            setContext(null);
                            setState({
                                _type: 'createFolder',
                                data: {
                                    name: '',
                                    class: FolderClass.Recipe,
                                    parent: id || null,
                                },
                            });
                        } else {
                            setContext(null);
                            setState({
                                _type: 'createRecipe',
                                data: {
                                    name: '',
                                    item: '',
                                    folder: id || undefined,
                                },
                            });
                        }
                    }}
                />
            </Menu>
            <ResponsiveDialog
                open={Boolean(state)}
                onClose={() => setState(null)}
            >
                <PanelHeader onClose={() => setState(null)}>
                    {state
                        ? state._type == 'createFolder'
                            ? 'Create Folder'
                            : state._type == 'updateFolder'
                            ? 'Update Folder'
                            : state._type == 'createRecipe'
                            ? 'Create Recipe'
                            : 'Update Recipe'
                        : ''}
                </PanelHeader>
                {state &&
                (state._type == 'createFolder' ||
                    state._type == 'updateFolder') ? (
                    <RecipeFolderForm
                        value={getFormValue()?.data || null}
                        onChange={(val) => {
                            if (state) {
                                if (state._type == 'createFolder')
                                    setState({
                                        ...state,
                                        data: { ...state.data, ...val },
                                    });
                                else if (state._type === 'updateFolder')
                                    setState({
                                        ...state,
                                        data: { ...state.data, ...val },
                                    });
                            }
                        }}
                    />
                ) : state ? (
                    <Box>
                        <FormRow>
                            <TextFormField
                                autoFocus
                                label="Recipe name"
                                value={state.data.name || ''}
                                onChange={(val) => {
                                    setState({
                                        ...state,
                                        data: {
                                            ...state.data,
                                            name: val || '',
                                            item: state.data.item || '',
                                        },
                                    });
                                }}
                            />
                        </FormRow>
                        <FormRow>
                            <ItemField
                                label="Item"
                                value={state.data.item || ''}
                                onChange={(val) => {
                                    setState({
                                        ...state,
                                        data: {
                                            ...state.data,
                                            item: val || '',
                                            name: state.data.name || '',
                                        },
                                    });
                                }}
                            />
                        </FormRow>
                    </Box>
                ) : (
                    ''
                )}
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ flex: 1 }} />
                    <LoadingButton
                        onClick={() => submit()}
                        loading={resultLoading}
                        fullWidth
                        variant="contained"
                    >
                        Save
                    </LoadingButton>
                </Box>
            </ResponsiveDialog>
            <Menu
                onClose={() => setRightContext(null)}
                open={
                    rightContext !== null &&
                    rightContext.data._type === 'recipe'
                }
                anchorEl={
                    rightContext !== null && rightContext.data._type
                        ? rightContext.target
                        : null
                }
            >
                <MenuItem
                    onClick={() => {
                        if (
                            rightContext &&
                            rightContext.data._type == 'recipe'
                        ) {
                            setState({
                                _type: 'updateRecipe',
                                id: rightContext.data.recipe._id,
                                data: {
                                    name: rightContext.data.recipe.name,
                                    item: rightContext.data.recipe.item._id,
                                },
                            });
                        }
                    }}
                >
                    <ListItemIcon>
                        <MdEdit />
                    </ListItemIcon>
                    Rename
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        if (
                            rightContext &&
                            rightContext.data._type == 'recipe'
                        ) {
                            setRightContext(null);
                            setDeleteRecipe({
                                recipe: rightContext.data.recipe,
                                confirmation: '',
                            });
                        }
                    }}
                >
                    <ListItemIcon>
                        <MdDelete />
                    </ListItemIcon>
                    Delete
                </MenuItem>
            </Menu>
            <Dialog
                open={Boolean(deleteRecipe)}
                PaperProps={{ sx: { padding: 3 } }}
                onClose={() => setDeleteRecipe(null)}
            >
                <PanelHeader onClose={() => setDeleteRecipe(null)}>
                    Delete Recipe
                </PanelHeader>
                <Typography color="error">
                    <em>Danger zone!</em>
                </Typography>
                <Box p={0.5} />
                <Typography>
                    To delete this recipe, type{' '}
                    <em>
                        {deleteRecipe
                            ? deleteRecipe.recipe.name
                            : 'Recipe Name '}
                    </em>{' '}
                    below.
                </Typography>
                <Box p={1} />
                <FormRow>
                    <TextFormField
                        label="Confirmation"
                        value={deleteRecipe ? deleteRecipe.confirmation : ''}
                        onChange={(val) => {
                            if (deleteRecipe) {
                                setDeleteRecipe({
                                    ...deleteRecipe,
                                    confirmation: val || '',
                                });
                            }
                        }}
                    />
                </FormRow>
                <LoadingButton
                    loading={updateRecipeLoading}
                    disabled={
                        !deleteRecipe ||
                        deleteRecipe.confirmation !== deleteRecipe.recipe.name
                    }
                    color="error"
                    variant="contained"
                    onClick={() => {
                        if (deleteRecipe)
                            updateRecipe({
                                refetchQueries: [FolderQuery],
                                variables: {
                                    id: deleteRecipe.recipe._id,
                                    data: {
                                        deleted: true,
                                    },
                                },
                                onCompleted: () => {
                                    setDeleteRecipe(null);
                                },
                            });
                    }}
                >
                    Delete
                </LoadingButton>
            </Dialog>
        </AppNav>
    );
};

export default RecipeFolderView;
