import {
    DndContext,
    DragOverlay,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    Grid,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
    useMediaQuery,
    useTheme,
    useThemeProps,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { MdFolder } from 'react-icons/md';
import { Folder, FolderChild } from '../../graphql/schema/Folder/Folder';
import { useClickState } from '../../hooks/useClickState';
import Ancestor from './components/Ancestor';
import FolderBox, { FolderChip } from './components/Folder';
import FolderDocument, {
    FolderDocumentProps,
} from './components/FolderDocument';

export interface FoldersProps<T> {
    focused?: Folder;
    folders: (Folder | FolderChild)[];
    documents: T[];
    getDocumentProps: (d: T) => FolderDocumentProps<T>;
    onDrag: (
        target:
            | { _type: 'folder'; folder: Folder | FolderChild }
            | { _type: 'document'; document: T },
        detination: Folder | FolderChild
    ) => void;
    onClick?: (
        data:
            | { _type: 'folder'; folder: Folder | FolderChild }
            | { _type: 'document'; document: T }
    ) => void;
    onContext?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        folder:
            | { _type: 'folder'; folder: Folder | FolderChild }
            | { _type: 'document'; document: T }
    ) => void;
}

const Folders = <T,>(props: FoldersProps<T>): ReactElement => {
    const {
        focused,
        folders,
        documents,
        getDocumentProps,
        onClick,
        onContext,
        onDrag,
    } = props;

    const theme = useTheme();

    const [dragging, setDragging] = React.useState<null | FolderChild | Folder>(
        null
    );

    const [breadcrumbState, setBreadCrumbState] = useClickState();

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    });

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });

    const sensors = useSensors(mouseSensor, touchSensor);

    return (
        <Box>
            <DndContext
                sensors={sensors}
                onDragStart={(e) => {
                    const folder = folders.find(
                        (f) => f._id === e.active.id.split('_')[1]
                    );

                    if (folder) {
                        setDragging(folder);
                    }
                }}
                onDragEnd={(e) => {
                    setDragging(null);

                    const folder =
                        folders.find(
                            (f) => f._id === e.active.id.split('_')[1]
                        ) || null;

                    const document =
                        documents.find(
                            (f) =>
                                getDocumentProps(f).id ===
                                e.active.id.split('_')[1]
                        ) || null;

                    const destination =
                        e.over !== null
                            ? [
                                  ...folders,
                                  ...(focused ? focused.ancestry : []),
                              ].find(
                                  (f) => f._id === e.over?.id.split('_')[1]
                              ) || null
                            : null;

                    if (folder && destination) {
                        onDrag({ _type: 'folder', folder }, destination);
                    } else if (document && destination) {
                        onDrag({ _type: 'document', document }, destination);
                    }
                }}
            >
                {focused && focused.ancestry.length < 6 ? (
                    <Box sx={{ paddingBottom: 3, display: 'flex', gap: 2 }}>
                        {focused.ancestry.map((ancestor, index) => (
                            <Ancestor
                                onClick={(d) => {
                                    setBreadCrumbState(null);
                                    if (onClick)
                                        onClick({
                                            _type: 'folder',
                                            folder: d,
                                        });
                                }}
                                folder={ancestor}
                                key={'anc_' + ancestor._id}
                            />
                        ))}
                        {focused.name !== 'Home' && (
                            <Ancestor
                                active
                                onClick={(d) => {
                                    if (onClick)
                                        onClick({
                                            _type: 'folder',
                                            folder: d,
                                        });
                                }}
                                folder={focused}
                            />
                        )}
                    </Box>
                ) : focused ? (
                    <Box sx={{ paddingBottom: 2, display: 'flex', gap: 2 }}>
                        {focused.ancestry.slice(0, 1).map((ancestor, index) => (
                            <Ancestor
                                onClick={(d) => {
                                    if (onClick)
                                        onClick({
                                            _type: 'folder',
                                            folder: d,
                                        });
                                }}
                                folder={ancestor}
                                key={'anc_' + ancestor._id}
                            />
                        ))}
                        <IconButton
                            onClick={(e) =>
                                setBreadCrumbState({ target: e.currentTarget })
                            }
                        >
                            <HiDotsHorizontal />
                        </IconButton>
                        <Menu
                            open={Boolean(breadcrumbState)}
                            anchorEl={
                                breadcrumbState ? breadcrumbState.target : null
                            }
                            onClose={() => setBreadCrumbState(null)}
                        >
                            {focused.ancestry.slice(1, -1).map((ancestor) => (
                                <MenuItem
                                    key={'bread_' + ancestor._id}
                                    onClick={() => {
                                        setBreadCrumbState(null);
                                        if (onClick)
                                            onClick({
                                                _type: 'folder',
                                                folder: ancestor,
                                            });
                                    }}
                                >
                                    <ListItemIcon>
                                        <MdFolder />
                                    </ListItemIcon>
                                    {ancestor.name}
                                </MenuItem>
                            ))}
                        </Menu>
                        {focused.ancestry.slice(-1).map((ancestor, index) => (
                            <Ancestor
                                onClick={(d) => {
                                    setBreadCrumbState(null);
                                    if (onClick)
                                        onClick({
                                            _type: 'folder',
                                            folder: d,
                                        });
                                }}
                                folder={ancestor}
                                key={'anc_' + ancestor._id}
                            />
                        ))}
                        {focused.name !== 'Home' && (
                            <Ancestor
                                active
                                onClick={(d) => {
                                    setBreadCrumbState(null);
                                    if (onClick)
                                        onClick({
                                            _type: 'folder',
                                            folder: d,
                                        });
                                }}
                                folder={focused}
                            />
                        )}
                    </Box>
                ) : (
                    ''
                )}
                <Grid container rowSpacing={2} columnSpacing={{ xs: 4, md: 4 }}>
                    {folders.map((folder) => (
                        <FolderBox
                            onContext={(event) => {
                                if (onContext)
                                    onContext(event, {
                                        _type: 'folder',
                                        folder,
                                    });
                            }}
                            onClick={(d) => {
                                if (onClick) {
                                    onClick({ _type: 'folder', folder: d });
                                }
                            }}
                            key={folder._id}
                            folder={folder}
                        />
                    ))}
                    {documents.map((document) => {
                        const dProps = getDocumentProps(document);
                        return (
                            <FolderDocument
                                onClick={(d) => {
                                    if (onClick) {
                                        onClick({
                                            _type: 'document',
                                            document: d,
                                        });
                                    }
                                }}
                                onContext={(e, d) => {
                                    if (onContext) {
                                        onContext(e, {
                                            _type: 'document',
                                            document: d,
                                        });
                                    }
                                }}
                                key={dProps.id}
                                {...dProps}
                            />
                        );
                    })}
                    <DragOverlay>
                        {dragging ? <FolderChip folder={dragging} /> : null}
                    </DragOverlay>
                </Grid>
            </DndContext>
        </Box>
    );
};

export default Folders;
