import { useDraggable } from '@dnd-kit/core';
import { Box, ButtonBase, Grid, Typography, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { BsFillFileEarmarkTextFill } from 'react-icons/bs';
import { CSS } from '@dnd-kit/utilities';

export interface FolderDocumentProps<T> {
    primary: string;
    tooltip?: string;
    onClick?: (d: T) => void;
    onContext?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        data: T
    ) => void;
    secondary?: string;
    icon?: ReactElement;
    id: string;
    data: T;
}

export const FolderDocumentChip = <T,>(props: FolderDocumentProps<T>) => {
    const { primary, secondary, icon, id, onClick, onContext, data } = props;
    const { palette, shape } = useTheme();

    return (
        <ButtonBase
            onContextMenu={(e) => {
                e.preventDefault();
                if (onContext) {
                    onContext(e, data);
                }
            }}
            onClick={(e) => {
                if (onClick) {
                    onClick(data);
                }
            }}
            sx={{
                ...shape,
                background: palette.background.paper,
                width: '100%',
                justifyContent: 'flex-start',
                margin: '2px',
            }}
        >
            <Box sx={{ display: 'flex', fontSize: '2rem', padding: 2 }}>
                {icon || (
                    <BsFillFileEarmarkTextFill
                        style={{ color: palette.primary.main }}
                    />
                )}
            </Box>
            <Box sx={{ paddingRight: 2 }}>
                <Typography>{primary}</Typography>
                <Typography variant="caption" color="textSecondary">
                    {secondary}
                </Typography>
            </Box>
        </ButtonBase>
    );
};

const FolderDocument = <T,>(props: FolderDocumentProps<T>): ReactElement => {
    const { primary, secondary, tooltip, id, onClick, onContext, icon, data } =
        props;

    const {
        setNodeRef: setDragRef,
        active,
        attributes,
        listeners,
        transform,
    } = useDraggable({
        id: 'file_' + id,
    });

    const theme = useTheme();

    const { palette, shape } = theme;

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <Grid item xs={12} sm={12} md={6} lg={4} xl={2} style={style}>
            <Box
                sx={{
                    ...shape,
                }}
            >
                <Box ref={setDragRef} {...attributes} {...listeners}>
                    <FolderDocumentChip {...props} />
                </Box>
            </Box>
        </Grid>
    );
};

export default FolderDocument;
