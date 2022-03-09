import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    SxProps,
    Theme,
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
    variant?: 'standard' | 'card';
}

const SmartTable = <T,>(props: SmartTableProps<T>): ReactElement => {
    const {
        data,
        children: content,
        controls = {},
        getProps,
        pagination,
        sx,
        variant = 'standard',
    } = props;

    const { palette, transitions, shape } = useTheme();

    return (
        <ColumnBox>
            {{
                content: (
                    <Table
                        stickyHeader
                        sx={{
                            ...(variant == 'card' ? {} : {}),
                            ...sx,
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                {Object.keys(content).map((key, i) => (
                                    <TableCell
                                        sx={{
                                            background:
                                                palette.background.paper,
                                            ...(variant == 'card'
                                                ? {
                                                      background:
                                                          palette.background
                                                              .default,
                                                      border: '0px solid',
                                                      color: palette.text
                                                          .secondary,
                                                      paddingBottom: 1,
                                                  }
                                                : {}),
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
                                        sx={
                                            variant == 'card'
                                                ? {
                                                      transition:
                                                          transitions.create(
                                                              'background',
                                                              { duration: 250 }
                                                          ),
                                                      ':hover': {
                                                          '& td': {
                                                              background:
                                                                  palette.action
                                                                      .hover,
                                                              cursor: 'pointer',
                                                          },
                                                      },
                                                  }
                                                : undefined
                                        }
                                        hover={Boolean(rowProps.onClick)}
                                        onClick={() => {
                                            if (rowProps.onClick)
                                                rowProps.onClick(d);
                                        }}
                                        key={rowProps.id}
                                    >
                                        {Object.keys(content).map((key, i) => (
                                            <TableCell
                                                key={key}
                                                sx={
                                                    variant == 'card'
                                                        ? {
                                                              ...(i == 0
                                                                  ? {
                                                                        borderTopLeftRadius: 4,
                                                                    }
                                                                  : i ==
                                                                    Object.keys(
                                                                        content
                                                                    ).length -
                                                                        1
                                                                  ? {
                                                                        borderTopRightRadius: 4,
                                                                    }
                                                                  : {}),
                                                              background:
                                                                  palette
                                                                      .background
                                                                      .paper,
                                                              border: '0px solid',
                                                              borderBottom: `8px solid ${palette.background.default}`,
                                                          }
                                                        : {}
                                                }
                                            >
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
