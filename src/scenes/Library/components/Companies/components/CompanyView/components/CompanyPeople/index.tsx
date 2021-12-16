import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import { MdEdit } from "react-icons/md";
import AppFab from "../../../../../../../../components/AppFab";
import CarefulButton from "../../../../../../../../components/Forms/CarefulButton";
import BooleanField from "../../../../../../../../components/Forms/components/BooleanField";
import FormRow from "../../../../../../../../components/Forms/components/FormRow";
import TextFormField from "../../../../../../../../components/Forms/components/TextFormField";
import PanelHeader from "../../../../../../../../components/PanelComponents/PanelHeader";
import SideDrawer from "../../../../../../../../components/SideDrawer";
import { useStatefulContactMutation } from "../../../../../../../../graphql/mutations/contact/useStatefulContactMutation";
import { Company } from "../../../../../../../../graphql/schema/Company/Company";

export interface CompanyPeopleProps {
  company: Company;
}

const CompanyPeople = (props: CompanyPeopleProps): ReactElement => {
  const { company } = props;

  const { state, setState, result, reset, loading } =
    useStatefulContactMutation();

  return (
    <Box sx={{ maxWidth: 450, paddingTop: 2 }}>
      {company.contacts.map((contact) => (
        <Box key={"contactCard_" + contact._id} sx={{ padding: 2 }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Avatar>{contact.given_name[0] + contact.family_name[0]}</Avatar>
              <Box>
                <Typography>{`${contact.given_name} ${contact.family_name}`}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {contact.email || contact.phone || ""}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {contact.cc_on_order == true && contact.email_on_order == true
                    ? "Email and CC on orders"
                    : contact.cc_on_order == true
                    ? "CC on orders"
                    : contact.email_on_order == true
                    ? "email on orders"
                    : ""}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}></Box>
            <Box>
              <IconButton
                onClick={() =>
                  setState({
                    type: "update",
                    id: contact._id,
                    data: {
                      given_name: contact.given_name,
                      family_name: contact.family_name,
                      email: contact.email,
                      phone: contact.phone,
                      email_on_order: contact.email_on_order,
                      cc_on_order: contact.cc_on_order,
                    },
                  })
                }
              >
                <MdEdit />
              </IconButton>
            </Box>
          </Box>
        </Box>
      ))}
      <AppFab
        onClick={() => {
          setState({
            type: "create",
            company: company._id,
            data: { given_name: "", family_name: "" },
          });
        }}
      >
        New contact
      </AppFab>
      <SideDrawer
        loading={loading}
        error={result && result.success == false ? result.error : undefined}
        success={result && result.success == true ? "Contact saved" : undefined}
        onSuccess={() => {
          reset();
        }}
        resetError={<Button onClick={() => reset(true)}>Try again</Button>}
        open={state !== null && state.type !== "delete"}
        onClose={() => reset()}
      >
        <PanelHeader onClose={reset}>
          {state && state.type == "create" ? "New contact" : "Update contact"}
        </PanelHeader>
        <Box p={1}></Box>
        <FormRow>
          <TextFormField
            label="Given name"
            value={
              state && state.type !== "delete" ? state.data.given_name : ""
            }
            onChange={(val) => {
              if (state && state.type !== "delete") {
                setState({
                  ...state,
                  data: { ...state.data, given_name: val || "" },
                });
              }
            }}
          />
        </FormRow>
        <FormRow>
          <TextFormField
            label="Family name"
            value={
              state && state.type !== "delete" ? state.data.family_name : ""
            }
            onChange={(val) => {
              if (state && state.type !== "delete") {
                setState({
                  ...state,
                  data: { ...state.data, family_name: val || "" },
                });
              }
            }}
          />
        </FormRow>
        <FormRow>
          <TextFormField
            label="Email"
            value={
              state && state.type !== "delete" ? state.data.email || "" : ""
            }
            onChange={(val) => {
              if (state && state.type !== "delete") {
                setState({
                  ...state,
                  data: { ...state.data, email: val || "" },
                });
              }
            }}
          />
        </FormRow>
        <FormRow>
          <TextFormField
            label="Phone"
            value={
              state && state.type !== "delete" ? state.data.phone || "" : ""
            }
            onChange={(val) => {
              if (state && state.type !== "delete") {
                setState({
                  ...state,
                  data: { ...state.data, phone: val || "" },
                });
              }
            }}
          />
        </FormRow>
        <FormRow>
          <BooleanField
            label="Email on order"
            value={
              state && state.type !== "delete"
                ? state.data.email_on_order == undefined
                  ? false
                  : state.data.email_on_order
                : false
            }
            onChange={(val) => {
              if (state && state.type !== "delete") {
                setState({
                  ...state,
                  data: {
                    ...state.data,
                    email_on_order: val == null ? false : val,
                  },
                });
              }
            }}
          />
        </FormRow>
        <FormRow>
          <BooleanField
            label="CC on order"
            value={
              state && state.type !== "delete"
                ? state.data.cc_on_order == undefined
                  ? false
                  : state.data.cc_on_order
                : false
            }
            onChange={(val) => {
              if (state && state.type !== "delete") {
                setState({
                  ...state,
                  data: {
                    ...state.data,
                    cc_on_order: val == null ? false : val,
                  },
                });
              }
            }}
          />
        </FormRow>
        <Box sx={{ display: "flex" }}>
          <Box>
            {state && state.type == "update" && (
              <CarefulButton
                onClick={() => {
                  if (state) {
                    setState({ type: "delete", id: state.id, save: true });
                  }
                }}
              >
                Delete
              </CarefulButton>
            )}
          </Box>
          <Box sx={{ flex: 1 }} />
          <Box>
            <LoadingButton
              onClick={() => {
                if (state) {
                  setState({ ...state, save: true });
                }
              }}
              variant="contained"
              loading={loading}
              disabled={
                !state ||
                state.type == "delete" ||
                !state.data.family_name ||
                !state.data.given_name
              }
            >
              Save
            </LoadingButton>
          </Box>
        </Box>
      </SideDrawer>
    </Box>
  );
};

export default CompanyPeople;
