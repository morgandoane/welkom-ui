import { Avatar, Box, Button } from "@mui/material";
import { format } from "date-fns";
import React, { ReactElement } from "react";
import { MdChevronLeft, MdEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import AppFab from "../../../../../../components/AppFab";
import AppNav from "../../../../../../components/AppNav";
import Details from "../../../../../../components/Details";
import ColumnBox from "../../../../../../components/Layout/ColumnBox";
import PageTitle from "../../../../../../components/PageTitle";
import TabFade from "../../../../../../components/TabFade";
import { useProfile } from "../../../../../../graphql/queries/profiles/useProfile";
import { dateFormats } from "../../../../../../utils/dateFormats";

const ProfileDetail = (): ReactElement => {
  const { id } = useParams();
  const nav = useNavigate();

  const { data, error, loading } = useProfile({
    variables: {
      id: id || "",
    },
  });

  const profile = data ? data.profile : null;

  return (
    <AppNav error={error} loading={loading} discrete={false}>
      {profile && (
        <ColumnBox>
          {{
            header: (
              <Box>
                <Button
                  variant="text"
                  color="inherit"
                  startIcon={<MdChevronLeft />}
                  onClick={() => nav("/people/profiles")}
                >
                  Profiles
                </Button>
                <PageTitle
                  avatar={
                    <Avatar
                      src={profile.picture || ""}
                      alt={profile.given_name + " " + profile.family_name}
                    />
                  }
                >
                  {profile.given_name && profile.family_name
                    ? `${profile.given_name} ${profile.family_name}`
                    : profile.name}
                </PageTitle>
              </Box>
            ),
            content: (
              <TabFade>
                {{
                  Details: (
                    <Box sx={{ paddingTop: 3 }}>
                      <Details>
                        {[
                          { key: "Account name", value: profile.name },
                          { key: "Email", value: profile.email },
                          { key: "Given name", value: profile.given_name },
                          { key: "Family name", value: profile.family_name },
                          { key: "Role", value: profile.roles.join(", ") },
                          {
                            key: "Account blocked",
                            value: profile.blocked ? "Yes" : "No",
                          },
                          {
                            key: "Last login",
                            value: profile.last_login
                              ? format(
                                  new Date(profile.last_login),
                                  dateFormats.condensedDate
                                )
                              : "Never",
                          },
                          {
                            key: "Last password reset",
                            value: profile.last_password_reset
                              ? format(
                                  new Date(profile.last_password_reset),
                                  dateFormats.condensedDate
                                )
                              : "Never",
                          },
                          {
                            key: "Last IP Address",
                            value: profile.last_ip || "None",
                          },
                          {
                            key: "Email verified",
                            value: profile.email_verified ? "Yes" : "No",
                          },
                          {
                            key: "Unique identifier",
                            value: profile.user_id,
                          },
                        ]}
                      </Details>
                      <AppFab icon={<MdEdit />} onClick={() => nav("edit")}>
                        Edit
                      </AppFab>
                    </Box>
                  ),
                }}
              </TabFade>
            ),
          }}
        </ColumnBox>
      )}
    </AppNav>
  );
};

export default ProfileDetail;
