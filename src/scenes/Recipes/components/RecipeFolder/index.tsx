import {
    Box,
    Button,
    Divider,
    ListItemIcon,
    Menu,
    MenuItem,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import {
    MdAdd,
    MdCreateNewFolder,
    MdDocumentScanner,
    MdFolder,
} from 'react-icons/md';
import { useParams } from 'react-router-dom';
import AppNav from '../../../../components/AppNav';
import ColumnBox from '../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../components/PageTitle';
import { useRecipeFolder } from '../../../../graphql/queries/recipeFolder/useRecipeFolder';
import { useClickState } from '../../../../hooks/useClickState';

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

const RecipeFolder = (): ReactElement => {
    const { id } = useParams();
    const { data, error, loading } = useRecipeFolder({
        variables: {
            id: id || null,
        },
    });

    const theme = useTheme();

    const [context, setContext] = React.useState<
        | null
        | {
              x: number;
              y: number;
          }
        | { target: Element }
    >(null);

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
                                                    //
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
                                    <Box
                                        sx={{ height: '100%' }}
                                        onContextMenu={(e) => {
                                            e.preventDefault();
                                            setContext({
                                                x: e.clientX - 2,
                                                y: e.clientY - 4,
                                            });
                                        }}
                                    ></Box>
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
                            //
                        } else {
                            //
                        }
                    }}
                />
            </Menu>
        </AppNav>
    );
};

export default RecipeFolder;
