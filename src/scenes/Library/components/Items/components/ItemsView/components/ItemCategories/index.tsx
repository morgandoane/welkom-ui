import React from 'react';
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    IconButton,
    Stack,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import {
    ItemCategoriesQuery,
    useItemCategories,
} from '../../../../../../../../graphql/queries/itemCategories/useItemCategories';
import { MdAdd, MdClose, MdEdit } from 'react-icons/md';
import {
    ItemCategoryCreationRes,
    useItemCategoryCreation,
} from '../../../../../../../../graphql/mutations/ItemCategories/useItemCategoryCreation';
import {
    ItemCategoryUpdateRes,
    useItemCategoryUpdate,
} from '../../../../../../../../graphql/mutations/ItemCategories/useItemCategoryUpdate';
import {
    ItemCategoryDeletionRes,
    useItemCategoryDeletion,
} from '../../../../../../../../graphql/mutations/ItemCategories/useItemCategoryDeletion';
import { OperationResult } from '../../../../../../../../graphql/types';
import { LoadingButton } from '@mui/lab';
import Message from '../../../../../../../../components/Message';
import CarefulButton from '../../../../../../../../components/Forms/CarefulButton';
import { TinyItems } from '../../../../../../../../graphql/queries/items/useTinyItems';

export interface ItemCategoriesProps {
    value: string | null | undefined;
    onChange: (value: string | null | undefined) => void;
}

const ItemCategories = (props: ItemCategoriesProps) => {
    const { value, onChange } = props;

    const { palette } = useTheme();

    const [state, setState] = React.useState<
        | null
        | { type: 'create'; label: string }
        | { type: 'update'; label: string; id: string }
    >(null);

    const { data, error, loading } = useItemCategories();

    const [result, setResult] = React.useState<OperationResult<
        | ItemCategoryCreationRes
        | ItemCategoryUpdateRes
        | ItemCategoryDeletionRes
    > | null>(null);

    const [create, { loading: createLoading }] = useItemCategoryCreation({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
        variables:
            state && !('id' in state) ? { label: state.label } : undefined,
        refetchQueries: [ItemCategoriesQuery, TinyItems],
    });
    const [update, { loading: updateLoading }] = useItemCategoryUpdate({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
        variables:
            state && 'id' in state
                ? { id: state.id, label: state.label }
                : undefined,
        refetchQueries: [ItemCategoriesQuery, TinyItems],
    });
    const [remove, { loading: removeLoading }] = useItemCategoryDeletion({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
        variables: state && 'id' in state ? { id: state.id } : undefined,
        refetchQueries: [ItemCategoriesQuery, TinyItems],
    });

    const cats = data ? data.itemCategories : [];

    return (
        <Box>
            {loading ? (
                <CircularProgress size={20} />
            ) : (
                <Box>
                    <Stack direction="row" spacing={1}>
                        {cats.map((cat) => (
                            <Chip
                                label={cat.label}
                                key={'chip_' + cat._id}
                                color={
                                    value === cat._id ? 'primary' : undefined
                                }
                                onClick={() => {
                                    if (value === cat._id) onChange(undefined);
                                    else onChange(cat._id);
                                }}
                                deleteIcon={
                                    <MdEdit
                                        style={{
                                            fontSize: '1rem',
                                            paddingRight: 2,
                                        }}
                                    />
                                }
                                onDelete={
                                    value == cat._id
                                        ? () => {
                                              setState({
                                                  type: 'update',
                                                  id: cat._id,
                                                  label: cat.label,
                                              });
                                          }
                                        : undefined
                                }
                            />
                        ))}
                        <Chip
                            label="Uncategorized"
                            color={value === null ? 'primary' : undefined}
                            onClick={() => {
                                if (value === null) onChange(undefined);
                                else onChange(null);
                            }}
                        />
                        <Tooltip arrow title="New Category">
                            <Button
                                onClick={() =>
                                    setState({ type: 'create', label: '' })
                                }
                                color="inherit"
                                sx={{
                                    width: 32,
                                    height: 32,
                                    padding: 0,
                                    minWidth: 0,
                                    borderRadius: '16px',
                                }}
                            >
                                <MdAdd style={{ fontSize: '1rem', flex: 1 }} />
                            </Button>
                        </Tooltip>
                    </Stack>
                </Box>
            )}
            <Dialog
                open={Boolean(state)}
                onClose={() => {
                    setState(null);
                    setResult(null);
                }}
                PaperProps={{
                    sx: { p: 2, background: palette.background.paper },
                }}
            >
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: 1,
                        }}
                    >
                        <Typography variant="h6" sx={{ paddingRight: 6 }}>
                            {state && 'id' in state
                                ? 'Update Category'
                                : 'New Item Category'}
                        </Typography>
                        <IconButton
                            onClick={() => {
                                setState(null);
                                setResult(null);
                            }}
                        >
                            <MdClose />
                        </IconButton>
                    </Box>
                    {result ? (
                        <Box>
                            {result.success ? (
                                <Box>
                                    <Message
                                        type="Success"
                                        message={
                                            'updateItemCategory' in result.data
                                                ? 'Category updated.'
                                                : 'deleteItemCategory' in
                                                  result.data
                                                ? 'Category removed.'
                                                : 'Category created!'
                                        }
                                        onComplete={() => {
                                            setResult(null);
                                            setState(null);
                                        }}
                                    />
                                </Box>
                            ) : (
                                <Box>
                                    <Message
                                        type="Error"
                                        message={result.error.message}
                                        action={
                                            <Button
                                                color="inherit"
                                                onClick={() => setResult(null)}
                                            >
                                                Try again
                                            </Button>
                                        }
                                    />
                                </Box>
                            )}
                        </Box>
                    ) : (
                        <Box>
                            <TextField
                                fullWidth
                                autoFocus
                                label="Label"
                                value={state ? state.label : ''}
                                onChange={(e) => {
                                    if (state) {
                                        setState({
                                            ...state,
                                            label: e.target.value,
                                        });
                                    }
                                }}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: 2,
                                }}
                            >
                                <Box>
                                    {state && 'id' in state && (
                                        <CarefulButton
                                            disabled={!state || !state.label}
                                            loading={
                                                createLoading ||
                                                updateLoading ||
                                                removeLoading
                                            }
                                            onClick={() => {
                                                if (state && 'id' in state) {
                                                    remove();
                                                }
                                            }}
                                        >
                                            Delete
                                        </CarefulButton>
                                    )}
                                </Box>
                                <LoadingButton
                                    disabled={!state || !state.label}
                                    variant="contained"
                                    color="primary"
                                    loading={
                                        createLoading ||
                                        updateLoading ||
                                        removeLoading
                                    }
                                    onClick={() => {
                                        if (state && 'id' in state) {
                                            update();
                                        } else if (state) {
                                            create();
                                        }
                                    }}
                                >
                                    Save
                                </LoadingButton>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Dialog>
        </Box>
    );
};

export default ItemCategories;
