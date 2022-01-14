import { Autocomplete, TextField } from '@mui/material';
import React, { ReactElement } from 'react';
import { useTinyProfiles } from '../../../../graphql/queries/profiles/useTinyProfiles';
import AutoCompleteTextField from '../AutoCompleteTextField';

export interface PersonFieldProps {
    label?: string;
    value: string | null;
    onChange: (value: string | null) => void;
    naked?: boolean;
}

const PersonField = (props: PersonFieldProps): ReactElement => {
    const { label = 'Person', value, onChange, naked = false } = props;

    const { data } = useTinyProfiles({
        variables: { filter: { skip: 0, take: 250 } },
    });

    const users = data
        ? data.profiles.items.map((i) => ({
              ...i,
              label: i.name,
              id: i.user_id,
          }))
        : [];

    return (
        <Autocomplete
            value={users.find((u) => u.user_id === value) || undefined}
            onChange={(e, val) => {
                onChange(val ? val.user_id : null);
            }}
            options={users}
            getOptionLabel={(d) => d.name}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.id}>
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
