import { Permission } from '../auth/Permission';
import { UserRole } from '../auth/UserRole';
import { DateRange } from '../utils/types/DateRange';

export interface BaseFilter {
    skip: number;
    take: number;
    deleted?: boolean;
    created_by?: string;
    date_created?: DateRange;
}

export enum ExpenseClass {
    Lot = 'Lot',
    Itinerary = 'Itinerary',
}

export type Names = {
    english: string;
    spanish: string;
};

export enum BaseUnit {
    Pounds = 'Pounds',
    Count = 'Count',
}

export enum UnitClass {
    Weight = 'Weight',
    Volume = 'Volume',
    Count = 'Count',
}

export type HoldFilter = BaseFilter;

export enum FolderClass {
    Recipe,
}

export interface BatchFilter extends BaseFilter {
    recipe_version: string;
    lot: string;
    location: string;
    company: string;
    production_line: string;
    date_completed: DateRange;
}

export interface BolFilter extends BaseFilter {
    itinerary: string;
    item: string;
    code: string;
    from_company: string;
    to_company: string;
    from_location: string;
    to_location: string;
}

export interface CompanyFilter extends BaseFilter {
    name?: string;
}

export interface ExpenseFilter extends BaseFilter {
    customer: string;
    vendor: string;
    against: string;
    expense_class: ExpenseClass;
}

export interface FolderFilter extends BaseFilter {
    folder_class: FolderClass;
}

export enum FulfillmentType {
    Receipt = 'Receipt',
    Shipment = 'Shipment',
}

export enum QualityCheckCategory {
    Production = 'Production',
    Receipt = 'Receipt',
    Shipment = 'Shipment',
}

export enum QualityCheckClass {
    Boolean = 'Boolean',
    Date = 'Date',
    Number = 'Number',
    Options = 'Options',
    Text = 'Text',
}

export enum DesignLocation {
    'Draper' = 'Draper',
    'WestJordan' = 'WestJordan',
    'Misc' = 'Misc',
}

export enum DesignCategory {
    'Conveyor' = 'Conveyor',
    'Sprial' = 'Sprial',
    'Oven' = 'Oven',
    'Packing' = 'Packing',
}

export interface CreateDesignInput {
    part_number: string;
    location: DesignLocation;
    category: DesignCategory;
    parent: string | null;
    description?: string | null;
}

export interface UpdateDesignInput extends CreateDesignInput {
    deleted?: boolean;
}

export interface DesignFilter extends BaseFilter {
    part_number?: string;
    location?: DesignLocation;
    category?: DesignCategory;
    parent?: string;
    description?: string;
}

export interface FulfillmentFilter extends BaseFilter {
    bol?: string;
}

export interface IngredientFilter extends BaseFilter {
    name?: string;
}

export interface ItineraryFilter extends BaseFilter {
    carrier?: string;
    commissioned_by?: string;
    code?: string;
}

export interface LocationFilter extends BaseFilter {
    company?: string;
    label?: string;
}

export interface LotFilter extends BaseFilter {
    code?: string;
    item?: string;
    company?: string;
    location?: string;
}

export interface MiscItemFilter extends BaseFilter {
    name?: string;
}

export type OrganizationFilter = BaseFilter;

export interface PackagingFilter extends BaseFilter {
    name?: string;
}

export interface ProductFilter extends BaseFilter {
    name?: string;
    upc?: string;
}

export type UnitFilter = BaseFilter;

export type RecipeVersionFilter = BaseFilter;

export type RecipeFilter = BaseFilter;

export interface QualityCheckFilter extends BaseFilter {
    prompt?: string;
    item_name?: string;
}

export interface ProfileFilter extends BaseFilter {
    ids?: string[];
}

export type TeamFilter = BaseFilter;

export interface CreateHoldInput {
    reason: string;
    propagating: boolean;
    lots: [string];
    resolution: HoldResolutionInput;
}

export interface HoldResolutionInput {
    action: string;
}

export interface UpdateHoldInput {
    reason: string;
    propagating: boolean;
    lots: [string];
    resolution: HoldResolutionInput;
}

