import { Button, Popover } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { addDays, endOfDay, format, startOfDay } from 'date-fns';
import React, { ReactElement } from 'react';
import { MdCheck, MdFilter } from 'react-icons/md';
import { FaFilter } from 'react-icons/fa';
import Filters from '../../../../../../components/Filters';
import CompanyField from '../../../../../../components/Forms/components/CompanyField';
import DateRangeField from '../../../../../../components/Forms/components/DateRangeField';
import ItemField from '../../../../../../components/Forms/components/ItemField';
import SearchField from '../../../../../../components/Forms/components/SearchField';
import ColumnBox from '../../../../../../components/Layout/ColumnBox';
import PanelHeader from '../../../../../../components/PanelComponents/PanelHeader';
import SideDrawer from '../../../../../../components/SideDrawer';
import { useBols } from '../../../../../../graphql/queries/bols/useBols';
import { Bol } from '../../../../../../graphql/schema/Bol/Bol';
import { BolFilter } from '../../../../../../graphql/schema/Bol/BolFilter';
import { useClickState } from '../../../../../../hooks/useClickState';
import { useMemory } from '../../../../../../hooks/useMemory';
import { dateFormats } from '../../../../../../utils/dateFormats';
import BolPopover from '../WarehouseCalendar/components/BolPopover';

export interface WarehouseTableProps {
    view: 'shipping' | 'receiving';
}

