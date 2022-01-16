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
    Typography,
    useMediaQuery,
    useTheme,
    useThemeProps,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import { Folder, FolderChild } from '../../graphql/schema/Folder/Folder';
import Ancestor from './components/Ancestor';
import FolderBox, { FolderChip } from './components/Folder';

export interface FoldersProps {
    focused?: Folder;
    folders: (Folder | FolderChild)[];
    onDrag: (
        target: Folder | FolderChild,
        detination: Folder | FolderChild
    ) => void;
    onClick?: (folder: Folder | FolderChild) => void;
    onContext?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        folder: Folder | FolderChild
    ) => void;
}

const Folders = (props: FoldersProps): ReactElement => {
    const { focused, folders, onClick, onContext, onDrag } = props;

    const theme = useTheme();

    const [dragging, setDragging] = React.useState<null | FolderChild | Folder>(
        null
    );

    const extrasmall = useMediaQuery(theme.breakpoints.down('xs'));
    const small = useMediaQuery(theme.breakpoints.down('sm'));
    const medium = useMediaQuery(theme.breakpoints.down('md'));
    const large = useMediaQuery(theme.breakpoints.down('lg'));
    const extralarge = useMediaQuery(theme.breakpoints.down('xl'));

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
            {focused && focused.ancestry.length > 0 && (
                <Box sx={{ paddingBottom: 2, display: 'flex', gap: 2 }}>
                    {focused.ancestry.map((ancestor, index) => (
                        <Ancestor
                            onClick={onClick}
                            folder={ancestor}
                            key={'anc_' + ancestor._id}
                        />
                    ))}
                    {focused.name !== 'Home' && (
                        <Ancestor active onClick={onClick} folder={focused} />
                    )}
                </Box>
            )}
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
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

                        const destination =
                            e.over !== null
                                ? folders.find(
                                      (f) => f._id === e.over?.id.split('_')[1]
                                  ) || null
                                : null;

                        if (folder && destination) {
                            onDrag(folder, destination);
                        }
                    }}
                >
                    {folders.map((folder) => (
                        <FolderBox
                            onContext={onContext}
                            onClick={onClick}
                            key={folder._id}
                            folder={folder}
                        />
                    ))}
                    <DragOverlay>
                        {dragging ? <FolderChip folder={dragging} /> : null}
                    </DragOverlay>
                </DndContext>
            </Grid>
        </Box>
    );
};

export default Folders;
