import {
    Box,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import SearchField from '../Forms/components/SearchField';
import ColumnBox from '../Layout/ColumnBox';

export interface SmartRowProps<T> {
    id: string;
    onClick?: (
        data: T,
        event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
    ) => void;
}

export interface SmartTableProps<T> {
    data: T[];
    getProps: (d: T) => SmartRowProps<T>;
    children: Record<string, (d: T) => string | ReactElement>;
    search?: {
        label: string;
        value: string;
        setValue: (d: string) => void;
    };
    action?: ReactElement;
    pagination?: {
        count: number;
        skip: number;
        take: number;
        setPage: (p: number) => void;
    };
}

const SmartTable = <T,>(props: SmartTableProps<T>): ReactElement => {
    const {
        data,
        getProps,
        search,
        action,
        pagination,
        children: rows,
    } = props;

    const { palette } = useTheme();

    const page = !pagination
        ? 0
        : pagination.skip == 0
        ? 1
        : pagination.skip / pagination.take + 1;

    return (
        <ColumnBox>
            {{
                header: (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            paddingBottom: 2,
                        }}
                    >
                        {search && (
                            <Box>
                                <SearchField
                                    naked
                                    label={search.label}
                                    value={search.value}
                                    onChange={(val) =>
                                        search.setValue(val || '')
                                    }
                                />
                            </Box>
                        )}
                        <Box sx={{ flex: 1 }} />
                        {action}
                    </Box>
                ),
                content: (
                    <Table stickyHeader>
                        <TableHead>
                            {Object.keys(rows).map((k, i) => (
                                <TableCell
                                    sx={{
                                        background: palette.background.paper,
                                    }}
                                    key={'cell_' + k}
                                >
                                    {k}
                                </TableCell>
                            ))}
                        </TableHead>
                        <TableBody>
                            {data.map((d, i) => (
                                <TableRow
                                    onClick={(e) => {
                                        const click = getProps(d).onClick;
                                        if (click) {
                                            click(d, e);
                                        }
                                    }}
                                    hover
                                    key={'row_' + getProps(d).id}
                                >
                                    {Object.keys(rows).map((k, i) => (
                                        <TableCell
                                            key={'row_' + i + 'cell_' + k}
                                        >
                                            {rows[k](d)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ),
                footer: pagination && (
                    <Box
                        sx={{
                            display: 'flex',
                            paddingTop: 2,
                            borderTop: `1px solid ${palette.divider}`,
                        }}
                    >
                        <Box>
                            <Typography color="textSecondary">{`Showing ${
                                pagination.skip + 1
                            }-${
                                pagination.count <
                                pagination.skip + pagination.take
                                    ? pagination.count
                                    : pagination.skip + pagination.take
                            } of ${pagination.count}`}</Typography>
                        </Box>
                        <Box sx={{ flex: 1 }} />
                        <Box>
                            <Pagination
                                count={Math.ceil(
                                    pagination.count / pagination.take
                                )}
                                page={page}
                                onChange={(e, p) => {
                                    pagination.setPage(p);
                                }}
                            />
                        </Box>
                    </Box>
                ),
            }}
        </ColumnBox>
    );
};

export default SmartTable;
