import { Autocomplete, TextField, TextFieldProps } from '@mui/material';
import React, { ReactElement } from 'react';
import { useTinyUnits } from '../../../../graphql/queries/units/useTinyUnits';
import { UnitClass } from '../../../../graphql/schema/Unit/Unit';
import AutoCompleteTextField from '../AutoCompleteTextField';

export interface UnitFieldProps {
    label?: string;
    value: string | null;
    onChange: (value: string | null) => void;
    naked?: boolean;
    class?: UnitClass;
    size?: TextFieldProps['size'];
    plural?: boolean;
}

const UnitField = (props: UnitFieldProps): ReactElement => {
    const {
        label = 'Unit',
        value,
        onChange,
        naked = false,
        class: unitClass,
        size = 'medium',
        plural = true,
    } = props;

    const { data, error, loading } = useTinyUnits({
        variables: {
            filter: {
                skip: 0,
                take: 100,
            },
        },
    });

    const units = data
        ? data.units.items.map((i) => ({ ...i, label: i.english, id: i._id }))
        : [];

    const match = units.find((u) => u._id === value);

    const filtered = unitClass
        ? units.filter((u) => u.class === unitClass)
        : units;

    return (
        <Autocomplete
            fullWidth
            value={match || null}
            onChange={(e, val) => {
                onChange(val ? val._id : null);
            }}
            options={filtered}
            getOptionLabel={(d) =>
                d[plural ? 'english_plural' : 'english'] || ''
            }
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.id}>
                        {option.english}
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

export default UnitField;
