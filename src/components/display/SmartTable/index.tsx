import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    SxProps,
    Theme,
    Box,
    useTheme,
} from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';
import ColumnBox from '../../Layout/ColumnBox';
import TablePagination from './components/TablePagination';

export interface SmartTablePagination {
    count: number;
    filter: { skip: number; take: number };
    setFilter: (filter: { skip: number; take: number }) => void;
}

export interface SmartTableProps<T> {
    data: T[];
    children: Record<string, (d: T) => ReactNode>;
    getProps: (d: T) => { id: string; onClick?: (d: T) => void };
    controls?: Record<string, ReactNode>;
    pagination?: SmartTablePagination;
    sx?: SxProps<Theme>;
}

const SmartTable = <T,>(props: SmartTableProps<T>): ReactElement => {
    const {
        data,
        children: content,
        controls = {},
        getProps,
        pagination,
        sx,
    } = props;

    const { palette } = useTheme();

    return (
        <ColumnBox>
            {{
                content: (
                    <Table stickyHeader sx={sx}>
                        <TableHead>
                            <TableRow>
                                {Object.keys(content).map((key, i) => (
                                    <TableCell
                                        sx={{
                                            background:
                                                palette.background.paper,
                                        }}
                                        key={key + '_' + i}
                                    >
                                        {controls[key] || key}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((d, i) => {
                                const rowProps = getProps(d);
                                return (
                                    <TableRow
                                        hover={Boolean(rowProps.onClick)}
                                        onClick={() => {
                                            if (rowProps.onClick)
                                                rowProps.onClick(d);
                                        }}
                                        key={rowProps.id}
                                    >
                                        {Object.keys(content).map((key) => (
                                            <TableCell key={key}>
                                                {content[key](d)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                ),
                footer: pagination ? (
                    <TablePagination {...pagination} />
                ) : undefined,
            }}
        </ColumnBox>
    );
};

export default SmartTable;
