import {
    Box,
    CircularProgress,
    Dialog,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    TableCell,
    TableRow,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { AppFile } from '../../../../../graphql/schema/AppFile/AppFile';
import { FileIcon, IconType } from 'react-file-icon';
import {
    Md3DRotation,
    MdClear,
    MdDelete,
    MdDownload,
    MdEdit,
} from 'react-icons/md';
import { DocumentNode, gql } from '@apollo/client';
import { getMutationHook } from '../../../../../graphql/types';
import { StorageBucket } from '../../../../Inputs/Attachments/components/FileUpload';
import FormRow from '../../../../Layout/FormRow';
import { LoadingButton } from '@mui/lab';

export interface FileRenderProps {
    children: AppFile;
    folder: string;
    refetchQueries: DocumentNode[];
    setModel: (file: AppFile) => void;
}

const RenameFile = gql`
    mutation RenameFile(
        $new_filename: String!
        $filename: String!
        $folder: String!
        $bucket: StorageBucket!
    ) {
        renameFile(
            new_filename: $new_filename
            filename: $filename
            folder: $folder
            bucket: $bucket
        )
    }
`;

export const useRename = getMutationHook<
    { renameFile: boolean },
    {
        new_filename: string;
        filename: string;
        folder: string;
        bucket: StorageBucket;
    }
>(RenameFile);

export const DeleteFile = gql`
    mutation DeleteFile(
        $filename: String!
        $folder: String!
        $bucket: StorageBucket!
    ) {
        deleteFile(filename: $filename, folder: $folder, bucket: $bucket)
    }
`;

export const useDeletion = getMutationHook<
    { deleteFile: boolean },
    {
        filename: string;
        folder: string;
        bucket: StorageBucket;
    }
>(DeleteFile);

const FileRender = (props: FileRenderProps): ReactElement => {
    const { children: file, refetchQueries } = props;

    const { palette } = useTheme();

    const [rename, setRename] = React.useState<null | string>(null);

    const [handleDelete, { loading: deleteLoading }] = useDeletion();
    const [handlerename, { loading: renameLoading }] = useRename();

    const [focus, setFocus] = React.useState<null | {
        position: { x: number; y: number };
    }>(null);

    const forgeTypes = [
        '3DS',
        'A',
        'ASM',
        'ASM',
        'ASM',
        'BRD',
        'CATPART',
        'CATPRODUCT',
        'CGR',
        'COLLABORATION',
        'DAE',
        'DGN',
        'DLV3',
        'DWF',
        'DWFX',
        'DWG',
        'DWT',
        'DXF',
        'EMODE',
        'EXP',
        'F2D',
        'F3D',
        'FBX',
        'G',
        'GBXML',
        'GLB',
        'GLTF',
        'IAM',
        'IDW',
        'IFC',
        'IGE',
        'IGES',
        'IGS',
        'IPT',
        'IWM',
        'JT',
        'MAX',
        'MODEL',
        'MPF',
        'MSR',
        'NEU',
        'NEU',
        'NWC',
        'NWD',
        'OBJ',
        'PAR',
        'PMLPRJ',
        'PMLPRJZ',
        'PRT',
        'PRT',
        'PSM',
        'PSMODEL',
        'RVT',
        'SAB',
        'SAT',
        'SCH',
        'SESSION',
        'SKP',
        'SLDASM',
        'SLDPRT',
        'STE',
        'STEP',
        'STL',
        'STLA',
        'STLB',
        'STP',
        'STPZ',
        'VUE',
        'WIRE',
        'X_B',
        'X_T',
        'XAS',
        'XPR',
        'ZIP',
    ];

    const iconSchema: Record<IconType, { color?: string; types: string[] }> = {
        ['3d']: {
            color: '#FA2929',
            types: [
                '.sldprt',
                '.slddrw',
                '.stp',
                '.step',
                '.max',
                '.obj',
                '.3ds',
                '.stl',
                '.dxf',
                '.easm',
            ],
        },
        acrobat: {
            color: '#ff0000',
            types: ['.pdf', '.npdf', '.pdfa', '.pdfx'],
        },
        audio: { types: ['.pcm', '.wav', '.mp3', '.aac', '.flac'] },
        binary: { types: [] },
        code: { types: [] },
        compressed: { types: [] },
        document: {
            color: '#4285F4',
            types: ['.doc', '.docx', '.txt'],
        },
        drive: { types: [] },
        font: { types: [] },
        image: {
            color: '#42B7F5',
            types: [
                '.tif',
                '.tiff',
                '.bitmap',
                '.jpeg',
                '.gif',
                '.png',
                '.eps',
                '.jpg',
            ],
        },
        presentation: { types: [] },
        settings: { types: [] },
        spreadsheet: { color: '#34A853', types: ['.xls', '.xlsm', '.xlsx'] },
        vector: { types: ['.ai', '.svg', '.eps', '.ait', '.svgz'] },
        video: { types: [] },
    };

    const extension =
        '.' + file.name.split('.')[file.name.split('.').length - 1];

    const iconType: IconType | undefined = Object.keys(iconSchema)
        .map((k) => k as IconType)
        .find((key) => iconSchema[key].types.includes(extension.toLowerCase()));

    return (
        <React.Fragment>
            <TableRow
                onClick={() => {
                    window.open(file.url, '_blank');
                }}
                onContextMenu={(e) => {
                    e.preventDefault();
                    setFocus({
                        position: {
                            x: e.clientX - 2,
                            y: e.clientY - 4,
                        },
                    });
                }}
                hover
            >
                {iconType == 'image' ? (
                    <TableCell>
                        <img src={file.url} style={{ width: 32 }} />
                    </TableCell>
                ) : (
                    <TableCell sx={{ width: 32 }}>
                        <Box sx={{ width: '32px' }}>
                            <FileIcon
                                color={
                                    iconType
                                        ? iconSchema[iconType].color
                                        : undefined
                                }
                                type={iconType}
                                extension={extension}
                            />
                        </Box>
                    </TableCell>
                )}

                <TableCell align="left">{file.display_name}</TableCell>
                <TableCell align="right">
                    {deleteLoading && (
                        <CircularProgress style={{ height: 24, width: 24 }} />
                    )}
                </TableCell>
            </TableRow>
            <Menu
                open={Boolean(focus)}
                onClose={() => setFocus(null)}
                anchorReference="anchorPosition"
                anchorPosition={
                    focus !== null
                        ? { top: focus.position.y, left: focus.position.x }
                        : undefined
                }
            >
                <MenuItem
                    onClick={() => {
                        window.open(file.url, '_blank');
                        setFocus(null);
                    }}
                >
                    <ListItemIcon>
                        <MdDownload />
                    </ListItemIcon>
                    Download
                </MenuItem>
                {forgeTypes
                    .map((t) => '.' + t.toLowerCase())
                    .includes(extension.toLowerCase()) && (
                    <MenuItem
                        onClick={() => {
                            setFocus(null);
                            props.setModel(props.children);
                        }}
                    >
                        <ListItemIcon>
                            <Md3DRotation />
                        </ListItemIcon>
                        View 3D Model
                    </MenuItem>
                )}
                <MenuItem
                    onClick={() => {
                        setRename(file.display_name);
                        setFocus(null);
                    }}
                >
                    <ListItemIcon>
                        <MdEdit />
                    </ListItemIcon>
                    Rename
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleDelete({
                            variables: {
                                bucket: StorageBucket.ldbbakery_attachments,
                                folder: props.folder,
                                filename: file.name,
                            },
                            refetchQueries,
                        });
                        setFocus(null);
                    }}
                >
                    <ListItemIcon>
                        <MdDelete />
                    </ListItemIcon>
                    Delete
                </MenuItem>
            </Menu>
            <Dialog
                PaperProps={{ sx: { p: 2 } }}
                open={rename !== null}
                onClose={() => setRename(null)}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingBottom: 1,
                    }}
                >
                    <Typography sx={{ paddingRight: 20 }} variant="h6">
                        Rename file
                    </Typography>
                    <IconButton onClick={() => setRename(null)}>
                        <MdClear />
                    </IconButton>
                </Box>
                <FormRow>
                    <TextField
                        InputProps={{
                            endAdornment: (
                                <Box
                                    sx={{
                                        color: palette.text.disabled,
                                        paddingTop: 2,
                                    }}
                                >
                                    {extension}
                                </Box>
                            ),
                        }}
                        autoFocus
                        label="Name"
                        fullWidth
                        value={rename || ''}
                        onChange={(e) => {
                            if (rename !== null) {
                                setRename(e.target.value || '');
                            }
                        }}
                    />
                </FormRow>
                <LoadingButton
                    loading={renameLoading}
                    disabled={!rename}
                    variant="contained"
                    fullWidth
                    onClick={() => {
                        handlerename({
                            variables: {
                                bucket: StorageBucket.ldbbakery_attachments,
                                folder: props.folder,
                                filename: file.name,
                                new_filename: (rename || '') + extension,
                            },
                            refetchQueries,
                            onCompleted: () => {
                                setRename(null);
                            },
                        });
                    }}
                >
                    Save
                </LoadingButton>
            </Dialog>
        </React.Fragment>
    );
};

export default FileRender;
