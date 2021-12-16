import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { OperationResult } from "../graphql/types";
import axios, { AxiosResponse } from "axios";

export type UploadTuple<Res = unknown> = [
  upload: (file: File, endpoint: string) => void,
  result: {
    data?: Res;
    loading: boolean;
    error?: Error;
    progress: number | null;
  }
];

export interface UploadOptions<Res = unknown> {
  onComplete?: (data: Res) => void;
  onError?: (error: Error) => void;
}

export const useFileUpload = <Res = unknown>(
  options?: UploadOptions<Res>
): UploadTuple<Res> => {
  const { user } = useAuth0();
  const [progress, setProgress] = React.useState<number | null>(null);
  const [state, setState] = React.useState<OperationResult<Res>>();

  const upload = (file: File, endpoint: string) => {
    const formData = new FormData();
    formData.append("Content-Type", file.type);
    formData.append("file", file);

    axios({
      method: "PUT",
      url: endpoint,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "x-goog-meta-created_by": user ? user.sub || "" : "",
      },
      onUploadProgress: (progressEvent) => {
        console.log(progressEvent);
        const percentCompleted = Math.floor(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
    })
      .then(({ data }: AxiosResponse<Res>) => {
        setProgress(null);
        setState({ success: true, data });
        if (options && options.onComplete) options.onComplete(data);
      })
      .catch((error) => {
        setProgress(null);
        setState({ success: false, error });
        if (options && options.onError) options.onError(error);
      });
  };

  const result: UploadTuple<Res>[1] = {
    loading: progress !== null,
    data: state && state.success == true ? state.data : undefined,
    error: state && state.success == false ? state.error : undefined,
    progress,
  };

  return [upload, result];
};
