import React from 'react';
import { ReactNode } from 'react';
import { getUiPermissions, UiPermission } from '../../../../auth/UiPermission';
import { UserRole } from '../../../../auth/UserRole';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import DesignServices from '@mui/icons-material/DesignServices';
import EscalatorTwoToneIcon from '@mui/icons-material/EscalatorTwoTone';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import AssignmentReturnTwoToneIcon from '@mui/icons-material/AssignmentReturnTwoTone';
import PersonPinTwoToneIcon from '@mui/icons-material/PersonPinTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import usePermissions from '../../../../auth/usePermissions';
import { SxProps, Theme } from '@mui/material';
import { MdDesignServices } from 'react-icons/md';

export interface AppNavRoute {
    icon: ReactNode;
    children: [string, string][];
    auth:
        | { type: 'role'; role: UserRole }
        | { type: 'permission'; permission: UiPermission }
        | null;
}

const iconStyles: SxProps<Theme> = { fontSize: '1.75rem' };

const AppNavRoutes: Record<string, AppNavRoute> = {
    Design: {
        icon: <DesignServices sx={{ ...iconStyles }} />,
        children: [['Designs', '/design']],
        auth: { type: 'permission', permission: UiPermission.Design },
    },
    Library: {
        icon: <LibraryBooksTwoToneIcon sx={{ ...iconStyles }} />,
        children: [
            ['Companies', '/library/companies'],
            ['Misc Items', '/library/miscitems'],
            ['Ingredients', '/library/ingredients'],
            ['Packaging', '/library/packaging'],
            ['Products', '/library/products'],
            ['Quality Checks', '/library/qualitychecks'],
            ['Units', '/library/units'],
        ],
        auth: { type: 'permission', permission: UiPermission.Library },
    },
    People: {
        icon: <PersonPinTwoToneIcon sx={{ ...iconStyles }} />,
        children: [
            ['Profiles', '/people/accounts'],
            ['Teams', '/people/teams'],
        ],
        auth: { type: 'role', role: UserRole.Manager },
    },
    Production: {
        icon: <EscalatorTwoToneIcon sx={{ ...iconStyles }} />,
        children: [
            ['Mixing Schedule', '/production/mixing'],
            ['Batch Reports', '/production/batchreports'],
        ],
        auth: {
            type: 'permission',
            permission: UiPermission.ProductionManager,
        },
    },
    Recipes: {
        icon: <AssignmentTwoToneIcon sx={{ ...iconStyles }} />,
        children: [['Recipes', '/recipes']],
        auth: { type: 'permission', permission: UiPermission.Recipes },
    },
    ['Supply Chain']: {
        icon: <AssignmentReturnTwoToneIcon sx={{ ...iconStyles }} />,
        children: [
            ['Transportation', '/supplychain/transportation'],
            ['Statistics', '/supplychain/statistics'],
        ],
        auth: { type: 'permission', permission: UiPermission.Logistics },
    },
    Traceability: {
        icon: <AccountTreeTwoToneIcon sx={{ ...iconStyles }} />,
        children: [
            ['Holds', '/traceability/holds'],
            ['Node Map', '/traceability/nodemap'],
        ],
        auth: { type: 'role', role: UserRole.Manager },
    },
    Warehouse: {
        icon: <LocalShippingTwoToneIcon sx={{ ...iconStyles }} />,
        children: [
            ['Shipping', '/warehouse/shipping'],
            ['Receiving', '/warehouse/receiving'],
        ],
        auth: {
            type: 'permission',
            permission: UiPermission.WarehouseOperator,
        },
    },
};

export const useNavRoutes = (): Record<string, AppNavRoute> => {
    const { roles, permissions } = usePermissions();

    const uiPermissions = getUiPermissions(permissions);

    return Object.keys(AppNavRoutes).reduce((stack, item) => {
        const props = AppNavRoutes[item];
        if (!props.auth) {
            stack[item] = props;
        } else {
            if (props.auth.type == 'permission') {
                if (
                    uiPermissions
                        .map((u) => u.name)
                        .includes(props.auth.permission) ||
                    roles.includes(UserRole.Admin) ||
                    roles.includes(UserRole.Manager)
                ) {
                    stack[item] = props;
                }
            } else {
                switch (props.auth.role) {
                    case UserRole.Admin: {
                        if (roles.includes(UserRole.Admin)) stack[item] = props;
                        break;
                    }
                    case UserRole.Manager: {
                        if (
                            roles.includes(UserRole.Admin) ||
                            roles.includes(UserRole.Manager)
                        )
                            stack[item] = props;
                        break;
                    }
                }
            }
        }
        return stack;
    }, {} as Record<string, AppNavRoute>);
};
