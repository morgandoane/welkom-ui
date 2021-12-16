import { InputAdornment, TextField } from "@mui/material";
import React, { ReactElement } from "react";

export interface PercentageFieldProps {
  label: string;
  value: number | null;
  onChange: (val: number | null) => void;
}

const PercentageField = (props: PercentageFieldProps): ReactElement => {
  const { label, value, onChange } = props;

  return (
    <TextField
      InputProps={{
        startAdornment: <InputAdornment position="start">%</InputAdornment>,
      }}
      value={value == null ? "" : Math.round((value || 0) / 100)}
      onChange={(e) => {
        if (!e.target.value) onChange(null);
        else onChange(Math.round(parseFloat(e.target.value) * 100));
      }}
      label={label}
      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
    />
  );
};

export default PercentageField;
