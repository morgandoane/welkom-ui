import {
    CircularProgress,
    MenuItem,
    TextField,
    TextFieldProps,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { MdError } from 'react-icons/md';
import { useItemCategories } from '../../../../graphql/queries/itemCategories/useItemCategories';

export interface ItemCategoryFieldProps
    extends Omit<TextFieldProps, 'value' | 'onChange'> {
    value: string | null;
    onChange: (val: string | null) => void;
}

const ItemCategoryField = (props: ItemCategoryFieldProps): ReactElement => {
    const {
        value,
        onChange,
        variant = 'filled',
        label = 'Category',
        placeholder = undefined,
        fullWidth = true,
        ...rest
    } = props;

    const { palette } = useTheme();

    const { data, error, loading } = useItemCategories();

    const cats = data ? data.itemCategories : [];

    return (
        <TextField
            select
            fullWidth={fullWidth}
            value={value == null ? 'uncategorized' : value || ''}
            onChange={(e) => {
                if (e.target.value == 'uncategorized') {
                    onChange(null);
                } else {
                    onChange(e.target.value);
                }
            }}
            variant={variant}
            label={label}
            placeholder={placeholder}
            InputProps={{
                endAdornment: loading ? (
                    <CircularProgress size={18} />
                ) : error ? (
                    <MdError
                        style={{
                            color: palette.warning.main,
                            fontSize: '1rem',
                        }}
                    />
                ) : undefined,
                ...rest.InputProps,
            }}
            {...rest}
        >
            <MenuItem value="uncategorized">Uncategorized</MenuItem>
            {cats.map((cat) => (
                <MenuItem key={'op_' + cat._id} value={cat._id}>
                    {cat.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default ItemCategoryField;
