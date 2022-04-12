import {
    HoldFilter,
    BatchFilter,
    BolFilter,
    CompanyFilter,
    ExpenseFilter,
    FolderFilter,
    FulfillmentFilter,
    IngredientFilter,
    LocationFilter,
    LotFilter,
    MiscItemFilter,
    OrganizationFilter,
    PackagingFilter,
    ProductFilter,
    UnitFilter,
    RecipeVersionFilter,
    RecipeFilter,
    QualityCheckFilter,
    ProfileFilter,
    TeamFilter,
} from './inputsTypes';

export interface HoldsQueryArgs {
    filter: HoldFilter;
}

export interface HoldQueryArgs {
    id: string;
}

export interface BatchesQueryArgs {
    filter: BatchFilter;
}

export interface BatchQueryArgs {
    id: string;
}

export interface BolsQueryArgs {
    filter: BolFilter;
}

export interface BolQueryArgs {
    id: string;
}

export interface CompaniesQueryArgs {
    filter: CompanyFilter;
}

export interface CompanyQueryArgs {
    id: string;
}

export interface ExpensesQueryArgs {
    filter: ExpenseFilter;
}

export interface ExpenseQueryArgs {
    id: string;
}

export interface FoldersQueryArgs {
    filter: FolderFilter;
}

export interface FolderQueryArgs {
    id: string;
}

export interface FulfillmentsQueryArgs {
    filter: FulfillmentFilter;
}

export interface FulfillmentQueryArgs {
    id: string;
}

export interface IngredientsQueryArgs {
    filter: IngredientFilter;
}

export interface IngredientQueryArgs {
    id: string;
}

export interface ItineraryQueryArgs {
    id: string;
}

export interface LocationsQueryArgs {
    filter: LocationFilter;
}

export interface LocationQueryArgs {
    id: string;
}

export interface LotsQueryArgs {
    filter: LotFilter;
}

export interface LotQueryArgs {
    id: string;
}

export interface MiscItemsQueryArgs {
    filter: MiscItemFilter;
}

export interface MiscItemQueryArgs {
    id: string;
}

export interface OrganizationsQueryArgs {
    filter: OrganizationFilter;
}

export interface OrganizationQueryArgs {
    id: string;
}

export interface PackagingsQueryArgs {
    filter: PackagingFilter;
}

export interface PackagingQueryArgs {
    id: string;
}

export interface ProductsQueryArgs {
    filter: ProductFilter;
}

export interface ProductQueryArgs {
    id: string;
}

export interface UnitsQueryArgs {
    filter: UnitFilter;
}

export interface UnitQueryArgs {
    id: string;
}

export interface RecipeVersionsQueryArgs {
    filter: RecipeVersionFilter;
}

export interface RecipeVersionQueryArgs {
    id: string;
}

export interface RecipesQueryArgs {
    filter: RecipeFilter;
}

export interface RecipeQueryArgs {
    id: string;
}

export interface QualityChecksQueryArgs {
    filter: QualityCheckFilter;
}

export interface QualityCheckQueryArgs {
    id: string;
}

export interface ProfilesQueryArgs {
    filter: ProfileFilter;
}

export interface ProfileQueryArgs {
    id: string;
}

export interface ProductionLineQueryArgs {
    id: string;
}

export interface TeamsQueryArgs {
    filter: TeamFilter;
}

export interface TeamQueryArgs {
    id: string;
}
