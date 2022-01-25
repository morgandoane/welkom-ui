import { Autocomplete, TextFieldProps } from '@mui/material';
import React, { ReactElement } from 'react';
import { useProductionLines } from '../../../../graphql/queries/productionLine/useProductionLines';
import AutoCompleteTextField from '../AutoCompleteTextField';

export interface ProductionLineFieldProps {
    label?: string;
    value: string | null;
    onChange: (value: string | null) => void;
    naked?: boolean;
    size?: TextFieldProps['size'];
    location?: string;
}

const ProductionLineField = (props: ProductionLineFieldProps): ReactElement => {
    const {
        label = 'Line',
        value,
        onChange,
        naked = false,
        size = 'medium',
        location,
    } = props;

    const { data, error, loading } = useProductionLines({
        variables: {
            filter: {
                skip: 0,
                take: 100,
            },
        },
    });

    const lines = data
        ? data.productionLines.map((i) => ({
              ...i,
              label: i.name,
              id: i._id,
          }))
        : [];

    const filtered = location
        ? lines.filter((l) => l.location._id == location)
        : lines;

    const match = filtered.find((u) => u._id === value);

    return (
        <Autocomplete
            fullWidth
            value={match || null}
            onChange={(e, val) => {
                onChange(val ? val._id : null);
            }}
            options={filtered}
            getOptionLabel={(d) => d.name}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.id}>
                        {option.name}
                    </li>
                );
            }}
            size={size}
            renderInput={(params) => (
                <AutoCompleteTextField
                    {...params}
                    label={label}
                    naked={naked}
                />
            )}
        />
    );
};

export default ProductionLineField;