export interface CreateBatchInput {
    recipe_version: string;
    location: string;
    company: string;
    production_line: string;
}

export interface UpdateBatchInput {
    location: string;
    company: string;
    production_line: string;
    deleted: boolean;
}

export interface CreateBolInput {
    itinerary: string;
    code: string;
    contents: BolContentInput[];
    from: AppointmentInput;
    to: AppointmentInput;
}

export interface BolContentInput {
    item: string;
    client_quantity: number;
    client_unit: string;
    pallet_configuration: PalletConfigurationInput;
}

export interface PalletConfigurationInput {
    capacity: number | null;
    name: string;
}

export interface AppointmentInput {
    date: Date;
    time_sensitive: boolean;
    company: string;
    location: string;
}

export interface UpdateBolInput {
    deleted: boolean;
    code: string;
    contents: BolContentInput[];
    from: AppointmentInput;
    to: AppointmentInput;
}

export interface CreateCompanyInput {
    name: string;
    contacts: ContactInput[];
}

export interface UpdateCompanyInput {
    name: string;
    deleted?: boolean;
    contacts: ContactInput[];
}

export interface CreateExpenseInput {
    amount: number;
    customer: string;
    vendor: string;
    expense_class: ExpenseClass;
    against: string;
}

export interface UpdateExpenseInput {
    deleted: boolean;
    amount: number;
    customer: string;
    vendor: string;
}

export interface CreateFolderInput {
    class: FolderClass;
    name: string;
    parent: string;
}

export interface UpdateFolderInput {
    deleted: boolean;
    name: string;
    parent: string;
}

export interface CreateFulfillmentInput {
    type: FulfillmentType;
    bol: string;
    contents: FulfillmentLotFinder[];
}

export interface FulfillmentLotFinder {
    fulfilllment_type: string;
    identifier: string;
    company: string;
    item: string;
    client_quantity: number;
    client_unit: string;
    pallet_configuration: PalletConfigurationInput;
    quality_check_responses: QualityCheckResponseInput[];
}

export interface QualityCheckResponseInput {
    quality_check: string;
    response: string;
}

export interface UpdateFulfillmentInput {
    contents: FulfillmentLotFinder[];
    deleted: boolean;
}

export enum IngredientUnitClass {
    Weight = 'Weight',
    Volume = 'Volume',
}

export interface CreateIngredientInput {
    unit_class: IngredientUnitClass;
    names: NamesInput;
    base_unit: BaseUnit;
    per_base_unit: number | null;
    pallet_configurations: PalletConfigurationInput[];
}

export interface NamesInput {
    english: string;
    spanish: string;
}

export interface UpdateIngredientInput {
    deleted: boolean;
    names: NamesInput;
    unit_class: IngredientUnitClass;
    pallet_configurations: PalletConfigurationInput[];
    per_base_unit: number | null;
}

export interface CreateItineraryInput {
    code: string;
    carrier: string;
    commissioned_by: string;
}

export interface UpdateItineraryInput {
    deleted: boolean;
    code: string;
    carrier: string;
    commissioned_by: string;
}

export interface CreateLocationInput {
    company: string;
    label: string;
    address?: AddressInput | null;
}

export interface ContactInput {
    name: string;
    email: string;
    title?: string | null;
    email_on_order: boolean;
    cc_on_order: boolean;
}

export interface AddressInput {
    line_1: string;
    line_2?: string | null;
    city: string;
    state: string;
    postal: string;
    country?: string | null;
}

export interface UpdateLocationInput {
    label?: string;
    address?: AddressInput | null;
    deleted?: boolean;
}

export interface CreateLotInput {
    code: string;
    item: string;
    company: string;
    location: string;
    production_line: string;
    contents: LotContentInput[];
    quantity: number;
    base_unit: BaseUnit;
}

export interface LotContentInput {
    lot: string;
    quantity: number;
    base_unit: BaseUnit;
    client_quantity: number;
    client_unit: string;
}

export interface UpdateLotInput {
    deleted: boolean;
    code: string;
    item: string;
    company: string;
    location: string;
    production_line: string;
    contents: LotContentInput[];
    quantity: number;
}

