import { Permission } from './Permission';

export interface UiPermission {
    name: string;
    description: string;
    permissions: Permission[];
}

export const UiPermissions: UiPermission[] = [
    {
        name: 'Manage items',
        description: 'Create, update, and delete items in the library',
        permissions: [Permission.CreateItem],
    },
];

export const getUiPermissions = (permissions: Permission[]): UiPermission[] => {
    const res: UiPermission[] = [];

    for (const ui of UiPermissions) {
        if (ui.permissions.every((required) => permissions.includes(required)))
            res.push(ui);
    }

    return res;
};

export const getPermissions = (uiPermissions: UiPermission[]): Permission[] => {
    return [...new Set(uiPermissions.map((perm) => perm.permissions).flat())];
};
