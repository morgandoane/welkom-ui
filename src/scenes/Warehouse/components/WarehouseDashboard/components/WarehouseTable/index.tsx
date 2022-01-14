import { AvatarGroup, Button, Popover, Typography } from '@mui/material';
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
import {
    BolsRes,
    useBols,
} from '../../../../../../graphql/queries/bols/useBols';
import { Bol } from '../../../../../../graphql/schema/Bol/Bol';
import { BolFilter } from '../../../../../../graphql/schema/Bol/BolFilter';

import { dateFormats } from '../../../../../../utils/dateFormats';
import BolPopover from '../WarehouseCalendar/components/BolPopover';
import SmartTable from '../../../../../../components/SmartTable';
import { OperationResult } from '../../../../../../graphql/types';
import { TinyBolsRes } from '../../../../../../graphql/queries/bols/useTinyBols';
import { VerificationIcon } from '../../../../../../components/Forms/VerificationForm';
import { VerificationStatus } from '../../../../../../graphql/schema/Verification/Verification';
import { FulfillmentType } from '../../../../../../graphql/schema/Fulfillment/Fulfillment';
import VerificationField from '../../../../../../components/Forms/components/VerificationField';
import PersonField from '../../../../../../components/Forms/components/PersonField';
import LocationField from '../../../../../../components/Forms/components/LocationField';

export interface WarehouseTableProps {
    view: 'shipping' | 'receiving';
    setLoading: (d: boolean) => void;
}

