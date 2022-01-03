import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { ReactElement } from "react";
import { MdRefresh } from "react-icons/md";
import { isUnionTypeNode } from "typescript";
import {
  CodeRes,
  useCode,
  useLazyCode,
} from "../../../../graphql/queries/code/useCode";
import { CodeType } from "../../../../graphql/schema/Code/Code";
import { OperationResult } from "../../../../graphql/types";

export interface CodeFieldProps {
  type: CodeType;
  value: string;
  onChange: (value: string) => void;
  naked?: boolean;
}

const CodeField = (props: CodeFieldProps): ReactElement => {
  const { type, value, onChange, naked = false } = props;

  // false = static
  // true = fetch
  // result
  const [state, setState] = React.useState<boolean | OperationResult<CodeRes>>(
    false
  );

  React.useEffect(() => {
    if (state !== false && state !== true && state.success == true) {
      onChange(state.data.code.value);
      setState(false);
    }
  }, [state, onChange]);

  const { loading } = useCode({
    variables: { type },
    skip: state !== true,
    onCompleted: (data) => setState({ success: true, data }),
    onError: (error) => setState({ success: false, error }),
    fetchPolicy: "network-only",
  });

  const lables: Record<CodeType, string> = {
    PO: "PO number",
    BOL: "BOL number",
    ITIN: "Itinerary number",
  };

  return (
    <TextField
      fullWidth
      label={!naked ? lables[type] : undefined}
      placeholder={naked ? lables[type] : undefined}
      variant={naked ? "standard" : undefined}
      disabled
      value={value}
      InputProps={{
        disableUnderline: naked,
        endAdornment: (
          <InputAdornment position="end">
            {loading ? (
              <CircularProgress sx={{ height: 40, width: 40 }} />
            ) : (
              <Tooltip title="Get code" arrow placement="top">
                <IconButton
                  disabled={state !== false}
                  onClick={() => setState(true)}
                >
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
