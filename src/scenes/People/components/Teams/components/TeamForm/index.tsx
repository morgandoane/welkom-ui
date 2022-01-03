import { LoadingButton } from "@mui/lab";
import { Box, Button, Collapse, Tooltip } from "@mui/material";
import React, { ReactElement } from "react";
import { MdCheck, MdChevronLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { UiPermissions } from "../../../../../../auth/UiPermission";
import AppNav from "../../../../../../components/AppNav";
import ButtonToggle from "../../../../../../components/ButtonToggle";
import CompanyField from "../../../../../../components/Forms/components/CompanyField";
import FormRow from "../../../../../../components/Forms/components/FormRow";
import LocationField from "../../../../../../components/Forms/components/LocationField";
import TextFormField from "../../../../../../components/Forms/components/TextFormField";
import ColumnBox from "../../../../../../components/Layout/ColumnBox";
import ListSelect from "../../../../../../components/ListSelect";
import PageTitle from "../../../../../../components/PageTitle";
import {
  UpdateTeamRes,
  useTeamUpdate,
} from "../../../../../../graphql/mutations/team/useTeamUpdate";
import {
  CreateTeamRes,
  useTeamCreation,
} from "../../../../../../graphql/mutations/team/useTeamCreation";
import { useTinyProfiles } from "../../../../../../graphql/queries/profiles/useTinyProfiles";
import { useTeam } from "../../../../../../graphql/queries/team/useTeam";
import {
  CreateTeamInput,
  UpdateTeamInput,
} from "../../../../../../graphql/schema/Team/TeamInput";
import { OperationResult } from "../../../../../../graphql/types";
import Message from "../../../../../../components/Message";

const TeamForm = (): ReactElement => {
  const nav = useNavigate();

  const { id } = useParams();

  const { data: profileData } = useTinyProfiles({
    variables: {
      filter: {
        skip: 0,
        take: 200,
      },
    },
  });

  const users = profileData ? profileData.profiles.items : [];

  const [state, setState] = React.useState<
    | ({ _type: "create" } & CreateTeamInput)
    | ({ _type: "update" } & UpdateTeamInput)
  >({
    _type: "create",
    name: "",
    description: "",
    company: "",
    members: [],
    location: "",
    permissions: [],
  });

  const { data, error, loading } = useTeam({
    variables: {
      id: id || "",
    },
    skip: !id || id == "",
    onCompleted: ({
      team: { name, description, company, members, location, permissions },
    }) => {
      setState({
        _type: "update",
        name,
        description: description || undefined,
        company: company._id,
        members: members.map((m) => m.user_id),
        location: location ? location._id : undefined,
        permissions,
      });
    },
  });

  const [result, setResult] = React.useState<OperationResult<
    CreateTeamRes | UpdateTeamRes
  > | null>(null);

  const [create, { loading: createLoading }] = useTeamCreation({
    onCompleted: (data) => setResult({ success: true, data }),
    onError: (error) => setResult({ success: false, error }),
    variables:
      state._type == "create"
        ? {
            data: {
              name: state.name,
              company: state.company,
              description: state.description,
              location: state.location,
              permissions: state.permissions,
              members: state.members,
            },
          }
        : undefined,
  });

  const [update, { loading: updateLoading }] = useTeamUpdate({
    onCompleted: (data) => setResult({ success: true, data }),
    onError: (error) => setResult({ success: false, error }),
    variables:
      state._type == "update"
        ? {
            id: id || "",
            data: {
              name: state.name,
              company: state.company,
              description: state.description,
              location: state.location,
              permissions: state.permissions,
              members: state.members,
            },
          }
        : undefined,
  });

  const submit = () => {
    if (state._type === "create") {
      create();
    } else {
      update();
    }
  };

  const gap = 3;

  const getHoldup = (): string | null => {
    if (!state.name || state.name == "") return "Please provide a team name";
    if (!state.company || state.company == "")
      return "Please specify a company";
    if (state.location == "")
      return "Please specify a location, or set to 'Any'";
    return null;
  };

  const holdup = getHoldup();

  return (
    <AppNav discrete={false} loading={loading} error={error}>
      {result && result.success ? (
        <Message
          type="Success"
          message={
            "createTeam" in result.data
              ? "Company created!"
              : result.data.updateTeam.deleted
              ? "Company deleted"
              : "Company updated!"
          }
          onComplete={() => {
            if ("createTeam" in result.data) {
              nav(`/people/teams/${result.data.createTeam._id}`);
            } else {
              nav(`/people/teams/${result.data.updateTeam._id}`);
            }
          }}
        />
      ) : result ? (
        <Message
          type="Error"
          message={result.error.message}
          action={<Button onClick={() => setResult(null)}>Try again</Button>}
        />
      ) : (
        <ColumnBox>
          {{
            header: (
              <Box>
                <Button
                  startIcon={<MdChevronLeft />}
                  variant="text"
                  color="inherit"
                  onClick={() => {
                    nav(
                      data ? `/people/teams/${data.team._id}` : "/people/teams"
                    );
                  }}
                >
                  {data ? data.team.name : "Teams"}
                </Button>
                <PageTitle>
                  {state._type == "create" ? "Create team" : "Update team"}
                </PageTitle>
              </Box>
            ),
            content: (
              <Box sx={{ maxWidth: 440, padding: 0.5 }}>
                <FormRow gap={gap}>
                  <TextFormField
                    label="Name"
                    value={state.name || ""}
                    onChange={(val) => {
                      setState({ ...state, name: val || "" });
                    }}
                  />
                </FormRow>
                <FormRow gap={gap}>
                  <TextFormField
                    label="Description"
                    value={state.description || ""}
                    onChange={(val) => {
                      setState({ ...state, description: val || "" });
                    }}
                  />
                </FormRow>
                <FormRow gap={gap}>
                  <CompanyField
                    label="Company"
                    value={state.company || ""}
                    onChange={(val) => {
                      setState({ ...state, company: val || "" });
                    }}
                  />
                </FormRow>
                <FormRow gap={gap}>
                  <Box
                    sx={{
                      minWidth: 200,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ButtonToggle
                      options={[
                        { id: "0", label: "Specific Location" },
                        { id: "1", label: "Any" },
                      ]}
                      value={
                        state.location !== undefined
                          ? { id: "0", label: "Specific Location" }
                          : { id: "1", label: "Any" }
                      }
                      onChange={(val) => {
                        setState({
                          ...state,
                          location:
                            val.id === "0" ? state.location || "" : undefined,
                        });
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Collapse in={state.location !== undefined}>
                      <LocationField
                        company={state.company || ""}
                        label="Location"
                        value={state.location || ""}
                        onChange={(val) => {
                          setState({ ...state, location: val || undefined });
                        }}
                      />
                    </Collapse>
                  </Box>
                </FormRow>
                <FormRow gap={gap}>
                  <Box sx={{ flex: 1 }}>
                    <ListSelect
                      label="Members"
                      multiple
                      options={users}
                      textProps={(user) => ({
                        primary: user.name,
                        secondary: user.email,
                      })}
                      value={users.filter(
                        (u) =>
                          state.members && state.members.includes(u.user_id)
                      )}
                      onChange={(val) => {
                        setState({
                          ...state,
                          members: val.map((v) => v.user_id),
                        });
                      }}
                    />
                  </Box>
                </FormRow>
                <FormRow gap={gap}>
                  <Box sx={{ flex: 1 }}>
                    <ListSelect
                      label="Permissions"
                      multiple
                      options={UiPermissions}
                      textProps={(permission) => ({
                        primary: permission.name,
                        secondary: permission.description,
                      })}
                      value={UiPermissions.filter(
                        (u) =>
                          state.permissions &&
                          u.permissions.every(
                            (p) =>
                              state.permissions && state.permissions.includes(p)
                          )
                      )}
                      onChange={(val) => {
                        const permissions = [
                          ...new Set(
                            val.map((ui) => [...ui.permissions]).flat()
                          ),
                        ];

                        setState({ ...state, permissions });
                      }}
                    />
                  </Box>
                </FormRow>
              </Box>
            ),
            footer: (
              <Box sx={{ display: "flex" }}>
                <Tooltip title={holdup || ""} placement="top" arrow>
                  <Box>
                    <LoadingButton
                      onClick={submit}
                      loading={createLoading || updateLoading}
                      disabled={Boolean(holdup)}
                      variant="contained"
                      size="large"
                      endIcon={<MdCheck />}
                    >
                      Save
                    </LoadingButton>
                  </Box>
                </Tooltip>
                <Box />
              </Box>
            ),
          }}
        </ColumnBox>
      )}
    </AppNav>
  );
};

export default TeamForm;
