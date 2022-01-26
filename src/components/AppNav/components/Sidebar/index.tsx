import { useAuth0 } from '@auth0/auth0-react';
import {
    Box,
    IconButton,
    useTheme,
    ButtonBase,
    Tooltip,
    Avatar,
    Menu,
    MenuItem,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { AiFillBuild } from 'react-icons/ai';
import { BsFileEarmarkTextFill } from 'react-icons/bs';
import { BiCoinStack } from 'react-icons/bi';
import { FaTruckLoading } from 'react-icons/fa';
import {
    MdAccountCircle,
    MdChevronRight,
    MdDarkMode,
    MdFolderOpen,
    MdLightMode,
} from 'react-icons/md';
import { useNavigate } from 'react-router';
import { UiPermission } from '../../../../auth/UiPermission';
import usePermissions from '../../../../auth/usePermissions';
import { UserRole } from '../../../../auth/UserRole';
import { useThemeContext } from '../../../../providers/AppThemeProvider';
import Anima from '../../../Anima';
import Logo from '../../../Logo';
import NavGroup, { NavGroupProps } from './components/NavGroup';

const duration = 200;
const Sidebar = (): ReactElement => {
    const { user } = useAuth0();
    const { mode, setMode } = useThemeContext();
    const { roles, permissions } = usePermissions();
    const theme = useTheme();
    const nav = useNavigate();
    const fromStorage = localStorage.getItem('sidebar_expanded');
    const [expanded, setExpanded] = React.useState(
        fromStorage == 'false' ? false : true
    );

    const [anchorEl, setAnchorEl] = React.useState<
        null | (EventTarget & HTMLButtonElement)
    >(null);
    const open = Boolean(anchorEl);
    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {
        localStorage.setItem('sidebar_expanded', expanded ? 'true' : 'false');
    }, [expanded]);

    const focusedFromStorage = localStorage.getItem('sidebar_focus');

    const [focused, setFocused] = React.useState(focusedFromStorage || '');

    const [navTo, setNavTo] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (navTo) {
            const timeout = setTimeout(() => {
                setNavTo(null);
                nav(navTo);
            }, duration);
            return () => clearTimeout(timeout);
        }
    }, [navTo, nav]);

    React.useEffect(() => {
        localStorage.setItem('sidebar_focus', focused);
    }, [focused]);

    const click = ({ items, label }: NavGroupProps) => {
        if (items.length == 1) {
            setFocused('');
            setNavTo(items[0].url);
        } else if (items.length > 1) {
            setExpanded(true);
            setFocused(focused == label ? '' : label);
        }
    };

    const iconStyle: React.CSSProperties = {
        marginBottom: '4px',
    };

    const groups: {
        items: NavGroupProps['items'];
        label: string;
        icon: ReactElement;
        auth:
            | { _type: 'permission'; permission: UiPermission }
            | { _type: 'role'; role: UserRole };
    }[] = [
        // {
        //     icon: <BiCoinStack style={iconStyle} />,
        //     label: 'Accounting',
        //     items: [
        //         { label: 'Labour', url: '/accounting/labour' },
        //         { label: 'Pricing', url: '/accounting/pricing' },
        //     ],
        //     auth: { _type: 'permission', permission: UiPermission.Library },
        // },
        {
            icon: <MdFolderOpen style={iconStyle} />,
            label: 'Library',
            items: [
                { label: 'Companies', url: '/library/companies' },
                { label: 'Items', url: '/library/items' },
                { label: 'Products', url: '/library/products' },
                { label: 'Quality Checks', url: '/library/qualitychecks' },
                { label: 'Units', url: '/library/units' },
            ],
            auth: { _type: 'permission', permission: UiPermission.Library },
        },
        {
            icon: <FaTruckLoading style={iconStyle} />,
            label: 'Supply chain',
            items: [
                { label: 'Order Queue', url: '/logistics/orderqueue' },
                { label: 'Orders', url: '/logistics/orders' },
                { label: 'Statistics', url: '/logistics/statistics' },
                { label: 'Transportation', url: '/logistics/transportation' },
            ],
            auth: { _type: 'permission', permission: UiPermission.Logistics },
        },
        {
            icon: <MdAccountCircle style={iconStyle} />,
            label: 'People',
            items: [
                { label: 'Teams', url: '/people/teams' },
                { label: 'Profiles', url: '/people/profiles' },
            ],
            auth: { _type: 'role', role: UserRole.Manager },
        },
        {
            icon: <AiFillBuild style={iconStyle} />,
            label: 'Production',
            items: [
                { label: 'Mixing', url: '/production/mixing' },
                // { label: 'Packing', url: '/production/packing' },
                { label: 'Batch Reports', url: '/production/batchreports' },
            ],
            auth: {
                _type: 'permission',
                permission: UiPermission.ProductionManager,
            },
        },
        {
            icon: <BsFileEarmarkTextFill style={iconStyle} />,
            label: 'Recipes',
            items: [{ label: 'Recipes', url: '/recipes' }],
            auth: { _type: 'permission', permission: UiPermission.Recipes },
        },
        {
            icon: <FaTruckLoading style={iconStyle} />,
            label: 'Warehouse',
            items: [
                { label: 'Shipping', url: '/warehouse/shipping' },
                { label: 'Receiving', url: '/warehouse/receiving' },
            ],
            auth: {
                _type: 'permission',
                permission: UiPermission.WarehouseOperator,
            },
        },
    ];

    const navGroups: NavGroupProps[] = groups.map((group) => ({
        ...group,
        navTo,
        onClick: (d) => click(d),
        expanded: expanded,
        open: focused === group.label,
    }));

    return (
        <Box
            sx={{
                background: `linearGradient(${theme.palette.background.paper}, ${theme.palette.background.default})`,
                padding: 2,
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'flex-start',
                borderRight: `1px solid ${theme.palette.divider}`,
                zIndex: 35,
                position: 'inherit',
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    width: expanded ? 200 : 36,
                    transition: theme.transitions.create('width', {
                        duration: duration,
                    }),
                    overflow: 'hidden',
                    display: 'flex',
                    flexFlow: 'column',
                    gap: 0.5,
                }}
            >
                <Box sx={{ display: 'flex', paddingBottom: 2, paddingTop: 1 }}>
                    <Logo width={expanded ? 100 : 60} />
                </Box>
                {navGroups.map((group, index) => {
                    return <NavGroup {...group} key={'group_' + index} />;
                })}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                <Tooltip title="Color theme" placement="right" arrow>
                    <IconButton
                        onClick={() =>
                            setMode(mode == 'dark' ? 'light' : 'dark')
                        }
                    >
                        {mode == 'dark' ? <MdDarkMode /> : <MdLightMode />}
                    </IconButton>
                </Tooltip>
                <Anima in={expanded} type="rotate">
                    <IconButton onClick={() => setExpanded(!expanded)}>
                        <MdChevronRight />
                    </IconButton>
                </Anima>
                <ButtonBase
                    sx={{ borderRadius: 20 }}
                    onClick={(e) => handleClick(e)}
                >
                    <Avatar
                        sx={{ height: 40, width: 40 }}
                        src={user ? user.picture : undefined}
                        alt={user?.name}
                    />
                </ButtonBase>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={() => nav('/logout')}>Logout</MenuItem>
                </Menu>
            </Box>
        </Box>
    );
};

export default Sidebar;
