import { Box } from "@mui/material";
import React, { ReactElement } from "react";
import { Company } from "../../../../../../../../graphql/schema/Company/Company";
import FileUpload from "../../../../../../../../components/FileUpload";
import { useUploads } from "../../../../../../../../providers/UploadProvider";
import Files from "../../../../../../../../components/Files";
import { StorageBucket } from "../../../../../../../../graphql/schema/SignedUrl/SignedUrl";
import { CompanyQuery } from "../../../../../../../../graphql/queries/companies/useCompany";

export interface CompanyDocumentsProps {
  company: Company;
  refetch: () => void;
}

const CompanyAttachments = (props: CompanyDocumentsProps): ReactElement => {
  const { company, refetch } = props;
  const { enqueue } = useUploads(props.refetch);

  return (
    <Box sx={{ height: "90%", overflow: "auto" }}>
      <Files
        files={company.files}
        prefix={company._id}
        storage_category={StorageBucket.Attachments}
        refetchQueries={[CompanyQuery, "CompanyQuery"]}
      />
      <FileUpload
        fab
        onChange={(files) =>
          enqueue(
            files.map((file) => ({
              file,
              prefix: company._id,
              storage_category: StorageBucket.Attachments,
            }))
          )
        }
      />
    </Box>
  );
};

export default CompanyAttachments;
