import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import { format } from "date-fns";
import React, { ReactElement } from "react";
import { MdChevronLeft, MdEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUiPermissions,
  UiPermission,
} from "../../../../../../auth/UiPermission";
import AppFab from "../../../../../../components/AppFab";
import AppNav from "../../../../../../components/AppNav";
import Details from "../../../../../../components/Details";
import ColumnBox from "../../../../../../components/Layout/ColumnBox";
import PageTitle from "../../../../../../components/PageTitle";
import TabFade from "../../../../../../components/TabFade";
import { useTeam } from "../../../../../../graphql/queries/team/useTeam";
import { dateFormats } from "../../../../../../utils/dateFormats";

const Team = (): ReactElement => {
  const nav = useNavigate();

  const { id } = useParams();

  const { data, error, loading } = useTeam({
    variables: {
      id: id || "",
    },
  });

  const team = data ? data.team : null;

  const uiPermissions: UiPermission[] = data
    ? getUiPermissions(data.team.permissions)
    : [];

  return (
    <AppNav discrete={false} loading={loading} error={error}>
      {team && (
        <ColumnBox>
          {{
            header: (
              <Box>
                <Button
                  startIcon={<MdChevronLeft />}
                  variant="text"
                  color="inherit"
                  onClick={() => {
                    nav("/people/teams");
                  }}
                >
                  Teams
                </Button>
                <PageTitle>{team.name}</PageTitle>
              </Box>
            ),
            content: (
              <Box sx={{ height: "100%" }}>
                <TabFade>
                  {{
                    ["Team details"]: (
                      <Box sx={{ paddingTop: 3 }}>
                        <Details gap={4}>
                          {[
                            { key: "Name", value: team.name },
                            {
                              key: "Created by",
                              value: team.created_by.name,
                            },
                            {
                              key: "Date created",
                              value: format(
                                new Date(team.date_created),
                                dateFormats.condensedDate
                              ),
                            },
                            {
                              key: "Last modified by",
                              value: !team.modified_by
                                ? "-"
                                : team.modified_by.name,
                            },
                            {
                              key: "Date modified",
                              value: !team.date_modified
                                ? "Never"
                                : format(
                                    new Date(team.date_modified),
                                    dateFormats.condensedDate
                                  ),
                            },
                          ]}
                        </Details>
                      </Box>
                    ),
                    Members: (
                      <Box>
                        <List>
                          {team.members.map((member) => (
                            <ListItem divider key={member.user_id}>
                              <ListItemText
                                primary={member.name}
                                secondary={member.email}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    ),
                    Permissions: (
                      <Box>
                        <List>
                          {uiPermissions.map((permission) => (
                            <ListItem divider key={permission.name}>
                              <ListItemText
                                primary={permission.name}
                                secondary={permission.description}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    ),
                  }}
                </TabFade>
                <AppFab
                  icon={<MdEdit />}
                  onClick={() => {
                    nav("edit");
                  }}
                >
                  Edit
                </AppFab>
              </Box>
            ),
          }}
        </ColumnBox>
      )}
    </AppNav>
  );
};

export default Team;
