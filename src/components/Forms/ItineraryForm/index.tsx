import { Box, Button } from "@mui/material";
import React, { ReactElement } from "react";
import { MdCheck, MdChevronLeft, MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import {
  CreateItineraryInput,
  CreateItineraryRes,
  useItineraryCreation,
} from "../../../graphql/mutations/itinerary/useItineraryCreation";
import {
  UpdateItineraryInput,
  UpdateItineraryRes,
  useItineraryUpdate,
} from "../../../graphql/mutations/itinerary/useItineraryUpdate";
import { useItinerary } from "../../../graphql/queries/itinerary/useItinerary";
import { OrderQuery, useOrder } from "../../../graphql/queries/orders/Order";
import { CodeType } from "../../../graphql/schema/Code/Code";
import { OperationResult } from "../../../graphql/types";
import AppFab from "../../AppFab";
import AppNav from "../../AppNav";
import ColumnBox from "../../Layout/ColumnBox";
import Message from "../../Message";
import PageTitle from "../../PageTitle";
import CarefulButton from "../CarefulButton";
import CodeField from "../components/CodeField";
import CompanyField from "../components/CompanyField";
import FormRow from "../components/FormRow";

const ItineraryForm = (): ReactElement => {
  const nav = useNavigate();
  const { id, order_id } = useParams();

  const {
    data: orderData,
    error: orderError,
    loading: orderLoading,
  } = useOrder({
    variables: {
      id: order_id || "",
    },
  });

  const [state, setState] = React.useState<
    CreateItineraryInput | UpdateItineraryInput
  >({
    code: "",
    carrier: "",
    orders: [order_id || ""],
  });

  const { data, error, loading } = useItinerary({
    variables: {
      id: id || "",
    },
    skip: !id || id == "",
    onCompleted: (data) => {
      setState({
        code: data.itinerary.code,
        carrier: data.itinerary.carrier ? data.itinerary.carrier._id : "",
        deleted: false,
      });
    },
  });

  const [result, setResult] = React.useState<OperationResult<
    CreateItineraryRes | UpdateItineraryRes
  > | null>(null);

  const [handleCreate, { loading: createLoading }] = useItineraryCreation({
    onCompleted: (data) => setResult({ success: true, data }),
    onError: (error) => setResult({ success: false, error }),
    refetchQueries: [OrderQuery],
  });

  const [handleUpdate, { loading: updateLoading }] = useItineraryUpdate({
    onCompleted: (data) => setResult({ success: true, data }),
    onError: (error) => setResult({ success: false, error }),
    refetchQueries: [OrderQuery],
  });

  const submit = () => {
    if ("deleted" in state) {
      handleUpdate({
        variables: {
          id: id || "",
          data: {
            code: state.code,
            carrier:
              state.carrier && state.carrier !== "" ? state.carrier : null,
            deleted: state.deleted,
          },
        },
      });
    } else {
      handleCreate({
        variables: {
          data: state,
        },
      });
    }
  };

  React.useEffect(() => {
    if ("deleted" in state && state.deleted == true) {
      submit();
    }
  }, [state]);

  return (
    <AppNav
      loading={loading || createLoading || updateLoading || orderLoading}
      error={error || orderError}
    >
      {result && result.success == true ? (
        <Message
          type="Success"
          message={
            "createItinerary" in result.data
              ? "Itinerary saved!"
              : "Itinerary updated!"
          }
          onComplete={() => nav("/logistics/orders/" + order_id)}
        />
      ) : result ? (
        <Message
          message={result.error.message}
          type="Warning"
          action={
            <Button onClick={() => setResult(null)} variant="text">
              Try again
            </Button>
          }
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
                  onClick={() => nav("/logistics/orders/" + order_id)}
                >
                  Back to order
                </Button>
                <PageTitle>
                  {id && id.length > 0
                    ? [
                        "Update itinerary",
                        "On behalf of order " + orderData?.order.code || "",
                      ]
                    : [
                        "Create itinerary",
                        "On behalf of order " + orderData?.order.code || "",
                      ]}
                </PageTitle>
              </Box>
            ),
            content: (
              <Box sx={{ paddingTop: 2, maxWidth: 400 }}>
                <FormRow>
                  <CodeField
                    type={CodeType.ITIN}
                    value={state.code || ""}
                    onChange={(code) => setState({ ...state, code })}
                  />
                </FormRow>
                <FormRow>
                  <CompanyField
                    allow_unassigned
                    label="Carrier"
                    value={state.carrier || ""}
                    onChange={(val) => {
                      setState({ ...state, carrier: val || "" });
                    }}
                  />
                </FormRow>
              </Box>
            ),
            footer: (
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                {id && id.length > 0 && (
                  <Box>
                    <CarefulButton
                      onClick={() => {
                        setState({ ...state, deleted: true });
                      }}
                      size="large"
                      endIcon={<MdDelete />}
                    >
                      Delete Itinerary
                    </CarefulButton>
                  </Box>
                )}
                <Button size="large" endIcon={<MdCheck />} onClick={submit}>
                  Save
                </Button>
              </Box>
            ),
          }}
        </ColumnBox>
      )}
    </AppNav>
  );
};

export default ItineraryForm;
