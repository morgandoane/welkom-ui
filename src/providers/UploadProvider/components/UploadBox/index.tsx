import {
    Box,
    Collapse,
    Grow,
    IconButton,
    LinearProgress,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdExpandLess } from 'react-icons/md';
import { useUploads } from '../..';
import Anima from '../../../../components/Anima';
import {
    getFileTypeCategory,
    iconMap,
} from '../../../../components/FileUpload';
import { truncate } from '../../../../utils/truncate';
import { Animation } from '../../../../media/Animation';

const Card = (props: {
    file: File;
    progress?: number | null;
    error?: Error;
    complete?: boolean;
}) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: `1px solid ${theme.palette.divider}`,
                position: 'relative',
            }}
        >
            <Box sx={{ padding: 2, fontSize: '1.5rem', display: 'flex' }}>
                {iconMap[getFileTypeCategory(props.file)]}
            </Box>
            <Box sx={{ flex: 1, padding: 2, paddingLeft: 0 }}>
                <Typography>{truncate(props.file.name, 20)}</Typography>
            </Box>
            {props.error && (
                <Tooltip title={props.error.message} placement="top" arrow>
                    <Box sx={{ display: 'flex' }}>
                        <Animation
                            type="warning"
                            style={{ height: 40, width: 40 }}
                            loop={false}
                        />
                    </Box>
                </Tooltip>
            )}
            {props.complete && (
                <Box sx={{ display: 'flex' }}>
                    <Animation
                        type="success"
                        style={{ height: 40, width: 40 }}
                        loop={false}
                    />
                </Box>
            )}
            {props.progress !== undefined && (
                <Box
                    sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
                >
                    <LinearProgress />
                </Box>
            )}
        </Box>
    );
};
const UploadBox = (): ReactElement => {
    const theme = useTheme();
    const { queue, active, errors, completed } = useUploads();

    const [open, setOpen] = React.useState(true);

    return (
        <Grow in={queue.length > 0 || active !== null || errors.length > 0}>
            <Box
                sx={{
                    color: theme.palette.text.primary,
                    position: 'absolute',
                    bottom: theme.spacing(4),
                    left: theme.spacing(12),
                    background: theme.palette.background.paper,
                    boxShadow: theme.shadows[8],
                    display: 'flex',
                    flexFlow: 'column',
                    width: 300,
                }}
            >
                <Box
                    sx={{
                        padding: 2,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography>Uploads</Typography>
                    <Anima type="rotate" in={open}>
                        <IconButton onClick={() => setOpen(!open)}>
                            <MdExpandLess />
                        </IconButton>
                    </Anima>
                </Box>
                <Collapse in={open}>
                    <Box sx={{ flex: 1, maxHeight: 200, overflow: 'auto' }}>
                        {active && (
                            <Card
                                file={active.file}
                                progress={active.progress}
                            />
                        )}
                        {queue.map((q, i) => (
                            <Card key={'queued_' + i} file={q.file} />
                        ))}
                        {errors.map((q, i) => (
                            <Card
                                key={'errors' + i}
                                file={q.file}
                                error={q.error}
                            />
                        ))}
                        {completed.map((q, i) => (
                            <Card
                                key={'completed' + i}
                                file={q.file}
                                complete
                            />
                        ))}
                    </Box>
                </Collapse>
            </Box>
        </Grow>
    );
};

export default UploadBox;
