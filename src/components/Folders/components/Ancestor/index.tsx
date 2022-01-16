import { useDroppable } from '@dnd-kit/core';
import { Box, Button, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { Folder, FolderChild } from '../../../../graphql/schema/Folder/Folder';

export interface AncestorProps {
    folder: Folder | FolderChild;
    onClick?: (folder: Folder | FolderChild) => void;
    active?: boolean;
}

const Ancestor = (props: AncestorProps): ReactElement => {
    const { folder, active = false, onClick } = props;

    const { setNodeRef: setDropRef, isOver } = useDroppable({
        id: 'ancestorDrop_' + folder._id,
    });

    return (
        <Box ref={setDropRef}>
            <Box>
                <Button
                    endIcon={!active ? <MdChevronRight /> : undefined}
                    variant="text"
                    color="inherit"
                    onClick={() => {
                        if (onClick) {
                            onClick(folder);
                        }
                    }}
                >
                    {folder.name}
                </Button>
            </Box>
        </Box>
    );
};

export default Ancestor;
