import { cloneDeep } from '@apollo/client/utilities';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TextFieldProps } from '@mui/material/TextField';
import React, { ReactElement } from 'react';
import EntityField from '../../../../../../../../components/Inputs/EntityField';
import { TinyCompany } from '../../../../../../../../graphql/schema/Company/Company';
import { useCompanies } from '../../../../../../../../graphql/schema/Company/useCompanies';
import { OrderQueueLineInput } from '../../../../../../../../graphql/schema/OrderQueueLine/OrderQueueLineInput';
import { Pagination } from '../../../../../../../../utils/types/Pagination';

export interface QueueLineProps {
    line: OrderQueueLineInput;
    setLine: (value: OrderQueueLineInput) => void;
}

const QueueLine = (props: QueueLineProps): ReactElement => {
    const { line, setLine } = props;

    const selectprops: TextFieldProps = {
        size: 'small',
        variant: 'standard',
        InputProps: { disableUnderline: true },
        fullWidth: true,
    };

    return (
        <TableRow>
            <TableCell></TableCell>
            <TableCell>PO</TableCell>
            <TableCell>
                <EntityField
                    {...selectprops}
                    hook={useCompanies}
                    variables={{ filter: { skip: 0, take: 100 } }}
                    getData={(res) => res.companies.items}
                    getProps={(d: TinyCompany) => ({
                        id: d._id,
                        label: d.name,
                    })}
                    value={line.vendor || ''}
                    onChange={(value) => {
                        const copy = cloneDeep(line);
                        copy.vendor = value;
                        setLine(copy);
                    }}
                />
            </TableCell>
            <TableCell>Item</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Date</TableCell>
        </TableRow>
    );
};

export default QueueLine;
