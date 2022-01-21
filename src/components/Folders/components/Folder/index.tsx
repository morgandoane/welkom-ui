import { useDraggable, useDroppable } from '@dnd-kit/core';
import {
    Box,
    ButtonBase,
    Grid,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import { CSS } from '@dnd-kit/utilities';
import React, { ReactElement } from 'react';
import { MdFolder } from 'react-icons/md';
import { Folder, FolderChild } from '../../../../graphql/schema/Folder/Folder';

export interface FolderBoxProps {
    folder: Folder | FolderChild;
    onClick?: (folder: Folder | FolderChild) => void;
    onContext?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        folder: Folder | FolderChild
    ) => void;
}

export const FolderChip = (props: {
    folder: Folder | FolderChild;
    onClick?: (folder: Folder | FolderChild) => void;
    onContext?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        folder: Folder | FolderChild
    ) => void;
}) => {
    const { folder, onClick, onContext } = props;
    const { palette, shape } = useTheme();

    return (
        <ButtonBase
            onContextMenu={(e) => {
                e.preventDefault();
                if (onContext) {
                    onContext(e, folder);
                }
            }}
            onClick={(e) => {
                if (onClick) {
                    onClick(folder);
                }
            }}
            sx={{
                ...shape,
                background: palette.background.paper,
                width: '100%',
                justifyContent: 'flex-start',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    fontSize: '2rem',
                    padding: 2,
                    color: palette.text.disabled,
                }}
            >
                <MdFolder />
            </Box>
            <Box sx={{ paddingRight: 2 }}>
                <Typography>{folder.name}</Typography>
            </Box>
        </ButtonBase>
    );
};

const FolderBox = (props: FolderBoxProps): ReactElement => {
    const { folder, onClick, onContext } = props;

    const [helper, setHelper] = React.useState(false);

    const {
        setNodeRef: setDragRef,
        active,
        attributes,
        listeners,
        transform,
    } = useDraggable({
        id: 'folderDrag_' + folder._id,
    });

    const { setNodeRef: setDropRef, isOver } = useDroppable({
        id: 'folderDrop_' + folder._id,
        disabled: active ? active.id.split('_')[1] === folder._id : false,
    });

    React.useEffect(() => {
        setHelper(isOver);
    }, [isOver]);

    const theme = useTheme();

    const { palette, shape } = theme;

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={2}
            ref={setDropRef}
            style={style}
        >
            <Tooltip
                title={'Move here'}
                arrow
                placement="top"
                open={helper}
                onClose={() => setHelper(false)}
            >
                <Box
                    sx={{
                        ...shape,
                        border: `2px solid ${
                            isOver && active?.id.split('_')[1] !== folder._id
                                ? palette.primary.main
                                : palette.background.default
                        }`,
                    }}
                >
                    <Box ref={setDragRef} {...attributes} {...listeners}>
                        <FolderChip
                            onContext={onContext}
                            onClick={onClick}
                            folder={folder}
                        />
                    </Box>
                </Box>
            </Tooltip>
        </Grid>
    );
};

export default FolderBox;
