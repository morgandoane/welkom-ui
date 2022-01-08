import { Box, Button, Popover, Typography, useTheme } from "@mui/material";
import { format } from "date-fns";
import React, { ReactElement } from "react";
import { BsBoxSeam } from "react-icons/bs";
import { MdCheckCircle, MdChevronLeft, MdEdit } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import AppFab from "../../../../../../components/AppFab";
import AppNav from "../../../../../../components/AppNav";
import Details from "../../../../../../components/Details";
import { VerificationIcon } from "../../../../../../components/Forms/VerificationForm";
import ColumnBox from "../../../../../../components/Layout/ColumnBox";
import PageTitle from "../../../../../../components/PageTitle";
import TabFade from "../../../../../../components/TabFade";
import { useFulfillment } from "../../../../../../graphql/queries/fulfillment/useFulfillment";
import { FulfillmentType } from "../../../../../../graphql/schema/Fulfillment/Fulfillment";
import { useClickState } from "../../../../../../hooks/useClickState";
import { dateFormats } from "../../../../../../utils/dateFormats";
import FulfillmentAttachments from "./components/FulfillmentAttachments";
import FulfillmentVerification from "./components/FulfillmentVerification";

const FulfillmentDetail = (): ReactElement => {
  const nav = useNavigate();
  const { palette } = useTheme();

  const [clickState, setClickState] = useClickState();

  const { fulfillment_id } = useParams();

  const { data, error, loading, refetch } = useFulfillment({
    variables: {
      id: fulfillment_id || "",
    },
  });

  const fulfillment = data ? data.fulfillment : null;

  const open = Boolean(clickState);
  const id = open ? "simple-popover" : undefined;

  return (
    <AppNav error={error} loading={loading}>
      {fulfillment && (
        <ColumnBox>
          {{
            header: (
              <Box>
                <Button
                  variant="text"
                  color="inherit"
                  startIcon={<MdChevronLeft />}
                  onClick={() =>
                    nav(
                      !fulfillment
                        ? ""
                        : fulfillment.type == FulfillmentType.Receipt
                        ? "/warehouse/receiving"
                        : "/warehouse/shipping"
                    )
                  }
                >
                  {!fulfillment
                    ? ""
                    : fulfillment.type == FulfillmentType.Receipt
                    ? "Receiving"
                    : "Shipping"}
                </Button>
                <PageTitle
                  avatar={
                    fulfillment.verification ? (
                      <Box sx={{ display: "flex", fontSize: "2.5rem" }}>
                        <VerificationIcon
                          status={fulfillment.verification.status}
                        />
                      </Box>
                    ) : undefined
                  }
                >
                  {[fulfillment.type, "against " + fulfillment.bol.code]}
                </PageTitle>
              </Box>
            ),
            content: (
              <TabFade>
                {{
                  Contents: (
                    <Box sx={{ paddingTop: 3 }}>
                      <Typography
                        sx={{ maxWidth: 480 }}
                      >{`This ${fulfillment.type.toLowerCase()} contains ${
                        fulfillment.lots.length
                      } lot${
                        fulfillment.lots.length == 1 ? "" : "s"
                      }. Each lot inside a ${fulfillment.type.toLowerCase()} may contain fragments of other lots, grouped together by item.`}</Typography>
                      <Box sx={{ paddingTop: 2, maxWidth: 600 }}>
                        {fulfillment.lots.map((lot) => (
                          <Box
                            key={lot._id}
                            sx={{
                              display: "flex",
                              flexFlow: "row",
                              alignItems: "center",
                              gap: 3,
                              padding: 2,
                              borderBottom: `1px solid ${palette.divider}`,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                fontSize: "3rem",
                                color: palette.text.secondary,
                              }}
                            >
                              <BsBoxSeam />
                            </Box>
                            <Box>
                              <Typography variant="h6">
                                {lot.item.english}
                              </Typography>
                              <Typography color="textSecondary">
                                {`${lot.code} - contains ${
                                  lot.contents.length
                                } other lot${
                                  lot.contents.length == 1 ? "" : "s"
                                }`}
                              </Typography>
                              {lot.quality_check_responses.length > 0 && (
                                <Box>
                                  <Button
                                    onClick={(event) => {
                                      setClickState({
                                        target: event.currentTarget,
                                      });
                                    }}
                                    startIcon={
                                      lot.quality_check_responses.some(
                                        (check) => !check.passed
                                      ) ? (
                                        <RiErrorWarningFill />
                                      ) : (
                                        <MdCheckCircle />
                                      )
                                    }
                                    color={
                                      lot.quality_check_responses.some(
                                        (check) => !check.passed
                                      )
                                        ? "warning"
                                        : "success"
                                    }
                                    variant="text"
                                  >
                                    {lot.quality_check_responses.some(
                                      (check) => !check.passed
                                    )
                                      ? `Failed ${
                                          lot.quality_check_responses.filter(
                                            (check) => !check.passed
                                          ).length
                                        } quality checks`
                                      : "Passed all quality checks"}
                                  </Button>
                                  <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={
                                      clickState ? clickState.target : null
                                    }
                                    onClose={() => setClickState(null)}
                                    anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "left",
                                    }}
                                  >
                                    {lot.quality_check_responses.map(
                                      (check, checkIndex) => (
                                        <Box
                                          sx={{
                                            padding: 1,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            paddingRight: 3,
                                          }}
                                          key={"check_" + checkIndex}
                                        >
                                          <Box
                                            sx={{
                                              display: "flex",
                                              padding: 1,
                                              fontSize: "1.5rem",
                                              color: check.passed
                                                ? palette.success.main
                                                : palette.warning.main,
                                            }}
                                          >
                                            {check.passed ? (
                                              <MdCheckCircle />
                                            ) : (
                                              <RiErrorWarningFill />
                                            )}
                                          </Box>
                                          <Box>
                                            <Typography
                                              variant="caption"
                                              color="textSecondary"
                                            >
                                              {check.qualityCheck.prompt.phrase}
                                            </Typography>
                                            <Typography>
                                              {check.response}
                                            </Typography>
                                          </Box>
                                        </Box>
                                      )
                                    )}
                                  </Popover>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                      <AppFab
                        icon={<MdEdit />}
                        onClick={() => nav("edit")}
                      >{`Edit ${fulfillment.type}`}</AppFab>
                    </Box>
                  ),
                  Details: (
                    <Box sx={{ paddingTop: 3 }}>
                      <Details gap={4}>
                        {[
                          {
                            key: "Created by",
                            value: fulfillment.created_by.name,
                          },
                          {
                            key: "Date created",
                            value: format(
                              new Date(fulfillment.date_created),
                              dateFormats.condensedDate
                            ),
                          },
                          {
                            key: "Last modified by",
                            value: !fulfillment.modified_by
                              ? "-"
                              : fulfillment.modified_by.name,
                          },
                          {
                            key: "Date modified",
                            value: !fulfillment.date_modified
                              ? "Never"
                              : format(
                                  new Date(fulfillment.date_modified),
                                  dateFormats.condensedDate
                                ),
                          },
                        ]}
                      </Details>
                    </Box>
                  ),
                  Documents: (
                    <FulfillmentAttachments
                      fulfillment={fulfillment}
                      refetch={() => refetch()}
                    />
                  ),
                  Verification: (
                    <FulfillmentVerification fulfillment={fulfillment} />
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

export default FulfillmentDetail;
