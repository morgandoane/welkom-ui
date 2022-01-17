import { LoadingButton } from '@mui/lab';
import {
    Box,
    Button,
    capitalize,
    Divider,
    ListItemIcon,
    Menu,
    MenuItem,
    useTheme,
} from '@mui/material';
import React, { ReactElement, useContext } from 'react';
import {
    MdAdd,
    MdCreateNewFolder,
    MdDocumentScanner,
    MdFolder,
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
import Folders from '../../../../components/Folders';
import {
    CreateFolderArgs,
    useFolderCreation,
} from '../../../../graphql/mutations/folder/useFolderCreation';
import {
    UpdateFolderArgs,
    UpdateFolderRes,
    useFolderUpdation,
} from '../../../../graphql/mutations/folder/useFolderUpdate';
import {
    FolderQuery,
    useFolder,
} from '../../../../graphql/queries/folder/useFolder';

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
        null | Folder | Folder['parent']
    >(null);

    const [state, setState] = React.useState<
        | null
        | ({ _type: 'create' } & CreateFolderArgs)
        | ({ _type: 'update' } & UpdateFolderArgs)
    >(null);

    const [folder, setFolder] = React.useState<null | Folder>(null);

    const { data, error, loading } = useFolder({
        variables: {
            id: id || null,
        },
        onCompleted: (data) => setFolder(data.folder),
        fetchPolicy: 'network-only',
    });

    const folders = data ? data.folder.folders : [];
    const theme = useTheme();

    const [rightContext, setRightContext] = React.useState<{
        target: EventTarget & HTMLButtonElement;
        folder: Folder | FolderChild;
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

    const [update, { loading: updateLoading }] = useFolderUpdation({
        variables:
            state && state._type == 'update'
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
        },
    });

    const [create, { loading: createLoading }] = useFolderCreation({
        variables:
            state && state._type == 'create'
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
        },
    });

    const getOptimisticRes = (args: UpdateFolderArgs): UpdateFolderRes => {
        const destination = folder
            ? folder.ancestry.find((f) => f._id === args.data.parent) || null
            : null;
        return {
            updateFolder: {
                date_created: new Date(),
                created_by: folder
                    ? folder.created_by
                    : {
                          user_id: '',
                          name: '',
                          email: '',
                      },
                deleted: false,
                _id: folder ? folder._id : '',
                recipes: [],
                ancestry: folder ? folder.ancestry : [],
                folders: [],
                class: FolderClass.Recipe,
                name: folder?.name || '',
                parent: null,
            },
        };
    };

    const submit = () => {
        if (state) {
            if (state._type == 'create') {
                create();
            } else {
                update();
            }
        }
    };

    const resultLoading = updateLoading || createLoading;

    return (
        <AppNav error={error} loading={loading}>
            <ColumnBox>
                {{
                    header: (
                        <Box>
                            <Box
                                sx={{ display: 'flex', alignItems: 'flex-end' }}
                            >
                                <Box>
                                    <PageTitle>Recipes</PageTitle>
                                </Box>
                                <Box sx={{ flex: 1 }} />
                                <Box sx={{ paddingBottom: 3 }}>
                                    <Button
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
                                                        _type: 'create',
                                                        data: {
                                                            name: '',
                                                            class: FolderClass.Recipe,
                                                            parent:
                                                                'id' || null,
                                                        },
                                                    });
                                                } else {
                                                    //
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
                                            onDrag={(target, destination) => {
                                                setDragged(target);
                                                update({
                                                    refetchQueries: [
                                                        FolderQuery,
                                                    ],
                                                    optimisticResponse: (
                                                        args
                                                    ) => getOptimisticRes(args),
                                                    variables: {
                                                        id: target._id,
                                                        data: {
                                                            parent:
                                                                destination.name ==
                                                                'Home'
                                                                    ? null
                                                                    : destination._id,
                                                        },
                                                    },
                                                    onCompleted: () => {
                                                        setDragged(target);
                                                    },
                                                });
                                            }}
                                            onContext={(e, f) => {
                                                setRightContext({
                                                    target: e.currentTarget,
                                                    folder: f,
                                                });
                                            }}
                                            onClick={(f) => {
                                                nav(
                                                    `/recipes/folders/${
                                                        f.name == 'Home'
                                                            ? ''
                                                            : f._id
                                                    }`
                                                );
                                            }}
                                        />
                                        <Menu
                                            anchorEl={
                                                rightContext
                                                    ? rightContext.target
                                                    : null
                                            }
                                            open={Boolean(rightContext)}
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
                                                    if (rightContext) {
                                                        setRightContext(null);
                                                        setState({
                                                            _type: 'update',
                                                            id: rightContext
                                                                .folder._id,
                                                            data: {
                                                                name: rightContext
                                                                    .folder
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
                                                    if (rightContext)
                                                        update({
                                                            variables: {
                                                                id: rightContext
                                                                    .folder._id,
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
                                _type: 'create',
                                data: {
                                    name: '',
                                    class: FolderClass.Recipe,
                                    parent: 'id' || null,
                                },
                            });
                        } else {
                            //
                        }
                    }}
                />
            </Menu>
            <ResponsiveDialog
                open={Boolean(state)}
                onClose={() => setState(null)}
            >
                <PanelHeader onClose={() => setState(null)}>
                    {state ? capitalize(state._type) + ' folder' : ''}
                </PanelHeader>
                <RecipeFolderForm
                    value={getFormValue()?.data || null}
                    onChange={(val) => {
                        if (state) {
                            if (state._type == 'create')
                                setState({
                                    ...state,
                                    data: { ...state.data, ...val },
                                });
                            else
                                setState({
                                    ...state,
                                    data: { ...state.data, ...val },
                                });
                        }
                    }}
                />
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
        </AppNav>
    );
};

export default RecipeFolderView;
