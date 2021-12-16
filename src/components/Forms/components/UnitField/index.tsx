import { Autocomplete, TextField } from "@mui/material";
import React, { ReactElement } from "react";
import { useTinyUnits } from "../../../../graphql/queries/units/useTinyUnits";

export interface UnitFieldProps {
  label?: string;
  value: string | null;
  onChange: (value: string | null) => void;
}

const UnitField = (props: UnitFieldProps): ReactElement => {
  const { label = "Unit", value, onChange } = props;

  const { data, error, loading } = useTinyUnits();

  const units = data
    ? data.units.items.map((i) => ({ ...i, label: i.english, id: i._id }))
    : [];

  return (
    <Autocomplete
      value={units.find((u) => u._id === value) || undefined}
      onChange={(e, val) => {
        onChange(val ? val._id : null);
      }}
      options={units}
      getOptionLabel={(d) => d.english}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.english}
          </li>
        );
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default UnitField;
