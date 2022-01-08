import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";
import React, { ReactElement } from "react";
import { MdCheck, MdChevronLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { UserRole } from "../../../../../../auth/UserRole";
import AppNav from "../../../../../../components/AppNav";
import FormRow from "../../../../../../components/Forms/components/FormRow";
import RoleField from "../../../../../../components/Forms/components/RoleField";
import TextFormField from "../../../../../../components/Forms/components/TextFormField";
import ColumnBox from "../../../../../../components/Layout/ColumnBox";
import Message from "../../../../../../components/Message";
import PageTitle from "../../../../../../components/PageTitle";
import {
  CreateProfileInput,
  CreateProfileRes,
  useProfileCreation,
} from "../../../../../../graphql/mutations/profiles/useProfileCreation";
import {
  UpdateProfileInput,
  UpdateProfileRes,
  useProfileUpdate,
} from "../../../../../../graphql/mutations/profiles/useProfileUpdate";
import {
  ProfileQuery,
  useProfile,
} from "../../../../../../graphql/queries/profiles/useProfile";
import { ProfilesQuery } from "../../../../../../graphql/queries/profiles/useProfiles";
import { OperationResult } from "../../../../../../graphql/types";

const ProfileForm = (): ReactElement => {
  const nav = useNavigate();
  const { id } = useParams();

  const [state, setState] = React.useState<
    | ({ _type: "update" } & UpdateProfileInput)
    | ({ _type: "create" } & CreateProfileInput)
  >({
    _type: "create",
    given_name: "",
    family_name: "",
    email: "",
    phone_number: "",
    temporary_password: "",
    role: UserRole.User,
  });

  const [result, setResult] = React.useState<null | OperationResult<
    CreateProfileRes | UpdateProfileRes
  >>(null);

  const [create, { loading: createLoading }] = useProfileCreation({
    onCompleted: (data) => setResult({ success: true, data }),
    onError: (error) => setResult({ success: false, error }),
    variables:
      state._type == "create"
        ? {
            data: {
              given_name: state.given_name,
              family_name: state.family_name,
              email: state.email,
              phone_number: state.phone_number,
              temporary_password: state.temporary_password,
              role: state.role,
            },
          }
        : undefined,
    refetchQueries: [ProfileQuery, ProfilesQuery],
  });

  const [update, { loading: updateLoading }] = useProfileUpdate({
    onCompleted: (data) => setResult({ success: true, data }),
    onError: (error) => setResult({ success: false, error }),
    variables:
      state._type == "update"
        ? {
            id: id || "",
            data: {
              given_name: state.given_name || "",
              family_name: state.family_name || "",
              email: state.email || "",
              phone_number: state.phone_number,
              role: state.role,
            },
          }
        : undefined,
    refetchQueries: [ProfileQuery, ProfilesQuery],
  });

  const submit = () => {
    if (state._type == "create") create();
    else update();
  };

  const { data, error, loading } = useProfile({
    variables: {
      id: id || "",
    },
    skip: !id,
    onCompleted: ({
      profile: { roles, given_name, family_name, email, phone_number },
    }) => {
      setState({
        _type: "update",
        given_name: given_name || "",
        family_name: family_name || "",
        email: email || "",
        phone_number: phone_number || "",
        role: roles[0],
      });
    },
  });

  const profile = data ? data.profile : null;

  return (
    <AppNav error={error} loading={loading}>
      {result && result.success ? (
        <Message
          type="Success"
          message={id ? "Profile updated" : "Profile created"}
          onComplete={() =>
            nav(
              "/people/profiles/" +
                ("createProfile" in result.data
                  ? result.data.createProfile.user_id
                  : result.data.updateProfile.user_id)
            )
          }
        />
      ) : result ? (
        <Message
          type="Warning"
          message={result.error.message}
          action={<Button onClick={() => setResult(null)}>Try again</Button>}
        />
      ) : (
        <ColumnBox>
          {{
            header: (
              <Box>
                <Button
                  onClick={() => nav("/people/profiles/" + (id ? id : ""))}
                  startIcon={<MdChevronLeft />}
                  variant="text"
                  color="inherit"
                >
                  {profile
                    ? profile.given_name && profile.family_name
                      ? `${profile.given_name} ${profile.family_name}`
                      : profile.name
                    : "Profiles"}
                </Button>
                <PageTitle>{id ? "Update profile" : "CreateProfile"}</PageTitle>
              </Box>
            ),
            content: (
              <Box sx={{ maxWidth: 400 }}>
                <FormRow>
                  <TextFormField
                    label="Given name"
                    value={state.given_name || ""}
                    onChange={(val) =>
                      setState({ ...state, given_name: val || "" })
                    }
                  />
                </FormRow>
                <FormRow>
                  <TextFormField
                    label="Family name"
                    value={state.family_name || ""}
                    onChange={(val) =>
                      setState({ ...state, family_name: val || "" })
                    }
                  />
                </FormRow>
                <FormRow>
                  <TextFormField
                    label="Email"
                    value={state.email || ""}
                    onChange={(val) => setState({ ...state, email: val || "" })}
                  />
                </FormRow>
                <FormRow>
                  <TextFormField
                    label="Phone Number"
                    value={state.phone_number || ""}
                    onChange={(val) =>
                      setState({ ...state, phone_number: val || "" })
                    }
                  />
                </FormRow>
                {state._type == "create" && (
                  <FormRow>
                    <TextFormField
                      label="Temporary password"
                      value={state.temporary_password || ""}
                      onChange={(val) =>
                        setState({ ...state, temporary_password: val || "" })
                      }
                    />
                  </FormRow>
                )}
                <FormRow>
                  <RoleField
                    value={state.role}
                    onChange={(role) => {
                      if (role) setState({ ...state, role });
                    }}
                  />
                </FormRow>
              </Box>
            ),
            footer: (
              <Box>
                <LoadingButton
                  onClick={submit}
                  loading={createLoading || updateLoading}
                  endIcon={<MdCheck />}
                  size="large"
                  color="primary"
                  variant="contained"
                >
                  Save profile
                </LoadingButton>
              </Box>
            ),
          }}
        </ColumnBox>
      )}
    </AppNav>
  );
};

export default ProfileForm;
