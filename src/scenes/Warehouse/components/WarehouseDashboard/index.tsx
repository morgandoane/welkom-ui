import { Box, Button, capitalize } from '@mui/material';
import React, { ReactElement } from 'react';
import { MdCalendarToday, MdTableRows } from 'react-icons/md';
import { RiShieldFlashFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import AppNav from '../../../../components/AppNav';
import ButtonToggle from '../../../../components/ButtonToggle';
import ColumnBox from '../../../../components/Layout/ColumnBox';
import PageTitle from '../../../../components/PageTitle';
import ViewFade from '../../../../components/ViewFade';
import { useMemory } from '../../../../hooks/useMemory';
import WarehouseCalendar from './components/WarehouseCalendar';
import WarehouseTable from './components/WarehouseTable';

export interface WarehouseDashboardProps {
    view: 'shipping' | 'receiving';
}

const WarehouseDashboard = (props: WarehouseDashboardProps): ReactElement => {
    const { view } = props;

    const nav = useNavigate();

    const [{ mode }, setMode] = useMemory<{ mode: 'Calendar' | 'Table' }>(
        'warehouse',
        { mode: 'Table' }
    );

    const [childLoading, setChildLoading] = React.useState(false);

    return (
        <AppNav loading={childLoading}>
            <ColumnBox>
                {{
                    header: (
                        <Box sx={{ display: 'flex' }}>
                            <PageTitle>{capitalize(view)}</PageTitle>
                            <Box sx={{ flex: 1 }} />
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                {/* {view == 'receiving' && (
                                    <Button
                                        onClick={() => nav('flash')}
                                        startIcon={<RiShieldFlashFill />}
                                        color="inherit"
                                        size="large"
                                        sx={{ width: 260 }}
                                    >
                                        Flash Receipt
                                    </Button>
                                )} */}
                                <ButtonToggle
                                    options={[
                                        {
                                            id: 'Calendar',
                                            label: 'Calendar',
                                            icon: <MdCalendarToday />,
                                        },
                                        {
                                            id: 'Table',
                                            label: 'Table',
                                            icon: <MdTableRows />,
                                        },
                                    ]}
                                    value={{ id: mode, label: mode }}
                                    onChange={(val) => {
                                        setMode({
                                            mode: val.id as
                                                | 'Calendar'
                                                | 'Table',
                                        });
                                    }}
                                />
                            </Box>
                        </Box>
                    ),
                    content: (
                        <ViewFade index={mode == 'Table' ? 0 : 1}>
                            <Box
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexFlow: 'column',
                                }}
                            >
                                <WarehouseTable
                                    setLoading={(d) => setChildLoading(d)}
                                    view={view}
                                />
                            </Box>
                            <Box
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexFlow: 'column',
                                }}
                            >
                                <WarehouseCalendar view={view} />
                            </Box>
                        </ViewFade>
                    ),
                }}
            </ColumnBox>
        </AppNav>
    );
};

export default WarehouseDashboard;
