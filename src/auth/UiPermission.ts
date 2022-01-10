import { Permission } from './Permission';

export enum UiPermission {
    WarehouseOperator = 'Warehouse Operator',
    WarehouseVerification = 'Warehouse Verification',
    Logistics = 'Logistics',
    Library = 'Library',
}

export interface UiPermissionData {
    name: UiPermission;
    description: string;
    permissions: Permission[];
}

export const UiPermissions: UiPermissionData[] = [
    {
        name: UiPermission.WarehouseOperator,
        description: 'Perform the duties of shipping and receiving.',
        permissions: [
            Permission.GetItems,
            Permission.CreateItem,
            Permission.UpdateItem,
            Permission.GetBols,
            Permission.GetCompanies,
            Permission.GetConversions,
            Permission.GetFulfillments,
            Permission.CreateFulfillment,
            Permission.UpdateFulfillment,
            Permission.VerifyFulfillment,
            Permission.GetItems,
            Permission.GetItineraries,
            Permission.GetLocations,
            Permission.GetLots,
            Permission.GetOrders,
            Permission.GetQualityChecks,
            Permission.GetUnits,
        ],
    },
    {
        name: UiPermission.WarehouseVerification,
        description: 'Verify shipments and receipts.',
        permissions: [
            Permission.GetItems,
            Permission.CreateItem,
            Permission.UpdateItem,
            Permission.GetBols,
            Permission.GetCompanies,
            Permission.GetConversions,
            Permission.GetFulfillments,
            Permission.CreateFulfillment,
            Permission.UpdateFulfillment,
            Permission.VerifyFulfillment,
            Permission.GetItems,
            Permission.GetItineraries,
            Permission.GetLocations,
            Permission.GetLots,
            Permission.GetOrders,
            Permission.GetQualityChecks,
            Permission.GetUnits,
            Permission.UpdateFulfillment,
            Permission.VerifyFulfillment,
        ],
    },
    {
        name: UiPermission.Logistics,
        description: 'Manage inbound and outbound product.',
        permissions: [
            Permission.GetBols,
            Permission.CreateBol,
            Permission.UpdateBol,
            Permission.GetCompanies,
            Permission.GetContacts,
            Permission.GetConversions,
            Permission.CreateConversion,
            Permission.UpdateConversion,
            Permission.GetFulfillments,
            Permission.CreateFulfillment,
            Permission.UpdateFulfillment,
            Permission.GetItems,
            Permission.GetItineraries,
            Permission.CreateItinerary,
            Permission.UpdateItinerary,
            Permission.GetLocations,
            Permission.UpdateLocation,
            Permission.GetLots,
            Permission.GetOrders,
            Permission.CreateOrder,
            Permission.UpdateOrder,
            Permission.CreateOrderQueue,
            Permission.UpdateOrderQueue,
            Permission.GetQualityChecks,
            Permission.GetUnits,
        ],
    },
    {
        name: UiPermission.Library,
        description: 'Manage data like items and units in the library.',
        permissions: [
            Permission.GetUnits,
            Permission.CreateUnit,
            Permission.UpdateUnit,

            Permission.GetQualityChecks,
            Permission.CreateQualityCheck,
            Permission.UpdateQualityCheck,

            Permission.GetLocations,
            Permission.CreateLocation,
            Permission.UpdateLocation,

            Permission.GetItems,
            Permission.CreateItem,
            Permission.UpdateItem,

            Permission.GetConversions,
            Permission.CreateConversion,
            Permission.UpdateConversion,

            Permission.GetContacts,
            Permission.CreateContact,
            Permission.UpdateContact,

            Permission.GetCompanies,
            Permission.CreateCompany,
            Permission.UpdateCompany,
        ],
    },
];

export const getUiPermissions = (
    permissions: Permission[]
): UiPermissionData[] => {
    const res: UiPermissionData[] = [];

    for (const ui of UiPermissions) {
        if (ui.permissions.every((required) => permissions.includes(required)))
            res.push(ui);
    }

    return res;
};

export const getPermissions = (
    uiPermissions: UiPermissionData[]
): Permission[] => {
    return [...new Set(uiPermissions.map((perm) => perm.permissions).flat())];
};
