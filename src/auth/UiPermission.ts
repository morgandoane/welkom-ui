import { Permission } from './Permission';

export enum UiPermission {
    TrackExpenses = 'Track Expenses',
    WarehouseOperator = 'Warehouse Operator',
    WarehouseVerification = 'Warehouse Verification',
    Logistics = 'Logistics',
    Library = 'Library',
    Recipes = 'Recipes',
    ProductionManager = 'Production Manager',
    Mixing = 'Mixing',
}

export interface UiPermissionData {
    name: UiPermission;
    description: string;
    permissions: Permission[];
}

export const UiPermissions: UiPermissionData[] = [
    {
        name: UiPermission.TrackExpenses,
        description: 'Create, update, and analyze expenses.',
        permissions: [
            Permission.CreateExpenses,
            Permission.UpdateExpenses,
            Permission.GetExpenses,
        ],
    },
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
    {
        name: UiPermission.Recipes,
        description: 'View, create, and update recipes.',
        permissions: [
            Permission.GetConversions,
            Permission.CreateConversion,
            Permission.UpdateConversion,
            Permission.GetRecipeFolders,
            Permission.CreateRecipeFolder,
            Permission.UpdateRecipeFolder,
            Permission.GetItems,
            Permission.GetRecipes,
            Permission.CreateRecipe,
            Permission.UpdateRecipe,
            Permission.GetUnits,
        ],
    },
    {
        name: UiPermission.ProductionManager,
        description: 'Oversee Mixing & Packing.',
        permissions: [
            Permission.GetBatches,
            Permission.CreateBatch,
            Permission.UpdateBatch,
            Permission.GetCompanies,
            Permission.GetConversions,
            Permission.CreateConversion,
            Permission.UpdateConversion,
            Permission.GetRecipeFolders,
            Permission.CreateRecipeFolder,
            Permission.UpdateRecipeFolder,
            Permission.GetItems,
            Permission.GetLocations,
            Permission.GetLots,
            Permission.CreateLot,
            Permission.UpdateLot,
            Permission.GetRecipes,
            Permission.CreateRecipe,
            Permission.UpdateRecipe,
            Permission.GetUnits,
            Permission.GetMixingCards,
            Permission.CreateMixingCard,
            Permission.UpdateMixingCard,
        ],
    },
    {
        name: UiPermission.Mixing,
        description: 'Mix batches against recipes.',
        permissions: [
            Permission.GetBatches,
            Permission.CreateBatch,
            Permission.UpdateBatch,
            Permission.GetCompanies,
            Permission.GetConversions,
            Permission.GetRecipeFolders,
            Permission.GetItems,
            Permission.GetLocations,
            Permission.GetLots,
            Permission.CreateLot,
            Permission.UpdateLot,
            Permission.GetRecipes,
            Permission.GetUnits,
            Permission.GetMixingCards,
            Permission.UpdateMixingCard,
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
