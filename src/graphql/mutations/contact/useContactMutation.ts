import { CompanyQuery } from "./../../queries/companies/useCompany";
import { OperationResult } from "./../../types";
import {
  UpdateContactArgs,
  UpdateContactRes,
  useContactUpdate,
} from "./useContactUpdate";
import {
  CreateContactArgs,
  CreateContactRes,
  useContactCreation,
} from "./useContactCreation";
import {
  DeleteContactArgs,
  DeleteContactRes,
  useContactDeletion,
} from "./useContactDeletion";
import React from "react";

export const useContactMutation = (): {
  handler: {
    create: (variables: CreateContactArgs) => void;
    update: (variables: UpdateContactArgs) => void;
    delete: (variables: DeleteContactArgs) => void;
  };
  result: OperationResult<
    CreateContactRes | UpdateContactRes | DeleteContactRes
  > | null;
  reset: () => void;
  loading: boolean;
} => {
  const [result, setResult] = React.useState<OperationResult<
    CreateContactRes | UpdateContactRes | DeleteContactRes
  > | null>(null);

  const [create, { loading: createLoading }] = useContactCreation({
    onCompleted: (data) => setResult({ success: true, data }),
    onError: (error) => setResult({ success: false, error }),
    refetchQueries: [CompanyQuery, "CompanyQuery"],
  });
  const [update, { loading: updateLoading }] = useContactUpdate({
    onCompleted: (data) => setResult({ success: true, data }),
    onError: (error) => setResult({ success: false, error }),
    refetchQueries: [CompanyQuery, "CompanyQuery"],
  });
  const [remove, { loading: deleteLoading }] = useContactDeletion({
    onCompleted: (data) => setResult({ success: true, data }),
    onError: (error) => setResult({ success: false, error }),
    refetchQueries: [CompanyQuery, "CompanyQuery"],
  });

  const loading = createLoading || updateLoading || deleteLoading;

  return {
    handler: {
      create: (variables) => create({ variables }),
      update: (variables) => update({ variables }),
      delete: (variables) => remove({ variables }),
    },
    loading,
    result,
    reset: () => setResult(null),
  };
};
