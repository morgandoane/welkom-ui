import { Box } from "@mui/material";
import React, { ReactElement } from "react";
import { Address } from "../../../../graphql/schema/Address/Address";
import FormRow from "../../components/FormRow";
import TextFormField from "../../components/TextFormField";

const labels: { [K in keyof Address]: string } = {
  line_1: "Line 1",
  line_2: "Line 2",
  city: "City",
  state: "State",
  postal: "Postal",
  country: "Country",
};

const AddressForm = (props: {
  address: Address;
  setAddress: (value: Address) => void;
}): ReactElement => {
  const { address, setAddress } = props;

  const getField = (key: keyof Address) => (
    <TextFormField
      label={labels[key] + ""}
      value={address[key] as string}
      onChange={(val) => setAddress({ ...address, [key]: val })}
    />
  );

  return (
    <Box>
      <FormRow>{getField("line_1")}</FormRow>
      <FormRow>{getField("line_2")}</FormRow>
      <FormRow>
        {getField("city")}
        {getField("state")}
      </FormRow>
      <FormRow>
        {getField("postal")}
        {getField("country")}
      </FormRow>
    </Box>
  );
};

export default AddressForm;
