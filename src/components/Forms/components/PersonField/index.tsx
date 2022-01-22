import { Autocomplete, Box, TextField } from '@mui/material';
import React, { ReactElement } from 'react';
import { Permission } from '../../../../auth/Permission';
import { useTinyProfiles } from '../../../../graphql/queries/profiles/useTinyProfiles';
import AutoCompleteTextField from '../AutoCompleteTextField';

export interface PersonFieldProps {
    label?: string;
    value: string | null;
    onChange: (value: string | null) => void;
    naked?: boolean;
    has_permissions?: Permission[];
}

const PersonField = (props: PersonFieldProps): ReactElement => {
    const {
        label = 'Person',
        value,
        onChange,
        naked = false,
        has_permissions,
    } = props;

    const { data } = useTinyProfiles({
        variables: {
            filter: { skip: 0, take: 250, has_permissions, skip_sync: true },
        },
    });

    const users = data ? data.profiles.items : [];

    const user = users.find((u) => u.user_id == value) || null;

    return (
        <Autocomplete
            fullWidth
            value={user}
            onChange={(e, val) => {
                onChange(val ? val.user_id : null);
            }}
            options={users}
            getOptionLabel={(d) => d.name}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.user_id}>
                        {option.name}
                    </li>
                );
            }}
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

export default PersonField;
