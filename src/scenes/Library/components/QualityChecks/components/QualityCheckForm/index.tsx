import { LoadingButton } from "@mui/lab";
import { Box, Button, Collapse, Tooltip, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import { MdCheck, MdChevronLeft, MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import AppNav from "../../../../../../components/AppNav";
import ButtonToggle from "../../../../../../components/ButtonToggle";
import CarefulButton from "../../../../../../components/Forms/CarefulButton";
import BooleanField from "../../../../../../components/Forms/components/BooleanField";
import FormRow from "../../../../../../components/Forms/components/FormRow";
import ItemField from "../../../../../../components/Forms/components/ItemField";
import NumberField from "../../../../../../components/Forms/components/NumberField";
import TextFormField from "../../../../../../components/Forms/components/TextFormField";
import ColumnBox from "../../../../../../components/Layout/ColumnBox";
import ListSelect from "../../../../../../components/ListSelect";
import Message from "../../../../../../components/Message";
import PageTitle from "../../../../../../components/PageTitle";
import {
  CreateQualityCheckInput,
  CreateQualityCheckRes,
  useQualityCheckCreation,
} from "../../../../../../graphql/mutations/qualityCheck/useQualityCheckCreation";
import {
  UpdateQualityCheckInput,
  UpdateQualityCheckRes,
  useQualityCheckUpdate,
} from "../../../../../../graphql/mutations/qualityCheck/useQualityCheckUpdate";
import {
  QualityCheckQuery,
  useQualityCheck,
} from "../../../../../../graphql/queries/qualityCheck/useQualityCheck";
import { QualityChecks } from "../../../../../../graphql/queries/qualityCheck/useQualityChecks";
import { PromptType } from "../../../../../../graphql/schema/Prompt/Prompt";
import { OperationResult } from "../../../../../../graphql/types";

interface PromptTypeDetails {
  label: string;
  description: string;
}

const promptTypeDetails: Record<PromptType, PromptTypeDetails> = {
  [PromptType.Boolean]: {
    label: "Yes or No",
    description: "User will be asked for a yes or no.",
  },
  [PromptType.Number]: {
    label: "Number",
    description: "User will enter a number",
  },
  [PromptType.Text]: {
    label: "Text",
    description: "User can enter any text value.",
  },
};

const QualityCheckForm = (): ReactElement => {
  const { id } = useParams();

  const nav = useNavigate();

  const [state, setState] = React.useState<
    | ({ _type: "update" } & UpdateQualityCheckInput)
    | ({ _type: "create" } & CreateQualityCheckInput)
  >({
    _type: "create",
    item: "",
    prompt: {
      type: PromptType.Text,
      phrase: "",
    },
  });

  const { data, error, loading } = useQualityCheck({
    variables: id ? { id } : undefined,
    onCompleted: ({
      qualityCheck: {
        item,
        prompt: { phrase, type, valid_range, valid_boolean },
      },
    }) => {
      setState({
        _type: "update",
        item: item._id,
        prompt: {
          phrase,
          type,
          valid_range: valid_range
            ? { min: valid_range.min, max: valid_range.max }
            : undefined,
          valid_boolean,
        },
      });
    },
  });

  const [result, setResult] = React.useState<null | OperationResult<
    CreateQualityCheckRes | UpdateQualityCheckRes
  >>(null);

  const [create, { loading: createLoading }] = useQualityCheckCreation({
    onCompleted: (data) => setResult({ success: true, data }),
    onError: (error) => setResult({ success: false, error }),
    refetchQueries: [QualityChecks, QualityCheckQuery],
    variables:
      state._type == "create"
        ? {
            data: {
              item: state.item,
              prompt: state.prompt,
            },
          }
        : undefined,
  });
  const [update, { loading: updateLoading }] = useQualityCheckUpdate({
    onCompleted: (data) => setResult({ success: true, data }),
    onError: (error) => setResult({ success: false, error }),
    refetchQueries: [QualityChecks, QualityCheckQuery],
    variables:
      state._type == "update"
        ? {
            id: id || "",
            data: {
              item: state.item,
              prompt: state.prompt,
              deleted: state.deleted,
            },
          }
        : undefined,
  });

  const submit = () => {
    if (state._type == "create") create();
    else update();
  };

  const remove = () => {
    update({
      variables: {
        id: id || "",
        data: {
          deleted: true,
        },
      },
    });
  };

  const gap = 3;

  const getHoldup = (): string | null => {
    if (!state.item) return "Please select an item.";
    if (!state.prompt || !state.prompt.phrase) return "Please enter a prompt";
    if (
      state.prompt &&
      state.prompt.type === PromptType.Number &&
      state.prompt.valid_range
    ) {
      const { min, max } = state.prompt.valid_range;
      if (min >= max) return "Minimum must be lass than max.";
    }
    return null;
  };

  const holdup = getHoldup();

  return (
    <AppNav>
      {result && result.success ? (
        <Message
          type="Success"
          message={
            "createQualityCheck" in result.data
              ? "Quality check created!"
              : result.data.updateQualityCheck.deleted
              ? "Quality check deleted."
              : "Quality check saved!"
          }
          onComplete={() =>
            nav(
              "/library/qualitychecks/" +
                ("createQualityCheck" in result.data
                  ? ""
                  : result.data.updateQualityCheck.deleted
                  ? ""
                  : result.data.updateQualityCheck._id)
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
                  variant="text"
                  color="inherit"
                  startIcon={<MdChevronLeft />}
                  onClick={() => nav("/library/qualitychecks")}
                >
                  Quality checks
                </Button>
                <PageTitle>
                  {id ? "Update quality check" : "Create quality check"}
                </PageTitle>
                <FormRow gap={gap}>
                  <Typography
                    variant="body2"
                    sx={{ maxWidth: 250 }}
                    color="textSecondary"
                  >
                    Each time a lot of this item is created, this quality check
                    will be asked.
                  </Typography>
                </FormRow>
              </Box>
            ),
            content: (
              <Box sx={{ maxWidth: 500 }}>
                <FormRow gap={gap}>
                  <ItemField
                    label="Item"
                    value={state.item || ""}
                    onChange={(val) => {
                      setState({ ...state, item: val || "" });
                    }}
                  />
                </FormRow>
                <FormRow gap={gap}>
                  <TextFormField
                    label="Prompt"
                    value={state.prompt ? state.prompt.phrase : ""}
                    onChange={(val) => {
                      if (state.prompt)
                        setState({
                          ...state,
                          prompt: { ...state.prompt, phrase: val || "" },
                        });
                    }}
                  />
                </FormRow>
                <FormRow gap={gap}>
                  <Box sx={{ flex: 1 }}>
                    <ListSelect
                      multiple={false}
                      label="Check Type"
                      options={Object.keys(PromptType) as PromptType[]}
                      textProps={(option) => ({
                        primary: promptTypeDetails[option].label,
                        secondary: promptTypeDetails[option].description,
                      })}
                      value={state.prompt ? state.prompt.type : null}
                      onChange={(type) => {
                        if (state.prompt && type)
                          setState({
                            ...state,
                            prompt: {
                              ...state.prompt,
                              type,
                              valid_range: undefined,
                              valid_boolean: undefined,
                            },
                          });
                      }}
                    />
                  </Box>
                </FormRow>
                <Collapse
                  in={
                    state.prompt !== undefined &&
                    state.prompt.type == PromptType.Number &&
                    state.prompt.valid_range !== undefined
                  }
                >
                  <FormRow gap={gap}>
                    <NumberField
                      label={"Minimum acceptable value"}
                      value={
                        state.prompt && state.prompt.valid_range
                          ? state.prompt.valid_range.min
                          : null
                      }
                      onChange={(val) => {
                        if (state.prompt && state.prompt.valid_range) {
                          setState({
                            ...state,
                            prompt: {
                              ...state.prompt,
                              valid_range: {
                                ...state.prompt.valid_range,
                                min: val || 0,
                              },
                            },
                          });
                        }
                      }}
                    />
                    <NumberField
                      label={"Maximum acceptable value"}
                      value={
                        state.prompt && state.prompt.valid_range
                          ? state.prompt.valid_range.max
                          : null
                      }
                      onChange={(val) => {
                        if (state.prompt && state.prompt.valid_range) {
                          setState({
                            ...state,
                            prompt: {
                              ...state.prompt,
                              valid_range: {
                                ...state.prompt.valid_range,
                                max: val || 0,
                              },
                            },
                          });
                        }
                      }}
                    />
                  </FormRow>
                </Collapse>
                <Collapse
                  in={
                    state.prompt !== undefined &&
                    state.prompt.type == PromptType.Boolean &&
                    state.prompt.valid_boolean !== undefined
                  }
                >
                  <FormRow gap={gap}>
                    <Box sx={{ display: "flex", flexFlow: "column", gap: 1 }}>
                      <Typography variant="caption" color="textSecondary">
                        Which answer is acceptable?
                      </Typography>
                      <ButtonToggle
                        options={[
                          { id: "Yes", label: "Yes" },
                          { id: "No", label: "No" },
                        ]}
                        value={
                          state.prompt
                            ? state.prompt.valid_boolean == true
                              ? { id: "Yes", label: "Yes" }
                              : { id: "No", label: "No" }
                            : null
                        }
                        onChange={(val) => {
                          if (state.prompt) {
                            setState({
                              ...state,
                              prompt: {
                                ...state.prompt,
                                valid_boolean: val.id == "Yes",
                              },
                            });
                          }
                        }}
                      />
                    </Box>
                  </FormRow>
                </Collapse>
                <Collapse
                  in={state.prompt && state.prompt.type !== PromptType.Text}
                >
                  <FormRow>
                    <BooleanField
                      label="Validation"
                      value={
                        state.prompt !== undefined &&
                        ((state.prompt.type == PromptType.Boolean &&
                          state.prompt.valid_boolean !== undefined) ||
                          (state.prompt.type == PromptType.Number &&
                            state.prompt.valid_range !== undefined))
                      }
                      onChange={(val) => {
                        if (state.prompt) {
                          if (state.prompt.type === PromptType.Boolean) {
                            setState({
                              ...state,
                              prompt: {
                                ...state.prompt,
                                valid_boolean: val ? true : undefined,
                              },
                            });
                          } else if (state.prompt.type === PromptType.Number) {
                            setState({
                              ...state,
                              prompt: {
                                ...state.prompt,
                                valid_range: val
                                  ? { min: 0, max: 10 }
                                  : undefined,
                              },
                            });
                          }
                        }
                      }}
                    />
                  </FormRow>
                </Collapse>
              </Box>
            ),
            footer: (
              <Box sx={{ display: "flex", gap: 2 }}>
                {id && (
                  <Box>
                    <CarefulButton
                      loading={loading || createLoading || updateLoading}
                      onClick={remove}
                      endIcon={<MdDelete />}
                    >
                      Delete quality check
                    </CarefulButton>
                  </Box>
                )}
                <Tooltip title={holdup || ""} arrow>
                  <Box>
                    <LoadingButton
                      disabled={Boolean(holdup)}
                      loading={loading || createLoading || updateLoading}
                      color="primary"
                      variant="contained"
                      onClick={submit}
                      endIcon={<MdCheck />}
                    >
                      Save quality check
                    </LoadingButton>
                  </Box>
                </Tooltip>
              </Box>
            ),
          }}
        </ColumnBox>
      )}
    </AppNav>
  );
};

export default QualityCheckForm;
