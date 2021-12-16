import { Box } from "@mui/material";
import React, { ReactElement } from "react";
import { Company } from "../../../../../../../../graphql/schema/Company/Company";
import FileUpload, {
  FileTypeCategory,
} from "../../../../../../../../components/FileUpload";
import { useUploads } from "../../../../../../../../providers/UploadProvider";
import { SignedUrlCategory } from "../../../../../../../../graphql/schema/SignedUrl/SignedUrl";
import Files from "../../../../../../../../components/Files";

export interface CompanyDocumentsProps {
  company: Company;
  refetch: () => void;
}

const CompanyDocuments = (props: CompanyDocumentsProps): ReactElement => {
  const { company, refetch } = props;
  const { enqueue } = useUploads(props.refetch);

  return (
    <Box sx={{ height: "90%", overflow: "auto" }}>
      <Files
        files={company.files}
        identifier={company._id}
        category={SignedUrlCategory.Company}
      />
      <FileUpload
        fab
        accept={[FileTypeCategory.Document, FileTypeCategory.PDF]}
        onChange={(files) =>
          enqueue(
            files.map((file) => ({
              file,
              identifier: company._id,
              category: SignedUrlCategory.Company,
            }))
          )
        }
      />
    </Box>
  );
};

export default CompanyDocuments;