export interface CreateMiscItemInput {
    names: NamesInput;
    base_unit: BaseUnit;
    per_base_unit: number | null;
    pallet_configurations: PalletConfigurationInput[];
}

export interface UpdateMiscItemInput {
    deleted: boolean;
    names: NamesInput;
    pallet_configurations: PalletConfigurationInput[];
    per_base_unit: number | null;
}

export interface CreateOrganizationInput {
    name: string;
    companies: string[];
}

export interface UpdateOrganizationInput {
    deleted: boolean;
    name: string;
    companies: string[];
}

export interface CreatePackagingInput {
    names: NamesInput;
    base_unit: BaseUnit;
    per_base_unit: number | null;
    pallet_configurations: PalletConfigurationInput[];
}

export interface UpdatePackagingInput {
    deleted: boolean;
    names: NamesInput;
    pallet_configurations: PalletConfigurationInput[];
}

export interface CreateProductInput {
    names: NamesInput;
    base_unit: BaseUnit;
    per_base_unit: number | null;
    pallet_configurations: PalletConfigurationInput[];
    upc: string;
    company: string;
}

export interface UpdateProductInput {
    deleted: boolean;
    names: NamesInput;
    pallet_configurations: PalletConfigurationInput[];
    upc: string;
    company: string;
}

export interface CreateUnitInput {
    names: NamesPluralInput;
    unit_class: UnitClass;
    to_base_unit: number | null;
}

export interface NamesPluralInput {
    english: string;
    spanish: string;
    english_plural: string;
    spanish_plural: string;
}

export interface UpdateUnitInput {
    deleted: boolean;
    names: NamesPluralInput;
    unit_class: UnitClass;
    to_base_unit: number | null;
}

export interface CreateRecipeVersionInput {
    recipe: string;
    sections: RecipeSectionInput[];
    parameters: string[];
}

export interface RecipeSectionInput {
    label: string;
    steps: RecipeStepInput[];
}

export interface RecipeStepInput {
    instruction: NamesInput;
    content: RecipeStepContentInput;
}

export interface RecipeStepContentInput {
    items: string[];
    client_quantity: number;
    client_unit: string;
}

export interface UpdateRecipeVersionInput {
    deleted: boolean;
    parameters: string[];
}

export interface CreateRecipeInput {
    name: string;
    item: string;
    folder: string;
}

export interface UpdateRecipeInput {
    deleted: boolean;
    name: string;
    item: string;
    folder: string;
}

export interface CreateQualityCheckInput {
    quality_check_category: QualityCheckCategory;
    quality_check_class: QualityCheckClass;
    required: boolean;
    prompt: NamesInput;
    help: NamesInput | null;
    number_range: NumberRangeInput | null;
    options: QualityCheckOptionInput[] | null;
    item: string | null;
}

export interface NumberRangeInput {
    min: number | null;
    max: number | null;
}

export interface QualityCheckOptionInput {
    value: string;
    acceptable: boolean;
}

export interface UpdateQualityCheckInput {
    deleted: boolean;
    quality_check_category: QualityCheckCategory;
    quality_check_class: QualityCheckClass;
    required: boolean;
    prompt: NamesInput;
    help: NamesInput | null;
    number_range: NumberRangeInput | null;
    options: QualityCheckOptionInput[] | null;
    item: string | null;
}

export interface CreateProfileInput {
    role: UserRole;
    given_name: string;
    family_name: string;
    email: string | null;
    username: string | null;
    phone_number: string;
    temporary_password: string;
}

export interface UpdateProfileInput {
    role: UserRole;
    given_name: string;
    family_name: string;
    email?: string | null;
    username?: string | null;
    password?: string;
    deleted?: boolean;
    blocked?: boolean;
}

export interface CreateProductionLineInput {
    name: string;
    location: string;
}

export interface UpdateProductionLineInput {
    name: string;
}

export interface CreateTeamInput {
    name: string;
    company: string;
    location: string | null;
    permissions: Permission[];
    members: string[];
}

export interface UpdateTeamInput {
    deleted: boolean;
    name: string;
    company: string;
    location: string | null;
    permissions: Permission[];
    members: string[];
}