const WarehouseTable = (props: WarehouseTableProps): ReactElement => {
    const { view } = props;

    const [clickState, setClickState] = React.useState<null | {
        target: EventTarget & Element;
        bol: Bol;
    }>(null);

    const [filter, setFilter] = React.useState<BolFilter>({
        skip: 0,
        take: 25,
    });

    const [filterEdits, setFilterEdits] = React.useState<BolFilter | null>(
        null
    );

    const { data, error, loading } = useBols({
        variables: { filter },
        skip: !filter,
    });

    const bols = data ? data.bols.items : [];
    const count = data ? data.bols.count : 0;

    return (
        <React.Fragment>
            <ColumnBox>
                {{
                    header: (
                        <Box sx={{ display: 'flex', gap: 2, paddingBottom: 2 }}>
                            <Box>
                                <SearchField
                                    label="Search by BOL"
                                    value={filter.code || ''}
                                    onChange={(val) =>
                                        setFilter({
                                            ...filter,
                                            code: val || '',
                                        })
                                    }
                                />
                            </Box>
                            <Button
                                onClick={() => setFilterEdits(filter)}
                                variant="outlined"
                                endIcon={<FaFilter />}
                            >
                                Filters
                            </Button>
                        </Box>
                    ),
                    content: (
                        <DataGrid
                            rowCount={count}
                            error={error}
                            loading={loading}
                            rowsPerPageOptions={[25]}
                            onPageChange={(page) =>
                                setFilter({ ...filter, skip: page * 25 })
                            }
                            rows={bols.map((bol) => ({ ...bol, id: bol._id }))}
                            onRowClick={(params, event) => {
                                const bol = params.row as Bol;
                                const target = event.currentTarget;
                                setClickState({ target, bol });
                            }}
                            pagination={true}
                            paginationMode="server"
                            columns={[
                                {
                                    field: 'code',
                                    headerName: 'BOL #',
                                    width: 120,
                                },
                                {
                                    flex: 1,
                                    field: 'orders',
                                    headerName: 'Order #',
                                    valueGetter: (data) =>
                                        (data.row as Bol).orders
                                            .map((order) => order.code)
                                            .join(', '),
                                },
                                {
                                    flex: 1,
                                    field: 'contents',
                                    headerName: 'BOL contents',
                                    valueGetter: (data) =>
                                        (data.row as Bol).contents
                                            .map(
                                                (content) =>
                                                    `${
                                                        content.item.english
                                                    } - ${content.quantity} ${
                                                        content.unit[
                                                            content.quantity ==
                                                            1
                                                                ? 'english'
                                                                : 'english_plural'
                                                        ]
                                                    }`
                                            )
                                            .join(', '),
                                },
                                {
                                    field: 'status',
                                    headerName: 'BOL Status',
                                    width: 120,
                                },
                                {
                                    flex: 1,
                                    field: 'from',
                                    headerName: 'From',
                                    valueGetter: (data) => {
                                        const from = (data.row as Bol).from;
                                        return `${from.company.name}${
                                            from.location
                                                ? ` (${
                                                      from.location.label ||
                                                      from.location.address
                                                          ?.city ||
                                                      ''
                                                  })`
                                                : ''
                                        }`;
                                    },
                                },
                                {
                                    flex: 1,
                                    field: 'to',
                                    headerName: 'To',
                                    valueGetter: (data) => {
                                        const to = (data.row as Bol).to;
                                        return `${to.company.name}${
                                            to.location
                                                ? ` (${
                                                      to.location.label ||
                                                      to.location.address
                                                          ?.city ||
                                                      ''
                                                  })`
                                                : ''
                                        }`;
                                    },
                                },
                                {
                                    flex: 1,
                                    field: 'receiving'
                                        ? 'receipts'
                                        : 'shipments',
                                    headerName:
                                        view == 'receiving'
                                            ? 'Receipts'
                                            : 'Shipments',
                                    valueGetter: (data) => {
                                        const fulfillments = (data.row as Bol)[
                                            view == 'receiving'
                                                ? 'receipts'
                                                : 'shipments'
                                        ];
                                        if (fulfillments.length == 0)
                                            return 'None';
                                        return fulfillments
                                            .map((f) =>
                                                f.lots.map(
                                                    (l) =>
                                                        `${
                                                            l.item.english
                                                        } (${format(
                                                            new Date(
                                                                f.date_created
                                                            ),
                                                            dateFormats.condensedDate
                                                        )})`
                                                )
                                            )
                                            .join(', ');
                                    },
                                },
                            ]}
                        />
                    ),
                }}
            </ColumnBox>
            <BolPopover
                view={view}
                onClose={() => setClickState(null)}
                focus={clickState}
            />
            <SideDrawer
                open={Boolean(filterEdits)}
                onClose={() => setFilterEdits(null)}
                wide
            >
                <PanelHeader onClose={() => setFilterEdits(null)}>
                    Order filters
                </PanelHeader>
                <Filters>
                    {{
                        ['From company']: [
                            <CompanyField
                                naked
                                key="from_company"
                                value={
                                    filterEdits
                                        ? filterEdits.from_company || ''
                                        : ''
                                }
                                onChange={(val) => {
                                    if (filterEdits)
                                        setFilterEdits({
                                            ...filterEdits,
                                            from_company: val || '',
                                        });
                                }}
                            />,
                            filterEdits !== null &&
                                filterEdits.from_company !== undefined,
                            (checked) => {
                                if (filterEdits) {
                                    setFilterEdits({
                                        ...filterEdits,
                                        from_company: checked ? '' : undefined,
                                    });
                                }
                            },
                        ],

                        ['To company']: [
                            <CompanyField
                                naked
                                key="to_company"
                                value={
                                    filterEdits
                                        ? filterEdits.to_company || ''
                                        : ''
                                }
                                onChange={(val) => {
                                    if (filterEdits)
                                        setFilterEdits({
                                            ...filterEdits,
                                            to_company: val || '',
                                        });
                                }}
                            />,
                            filterEdits !== null &&
                                filterEdits.to_company !== undefined,
                            (checked) => {
                                if (filterEdits) {
                                    setFilterEdits({
                                        ...filterEdits,
                                        to_company: checked ? '' : undefined,
                                    });
                                }
                            },
                        ],

                        ['BOL number']: [
                            <ItemField
                                naked
                                key="itemFilter"
                                value={
                                    filterEdits ? filterEdits.code || '' : ''
                                }
                                onChange={(val) => {
                                    if (filterEdits)
                                        setFilterEdits({
                                            ...filterEdits,
                                            code: val || '',
                                        });
                                }}
                            />,
                            filterEdits !== null &&
                                filterEdits.code !== undefined,
                            (checked) => {
                                if (filterEdits) {
                                    setFilterEdits({
                                        ...filterEdits,
                                        code: checked ? '' : undefined,
                                    });
                                }
                            },
                        ],
                    }}
                </Filters>
                <Box sx={{ paddingTop: 4 }}>
                    <Button
                        onClick={() => {
                            if (filterEdits) {
                                const copy = { ...filterEdits };
                                setFilter(copy);
                                setFilterEdits(null);
                            }
                        }}
                        endIcon={<MdCheck />}
                    >
                        Apply filters
                    </Button>
                </Box>
            </SideDrawer>
        </React.Fragment>
    );
};

export default WarehouseTable;
