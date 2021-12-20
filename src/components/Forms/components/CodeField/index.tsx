import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { ReactElement } from "react";
import { MdRefresh } from "react-icons/md";
import { useLazyCode } from "../../../../graphql/queries/code/useCode";
import { CodeType } from "../../../../graphql/schema/Code/Code";

export interface CodeFieldProps {
  type: CodeType;
  value: string;
  onChange: (value: string) => void;
}

const CodeField = (props: CodeFieldProps): ReactElement => {
  const { type, value, onChange } = props;

  const [obtain, { loading }] = useLazyCode({
    variables: { type },
    onCompleted: (data) => onChange(data.code.value),
  });

  const lables: Record<CodeType, string> = {
    PO: "PO number",
    BOL: "BOL number",
  };

  return (
    <TextField
      label={lables[type]}
      disabled
      value={value}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {loading ? (
              <CircularProgress sx={{ height: 40, width: 40 }} />
            ) : (
              <Tooltip title="Get code" arrow placement="top">
                <IconButton onClick={() => obtain()}>
                  <MdRefresh />
                </IconButton>
              </Tooltip>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CodeField;
