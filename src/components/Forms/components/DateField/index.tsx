import { DesktopDatePicker, MobileDatePicker } from "@mui/lab";
import {
  TextField,
  TextFieldProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { ReactElement } from "react";

export interface DateFieldProps {
  value: Date | null;
  onChange: (val: Date | null) => void;
  label?: string;
  min?: Date;
  max?: Date;
  naked?: boolean;
}

const DateField = (props: DateFieldProps): ReactElement => {
  const { value, onChange, label = "Date", min, max, naked = false } = props;
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  const Comp = small ? MobileDatePicker : DesktopDatePicker;

  return (
    <Comp
      label={naked ? undefined : label}
      inputFormat="MM/dd/yyyy"
      value={value}
      minDate={min}
      maxDate={max}
      onChange={(val) => onChange(val)}
      renderInput={(params) => (
        <TextField
          {...({
            ...params,
            ...(naked
              ? {
                  placeholder: label,
                  variant: "standard",
                  InputProps: {
                    ...params.InputProps,
                    disableUnderline: true,
                  },
                }
              : {}),
          } as TextFieldProps)}
          fullWidth
        />
      )}
    />
  );
};

export default DateField;
