import { Box, Button } from "@mui/material";
import React, { ReactElement } from "react";
import {
  CreateLocationInput,
  UpdateLocationInput,
} from "../../../../graphql/schema/Location/LocationInput";
import CarefulButton from "../../CarefulButton";
import BooleanField from "../../components/BooleanField";
import FormRow from "../../components/FormRow";
import TextFormField from "../../components/TextFormField";

export type LocationFormProps =
  | {
      type: "create";
      value: CreateLocationInput;
      onChange: (value: CreateLocationInput) => void;
      onSubmit: (value: CreateLocationInput) => void;
    }
  | {
      type: "update";
      value: UpdateLocationInput;
      onChange: (value: UpdateLocationInput) => void;
      onSubmit: (value: UpdateLocationInput) => void;
    };

const LocationForm = (props: LocationFormProps): ReactElement => {
  return (
    <Box>
      <FormRow>
        <TextFormField
          label="Label"
          value={props.value.label || ""}
          onChange={(val) => {
            if (props.type === "create") {
              props.onChange({ ...props.value, label: val || "" });
            } else props.onChange({ ...props.value, label: val || "" });
          }}
        />
      </FormRow>
      <FormRow>
        <BooleanField
          label="Has address"
          value={Boolean(props.value.address)}
          onChange={(val) => {
            if (props.type === "create") {
              props.onChange({
                ...props.value,
                address:
                  val == true
                    ? {
                        line_1: "",
                        city: "",
                        state: "",
                        postal: "",
                        country: "",
                      }
                    : undefined,
              });
            } else
              props.onChange({
                ...props.value,
                address:
                  val == true
                    ? {
                        line_1: "",
                        city: "",
                        state: "",
                        postal: "",
                        country: "",
                      }
                    : undefined,
              });
          }}
        />
      </FormRow>
      <Box
        sx={{
          display: "flex",

          alignItems: "center",
        }}
      >
        {props.type === "update" && (
          <Box>
            <CarefulButton
              onClick={() => {
                if (props.type === "update") {
                  props.onChange({ ...props.value, deleted: true });
                  props.onSubmit({ ...props.value, deleted: true });
                }
              }}
            >
              Delete
            </CarefulButton>
          </Box>
        )}
        <Box sx={{ flex: 1 }} />
        <Box>
          <Button
            onClick={() => {
              if (props.type === "create") props.onSubmit(props.value);
              else props.onSubmit(props.value);
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LocationForm;
