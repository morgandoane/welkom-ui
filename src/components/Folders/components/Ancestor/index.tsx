import { useDroppable } from '@dnd-kit/core';
import { Box, Button, Tooltip, Typography, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { CgFormatSlash } from 'react-icons/cg';
import { Folder, FolderChild } from '../../../../graphql/schema/Folder/Folder';

export interface AncestorProps {
    folder: Folder | FolderChild;
    onClick?: (folder: Folder | FolderChild) => void;
    active?: boolean;
}

const Ancestor = (props: AncestorProps): ReactElement => {
    const { folder, active = false, onClick } = props;

    const { palette, shape } = useTheme();

    const [helper, setHelper] = React.useState(false);

    const {
        setNodeRef: setDropRef,
        isOver,
        over,
    } = useDroppable({
        id: 'ancestorDrop_' + folder._id,
    });

    React.useEffect(() => {
        setHelper(isOver);
    }, [isOver]);

    return (
        <Box ref={setDropRef}>
            <Tooltip
                title={'Move here'}
                arrow
                placement="top"
                open={helper}
                onClose={() => setHelper(false)}
            >
                <Box
                    sx={{
                        background: isOver ? palette.action.hover : undefined,
                        paddingTop: 1,
                        paddingBottom: 1,
                        ...shape,
                    }}
                >
                    <Button
                        endIcon={!active ? <CgFormatSlash /> : undefined}
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
            </Tooltip>
        </Box>
    );
};

export default Ancestor;
