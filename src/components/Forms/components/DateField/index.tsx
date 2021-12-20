import { DesktopDatePicker, MobileDatePicker } from "@mui/lab";
import { TextField, useMediaQuery, useTheme } from "@mui/material";
import React, { ReactElement } from "react";

export interface DateFieldProps {
  value: Date | null;
  onChange: (val: Date | null) => void;
  label?: string;
  min?: Date;
  max?: Date;
}

const DateField = (props: DateFieldProps): ReactElement => {
  const { value, onChange, label = "Date", min, max } = props;
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  const Comp = small ? MobileDatePicker : DesktopDatePicker;

  return (
    <Comp
      label={label}
      inputFormat="MM/dd/yyyy"
      value={value}
      minDate={min}
      maxDate={max}
      onChange={(val) => onChange(val)}
      renderInput={(params) => <TextField {...params} fullWidth />}
    />
  );
};

export default DateField;