const WarehouseTable = (props: WarehouseTableProps): ReactElement => {
    const { view, setLoading } = props;

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

    const [data, setData] = React.useState<OperationResult<BolsRes> | null>(
        null
    );

    const { loading } = useBols({
        variables: { filter },
        skip: !filter,
        onCompleted: (data) => setData({ success: true, data }),
        onError: (error) => setData({ success: false, error }),
        fetchPolicy: 'network-only',
    });

    React.useEffect(() => {
        setLoading(loading);
    }, [loading]);

    const bols = data && data && data.success ? data.data.bols.items : [];
    const count = data && data && data.success ? data.data.bols.count : 0;

    return (
        <React.Fragment>
            <ColumnBox>
                {{
                    content: (
                        <SmartTable
                            data={bols}
                            getProps={(d) => ({
                                id: d._id,
                                onClick: (bol, event) => {
                                    const target = event.currentTarget;
                                    setClickState({ target, bol });
                                },
                            })}
                            pagination={{
                                skip: filter.skip,
                                take: filter.take,
                                count,
                                setPage: (p) => {
                                    setFilter({
                                        ...filter,
                                        skip:
                                            p == 1 ? 0 : (p - 1) * filter.take,
                                    });
                                },
                            }}
                            controls={{
                                PO: (
                                    <SearchField
                                        label="PO Number"
                                        naked
                                        value={filter.order_code || ''}
                                        onChange={(val) => {
                                            setFilter({
                                                ...filter,
                                                order_code: val,
                                            });
                                        }}
                                    />
                                ),
                                BOL: (
                                    <SearchField
                                        label="BOL Number"
                                        naked
                                        value={filter.code || ''}
                                        onChange={(val) => {
                                            if (val !== (filter.code || ''))
                                                setFilter({
                                                    ...filter,
                                                    code: val,
                                                });
                                        }}
                                    />
                                ),
                                Vendor: (
                                    <CompanyField
                                        label="Vendor"
                                        naked
                                        value={filter.from_company || null}
                                        onChange={(val) =>
                                            setFilter({
                                                ...filter,
                                                from_company: val || undefined,
                                            })
                                        }
                                    />
                                ),
                                Customer: (
                                    <CompanyField
                                        label="Customer"
                                        naked
                                        value={filter.to_company || null}
                                        onChange={(val) =>
                                            setFilter({
                                                ...filter,
                                                to_company: val || undefined,
                                            })
                                        }
                                    />
                                ),
                                Destination: (
                                    <LocationField
                                        label="Destination"
                                        naked
                                        company={filter.to_company}
                                        value={
                                            (view == 'receiving'
                                                ? filter.to_location
                                                : filter.from_location) || null
                                        }
                                        onChange={(val) => {
                                            setFilter(
                                                view == 'receiving'
                                                    ? {
                                                          ...filter,
                                                          to_location:
                                                              val || undefined,
                                                      }
                                                    : {
                                                          ...filter,
                                                          from_location:
                                                              val || undefined,
                                                      }
                                            );
                                        }}
                                    />
                                ),
                                Items: (
                                    <ItemField
                                        label="Item"
                                        naked
                                        value={filter.item || null}
                                        onChange={(val) =>
                                            setFilter({
                                                ...filter,
                                                item: val || undefined,
                                            })
                                        }
                                    />
                                ),
                                ...(view == 'receiving'
                                    ? {
                                          ['Received by']: (
                                              <Box sx={{ minWidth: 160 }}>
                                                  <PersonField
                                                      label="Received by"
                                                      naked
                                                      value={
                                                          filter.fulfilled_by ||
                                                          null
                                                      }
                                                      onChange={(val) =>
                                                          setFilter({
                                                              ...filter,
                                                              fulfilled_by:
                                                                  val ||
                                                                  undefined,
                                                          })
                                                      }
                                                  />
                                              </Box>
                                          ),
                                      }
                                    : {
                                          ['Shipped by']: (
                                              <Box sx={{ minWidth: 160 }}>
                                                  <PersonField
                                                      label="Shipped by"
                                                      naked
                                                      value={
                                                          filter.fulfilled_by ||
                                                          null
                                                      }
                                                      onChange={(val) =>
                                                          setFilter({
                                                              ...filter,
                                                              fulfilled_by:
                                                                  val ||
                                                                  undefined,
                                                          })
                                                      }
                                                  />
                                              </Box>
                                          ),
                                      }),

                                Verified: (
                                    <VerificationField
                                        naked
                                        value={filter.verification_status}
                                        onChange={(verification_status) => {
                                            setFilter({
                                                ...filter,
                                                verification_status,
                                            });
                                        }}
                                    />
                                ),
                            }}
                        >
                            {{
                                PO: (bol) =>
                                    bol.orders.map((o) => o.code).join(', '),
                                BOL: (bol) => bol.code || '',
                                Vendor: (bol) => (
                                    <Box>
                                        <Typography variant="body2">
                                            {bol.from.company.name}
                                        </Typography>
                                        {bol.from.location && (
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                            >
                                                {bol.from.location.label ||
                                                    bol.from.location.address
                                                        ?.city ||
                                                    'Unknown location'}
                                            </Typography>
                                        )}
                                    </Box>
                                ),
                                Customer: (bol) => (
                                    <Box>
                                        <Typography variant="body2">
                                            {bol.to.company.name}
                                        </Typography>
                                    </Box>
                                ),
                                Destination: (bol) =>
                                    bol.to.location
                                        ? bol.to.location.label ||
                                          bol.to.location.address?.city ||
                                          'unkown location'
                                        : '',
                                Items: (bol) =>
                                    bol.contents
                                        .map((c) => c.item.english)
                                        .join(', '),
                                Verified: (bol) => {
                                    const fulfillments =
                                        bol[
                                            view == 'receiving'
                                                ? 'receipts'
                                                : 'shipments'
                                        ];

                                    const verifications = fulfillments
                                        .filter((f) => f.verification)
                                        .map((f) => f.verification);

                                    return fulfillments.length == 0 ? (
                                        ''
                                    ) : (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                fontSize: '2rem',
                                            }}
                                        >
                                            <AvatarGroup>
                                                {verifications.map((v, vi) =>
                                                    v ? (
                                                        <VerificationIcon
                                                            status={v?.status}
                                                            key={bol._id + vi}
                                                        />
                                                    ) : (
                                                        ''
                                                    )
                                                )}
                                            </AvatarGroup>
                                        </Box>
                                    );
                                },
                                [view == 'receiving'
                                    ? 'Received by'
                                    : 'Shipped by']: (bol) =>
                                    [
                                        ...new Set(
                                            bol[
                                                view == 'receiving'
                                                    ? 'receipts'
                                                    : 'shipments'
                                            ].map((r) => r.created_by.name)
                                        ),
                                    ].join(', '),
                            }}
                        </SmartTable>
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
