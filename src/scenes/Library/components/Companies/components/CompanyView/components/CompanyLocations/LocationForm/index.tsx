import React, { ReactElement } from "react";
import SideDrawer from "../../../../../../../../../components/SideDrawer";
import {
  CreateLocationArgs,
  CreateLocationRes,
} from "../../../../../../../../../graphql/mutations/location/useLocationCreation";
import {
  UpdateLocationArgs,
  UpdateLocationRes,
} from "../../../../../../../../../graphql/mutations/location/useLocationUpdate";
import { OperationResult } from "../../../../../../../../../graphql/types";
import FormRow from "../../../../../../../../../components/Forms/components/FormRow";
import TextFormField from "../../../../../../../../../components/Forms/components/TextFormField";
import BooleanField from "../../../../../../../../../components/Forms/components/BooleanField";
import { Box, Collapse, Tooltip } from "@mui/material";
import CarefulButton from "../../../../../../../../../components/Forms/CarefulButton";
import { LoadingButton } from "@mui/lab";
import AddressForm from "../../../../../../../../../components/Forms/entites/AddressForm";
import PanelHeader from "../../../../../../../../../components/PanelComponents/PanelHeader";
import { Company } from "../../../../../../../../../graphql/schema/Company/Company";

export interface LocationFormProps {
  state:
    | ({ type: "create" } & CreateLocationArgs)
    | ({ type: "update" } & UpdateLocationArgs)
    | null;
  onSubmit: (
    data:
      | ({ type: "create" } & CreateLocationArgs)
      | ({ type: "update" } & UpdateLocationArgs)
  ) => void;
  loading: boolean;
  error?: Error;
  result: OperationResult<CreateLocationRes | UpdateLocationRes> | null;
  setResult: (
    result: OperationResult<CreateLocationRes | UpdateLocationRes> | null
  ) => void;
  company: Company;
  onSuccess: () => void;
  setState: (
    data:
      | ({ type: "create" } & CreateLocationArgs)
      | ({ type: "update" } & UpdateLocationArgs)
      | null
  ) => void;
}

const LocationForm = (props: LocationFormProps): ReactElement => {
  const {
    state,
    loading,
    error,
    result,
    onSubmit,
    onSuccess,
    setState,
    setResult,
    company,
  } = props;

  const onClose = (success?: true) => {
    setState(null);
    setResult(null);
    onSuccess();
  };

  const getHoldup = (): string | null => {
    if (!state) return null;
    if (!state.data.address) {
      if (!state.data.label) return "Label or address is required.";
    }
    if (state.data.address) {
      const { line_1, city, state: st, postal, country } = state.data.address;

      if (!line_1 || line_1 == "") return "Line 1 required";
      if (!city || city == "") return "City required";
      if (!st || st == "") return "";
      if (!postal || postal == "") return "Postal required";
      if (!country || country == "") return "Country required";
    }
    return null;
  };

  const holdup = getHoldup();

  return (
    <SideDrawer
      open={Boolean(state)}
      onClose={onClose}
      error={error}
      loading={loading}
      success={result && result.success == true ? "Location saved" : undefined}
      onSuccess={onClose}
    >
      <PanelHeader onClose={onClose}>
        {!state || state.type == "create"
          ? `New ${company.name} location`
          : `Update location`}
      </PanelHeader>
      <FormRow>
        <TextFormField
          label="Label"
          value={state ? state.data.label || "" : ""}
          onChange={(val) => {
            if (state) {
              if (state.type == "create")
                setState({
                  ...state,
                  data: { ...state.data, label: val || "" },
                });
              else
                setState({
                  ...state,
                  data: { ...state.data, label: val || "" },
                });
            }
          }}
        />
      </FormRow>
      <FormRow>
        <BooleanField
          label="Has address"
          value={state !== null && Boolean(state.data.address)}
          onChange={(val) => {
            if (state) {
              if (val === true) {
                if (state.type == "create")
                  setState({
                    ...state,
                    data: {
                      ...state.data,
                      address: {
                        line_1: "",
                        city: "",
                        state: "",
                        postal: "",
                        country: "",
                      },
                    },
                  });
                else
                  setState({
                    ...state,
                    data: {
                      ...state.data,
                      address: {
                        line_1: "",
                        city: "",
                        state: "",
                        postal: "",
                        country: "",
                      },
                    },
                  });
              } else {
                if (state.type == "create")
                  setState({
                    ...state,
                    data: { ...state.data, address: null },
                  });
                else
                  setState({
                    ...state,
                    data: { ...state.data, address: null },
                  });
              }
            }
          }}
        />
      </FormRow>
      <Collapse in={Boolean(state && state.data.address)}>
        <AddressForm
          setAddress={(address) => {
            if (state) {
              if (state.type == "create")
                setState({ ...state, data: { ...state.data, address } });
              else setState({ ...state, data: { ...state.data, address } });
            }
          }}
          address={
            state && state.data.address
              ? state.data.address
              : {
                  line_1: "",
                  line_2: "",
                  city: "",
                  state: "",
                  postal: "",
                  country: "",
                }
          }
        />
      </Collapse>
      <Box sx={{ display: "flex" }}>
        {state && state.type == "update" && (
          <Box sx={{ flex: 1 }}>
            <CarefulButton
              disabled={loading}
              onClick={() => {
                if (state && state.type == "update") {
                  const copy = { ...state };
                  copy.data.deleted = true;
                  setState(copy);
                  onSubmit(copy);
                }
              }}
            >
              Delete
            </CarefulButton>
          </Box>
        )}
        <Box sx={{ flex: 1 }} />
        <Tooltip title={getHoldup() || ""} arrow>
          <Box>
            <LoadingButton
              disabled={Boolean(getHoldup())}
              variant="contained"
              loading={loading}
              onClick={() => {
                if (state) {
                  onSubmit(state);
                }
              }}
            >
              Save
            </LoadingButton>
          </Box>
        </Tooltip>
      </Box>
    </SideDrawer>
  );
};

export default LocationForm;
