import { Autocomplete, TextField } from "@mui/material";
import React, { ReactElement } from "react";
import { useTinyProfiles } from "../../../../graphql/queries/profiles/useTinyProfiles";

export interface PersonFieldProps {
  label?: string;
  value: string | null;
  onChange: (value: string | null) => void;
}

const PersonField = (props: PersonFieldProps): ReactElement => {
  const { label = "Person", value, onChange } = props;

  const { data } = useTinyProfiles();
  const users = data
    ? data.profiles.items.map((i) => ({ ...i, label: i.name, id: i.user_id }))
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
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default PersonField;
