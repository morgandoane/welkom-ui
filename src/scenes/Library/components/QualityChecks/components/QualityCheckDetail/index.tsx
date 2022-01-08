import { Box, Button, Typography } from "@mui/material";
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
import { useQualityCheck } from "../../../../../../graphql/queries/qualityCheck/useQualityCheck";
import { PromptType } from "../../../../../../graphql/schema/Prompt/Prompt";
import { dateFormats } from "../../../../../../utils/dateFormats";

const QualityCheckDetail = (): ReactElement => {
  const { id } = useParams();
  const nav = useNavigate();

  const { data, error, loading } = useQualityCheck({
    variables: { id: id || "" },
    skip: !id,
  });

  const check = data ? data.qualityCheck : null;

  const getDetails = (): { key: string; value: string }[] => {
    const res: { key: string; value: string }[] = [];

    if (check) {
      if (
        check.prompt.type === PromptType.Boolean &&
        check.prompt.valid_boolean !== undefined
      ) {
        res.push({
          key: "Validation",
          value: `Only a '${
            check.prompt.valid_boolean ? "Yes" : "No"
          }' response is acceptable.`,
        });
      } else if (
        check.prompt.type === PromptType.Number &&
        check.prompt.valid_range !== undefined &&
        check.prompt.valid_range !== null
      ) {
        res.push({
          key: "Validation",
          value: `${check.prompt.valid_range.min}-${check.prompt.valid_range.max} is acceptable.`,
        });
      }
    }

    return res;
  };

  return (
    <AppNav error={error} loading={loading}>
      {check && (
        <ColumnBox>
          {{
            header: (
              <Box>
                <Button
                  variant="text"
                  color="inherit"
                  startIcon={<MdChevronLeft />}
                  onClick={() => nav("/library/qualitychecks")}
                >
                  Quality checks
                </Button>
                <PageTitle>
                  {[
                    check.prompt.phrase,
                    `Quality Check on ${check.item.english}`,
                  ]}
                </PageTitle>
              </Box>
            ),
            content: (
              <TabFade>
                {{
                  Details: (
                    <Box sx={{ paddingTop: 3 }}>
                      <Details gap={4}>
                        {[
                          {
                            key: "Type",
                            value: check.prompt.type,
                          },
                          ...getDetails(),
                          {
                            key: "Created by",
                            value: check.created_by.name,
                          },
                          {
                            key: "Date created",
                            value: format(
                              new Date(check.date_created),
                              dateFormats.condensedDate
                            ),
                          },
                          {
                            key: "Last modified by",
                            value: !check.modified_by
                              ? "-"
                              : check.modified_by.name,
                          },
                          {
                            key: "Date modified",
                            value: !check.date_modified
                              ? "Never"
                              : format(
                                  new Date(check.date_modified),
                                  dateFormats.condensedDate
                                ),
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

export default QualityCheckDetail;
