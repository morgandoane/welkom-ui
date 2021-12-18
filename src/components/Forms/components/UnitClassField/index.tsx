import { MenuItem, TextField } from "@mui/material";
import React, { ReactElement } from "react";
import { UnitClass } from "../../../../graphql/schema/Unit/Unit";

export interface UnitClassFieldProps {
  value: UnitClass;
  onChange: (val: UnitClass) => void;
  label: string;
  disabled?: boolean;
}

const UnitClassField = (props: UnitClassFieldProps): ReactElement => {
  const { value, onChange, label, disabled } = props;

  return (
    <TextField
      disabled={disabled}
      fullWidth
      value={value || ""}
      onChange={(e) => onChange(e.target.value as UnitClass)}
      label={label}
      select
    >
      <MenuItem disabled value={"_"}>
        Select a measurement
      </MenuItem>
      {Object.keys(UnitClass).map((key, index) => (
        <MenuItem value={key} key={"unitClassOption_" + index}>
          {key}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default UnitClassField;
