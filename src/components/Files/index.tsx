import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridValueFormatterParams } from "@mui/x-data-grid";
import format from "date-fns/format";
import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useLazySignedUrls } from "../../graphql/queries/signedUrl/useSignedUrls";
import { AppFile } from "../../graphql/schema/AppFile/AppFile";
import { Profile } from "../../graphql/schema/Profile/Profile";
import {
  SignedUrlCategory,
  SignedUrlType,
} from "../../graphql/schema/SignedUrl/SignedUrl";
import { dateFormats } from "../../utils/dateFormats";
import { getFileTypeCategory, iconMap } from "../FileUpload";

export interface FilesProps {
  files: AppFile[];
  category: SignedUrlCategory;
  identifier: string;
}

const Files = (props: FilesProps): ReactElement => {
  const { files, category, identifier } = props;

  const [view, setView] = React.useState<"grid" | "table">("table");

  const [getUrl] = useLazySignedUrls({
    onCompleted: (data) => {
      const url = data.signedUrls[0].url;
      window.open(url, "_blank");
    },
  });

  if (view == "table")
    return (
      <DataGrid
        rows={files}
        columns={[
          { field: "name", headerName: "Name", width: 400 },
          {
            field: "date_created",
            headerName: "Date",
            width: 300,
            type: "data",
            valueFormatter: (params: GridValueFormatterParams) => {
              return format(
                new Date(params.value as string | number),
                dateFormats.condensedDate
              );
            },
          },
          {
            field: "created_by",
            headerName: "Created by",
            width: 300,
            valueFormatter: (params: GridValueFormatterParams) => {
              return (params.value as Profile).name;
            },
          },
        ]}
        pagination={true}
        paginationMode="client"
        onRowClick={(params) => {
          getUrl({
            variables: {
              category,
              identifier,
              filenames: [params.row.name],
              type: SignedUrlType.Read,
            },
          });
        }}
      />
    );
  else return <Box></Box>;
};

export default Files;
