import React, { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserRole } from '../../../auth/UserRole';
import {
    BaseUnit,
    DesignCategory,
    DesignLocation,
    IngredientUnitClass,
    QualityCheckCategory,
    QualityCheckClass,
    UnitClass,
} from '../../../graphql/inputsTypes';
import { CompaniesQuery } from '../../../graphql/schema/Company/useCompanies';
import { useCompany } from '../../../graphql/schema/Company/useCompany';
import { useCompanyCreation } from '../../../graphql/schema/Company/useCompanyCreation';
import { useCompanyUpdate } from '../../../graphql/schema/Company/useCompanyUpdate';
import {
    DesignQuery,
    useDesign,
} from '../../../graphql/schema/Design/useDesign';
import { useDesignCreation } from '../../../graphql/schema/Design/useDesignCreation';
import { DesignsQuery } from '../../../graphql/schema/Design/useDesigns';
import { useDesignUpdate } from '../../../graphql/schema/Design/useDesignUpdate';
import {
    IngredientQuery,
    useIngredient,
} from '../../../graphql/schema/Item/extensions/Ingredient/useIngredient';
import { useIngredientCreation } from '../../../graphql/schema/Item/extensions/Ingredient/useIngredientCreation';
import { useIngredientUpdate } from '../../../graphql/schema/Item/extensions/Ingredient/useIngredientUpdate';
import { useMiscItem } from '../../../graphql/schema/Item/extensions/Misc/useMiscItem';
import { useMiscItemCreation } from '../../../graphql/schema/Item/extensions/Misc/useMiscItemCreation';
import { MiscItemsQuery } from '../../../graphql/schema/Item/extensions/Misc/useMiscItems';
import { useMiscItemUpdate } from '../../../graphql/schema/Item/extensions/Misc/useMiscItemUpdate';
import { usePackage } from '../../../graphql/schema/Item/extensions/Packaging/usePackage';
import { usePackagingCreation } from '../../../graphql/schema/Item/extensions/Packaging/usePackagingCreation';
import { usePackagingUpdate } from '../../../graphql/schema/Item/extensions/Packaging/usePackagingUpdate';
import {
    ProductQuery,
    useProduct,
} from '../../../graphql/schema/Item/extensions/Product/useProduct';
import { useProductCreation } from '../../../graphql/schema/Item/extensions/Product/useProductCreation';
import { useProductUpdate } from '../../../graphql/schema/Item/extensions/Product/useProductUpdate';
import { useLocation } from '../../../graphql/schema/Location/useLocation';
import { useLocationCreation } from '../../../graphql/schema/Location/useLocationCreation';
import { LocationsQuery } from '../../../graphql/schema/Location/useLocations';
import { useLocationUpdate } from '../../../graphql/schema/Location/useLocationUpdate';
import {
    ProfileQuery,
    useProfile,
} from '../../../graphql/schema/Profile/useProfile';
import { useProfileCreation } from '../../../graphql/schema/Profile/useProfileCreation';
import { ProfilesQuery } from '../../../graphql/schema/Profile/useProfiles';
import { useProfileUpdate } from '../../../graphql/schema/Profile/useProfileUpdate';
import {
    QualityCheckQuery,
    useQualityCheck,
} from '../../../graphql/schema/QualityCheck/useQualityCheck';
import { useQualityCheckCreation } from '../../../graphql/schema/QualityCheck/useQualityCheckCreation';
import { useQualityCheckUpdate } from '../../../graphql/schema/QualityCheck/useQualityCheckUpdate';
import { useTeam } from '../../../graphql/schema/Team/useTeam';
import { useTeamCreation } from '../../../graphql/schema/Team/useTeamCreation';
import { TeamsQuery } from '../../../graphql/schema/Team/useTeams';
import { useTeamUpdate } from '../../../graphql/schema/Team/useTeamUpdate';
import { useUnit } from '../../../graphql/schema/Unit/useUnit';
import { useUnitCreation } from '../../../graphql/schema/Unit/useUnitCreation';
import { UnitsQuery } from '../../../graphql/schema/Unit/useUnits';
import { useUnitUpdate } from '../../../graphql/schema/Unit/useUnitUpdate';
import Product from '../../../scenes/Library/components/Products/components/Product';
import AppForm from './components/AppForm';
import AccountFormRender from './components/forms/Account';
import CompanyFormRender from './components/forms/Company';
import DesignFormRender from './components/forms/Design';
import IngredientFormRender from './components/forms/Ingredient';
import LocationFormRender from './components/forms/Location';
import MiscItemFormRender from './components/forms/MiscItem';
import PackagingFormRender from './components/forms/Packaging';
import ProductFormRender from './components/forms/Product';
import QualityCheckFormRender from './components/forms/QualityCheck';
import TeamFormRender from './components/forms/Team';
import UnitFormRender from './components/forms/Unit';

const CompanyForm = () => {
    const nav = useNavigate();

    return (
        <AppForm
            entity="Company"
            creationHook={useCompanyCreation}
            updateHook={useCompanyUpdate}
            stateHook={useCompany}
            stateHandler={({ company }) => {
                return {
                    id: company._id,
                    data: {
                        name: company.name,
                        contacts: company.contacts.map((c) => ({
                            name: c.name,
                            email: c.email,
                            cc_on_order: c.cc_on_order,
                            email_on_order: c.email_on_order,
                            title: c.title,
                        })),
                    },
                };
            }}
            defaultState={{ data: { name: '', contacts: [] } }}
            form={CompanyFormRender}
            handler={{
                onCreated: (d) =>
                    nav('/library/companies/' + Object.values(d)[0]._id),
                onDeleted: (d) => nav('/library/companies'),
                onUpdated: (d) =>
                    nav('/library/companies/' + Object.values(d)[0]._id),
            }}
            refetch={[CompaniesQuery]}
        />
    );
};

const LocationForm = () => {
    const nav = useNavigate();
    const { company_id } = useParams();

    return (
        <AppForm
            entity="Location"
            creationHook={useLocationCreation}
            updateHook={useLocationUpdate}
            stateHook={useLocation}
            stateHandler={({ location }) => {
                return {
                    id: location._id,
                    data: {
                        label: location.label,
                        address: location.address
                            ? {
                                  line_1: location.address.line_1,
                                  line_2: location.address.line_2,
                                  city: location.address.city,
                                  state: location.address.state,
                                  postal: location.address.postal,
                                  country: location.address.country,
                              }
                            : undefined,
                    },
                };
            }}
            defaultState={{
                data: {
                    company: company_id || '',
                    label: '',
                    address: {
                        line_1: '',
                        city: '',
                        state: '',
                        postal: '',
                        country: 'USA',
                    },
                },
            }}
            form={LocationFormRender}
            handler={{
                onCreated: (d) => nav('/library/companies/' + company_id),
                onDeleted: (d) => nav('/library/companies/' + company_id),
                onUpdated: (d) => nav('/library/companies/' + company_id),
            }}
            refetch={[LocationsQuery]}
        />
    );
};

const PackagingForm = () => {
    const nav = useNavigate();
    const { packaging_id } = useParams();

    return (
        <AppForm
            entity="Package"
            creationHook={usePackagingCreation}
            updateHook={usePackagingUpdate}
            stateHook={usePackage}
            stateHandler={({ packaging: item }) => {
                return {
                    id: item._id,
                    data: {
                        names: {
                            english: item.names.english,
                            spanish: item.names.spanish,
                        },
                        deleted: item.deleted,
                    },
                };
            }}
            defaultState={{
                data: {
                    base_unit: BaseUnit.Count,
                    per_base_unit: 1,
                    names: {
                        english: '',
                        spanish: '',
                    },
                },
            }}
            form={PackagingFormRender}
            handler={{
                onCreated: (d) =>
                    nav('/library/packaging/' + Object.values(d)[0]._id),
                onDeleted: (d) => nav('/library/packaging'),
                onUpdated: (d) =>
                    nav('/library/packaging/' + Object.values(d)[0]._id),
            }}
            refetch={[LocationsQuery]}
        />
    );
};

const MiscItemForm = () => {
    const nav = useNavigate();

    return (
        <AppForm
            entity="Misc Item"
            creationHook={useMiscItemCreation}
            updateHook={useMiscItemUpdate}
            stateHook={useMiscItem}
            stateHandler={({ miscItem: item }) => {
                return {
                    id: item._id,
                    data: {
                        names: {
                            english: item.names.english,
                            spanish: item.names.spanish,
                        },
                        per_base_unit: item.per_base_unit,
                        deleted: item.deleted,
                    },
                };
            }}
            defaultState={{
                data: {
                    base_unit: BaseUnit.Count,
                    per_base_unit: 1,
                    names: {
                        english: '',
                        spanish: '',
                    },
                },
            }}
            form={MiscItemFormRender}
            handler={{
                onCreated: (d) =>
                    nav('/library/miscitems/' + Object.values(d)[0]._id),
                onDeleted: (d) => nav('/library/miscitems'),
                onUpdated: (d) =>
                    nav('/library/miscitems/' + Object.values(d)[0]._id),
            }}
            refetch={[MiscItemsQuery]}
        />
    );
};

const IngredientForm = () => {
    const nav = useNavigate();

    return (
        <AppForm
            entity="Ingredient"
            creationHook={useIngredientCreation}
            updateHook={useIngredientUpdate}
            stateHook={useIngredient}
            stateHandler={({ ingredient: item }) => {
                return {
                    id: item._id,
                    data: {
                        names: {
                            english: item.names.english,
                            spanish: item.names.spanish,
                        },
                        unit_class: item.unit_class,
                        per_base_unit: 1,
                        deleted: item.deleted,
                    },
                };
            }}
            defaultState={{
                data: {
                    unit_class: IngredientUnitClass.Weight,
                    base_unit: BaseUnit.Pounds,
                    per_base_unit: 1,
                    names: {
                        english: '',
                        spanish: '',
                    },
                },
            }}
            form={IngredientFormRender}
            handler={{
                onCreated: (d) =>
                    nav('/library/ingredients/' + Object.values(d)[0]._id),
                onDeleted: (d) => nav('/library/ingredients'),
                onUpdated: (d) =>
                    nav('/library/ingredients/' + Object.values(d)[0]._id),
            }}
            refetch={[IngredientQuery]}
        />
    );
};

const ProductForm = () => {
    const nav = useNavigate();

    return (
        <AppForm
            entity="Product"
            creationHook={useProductCreation}
            updateHook={useProductUpdate}
            stateHook={useProduct}
            stateHandler={({ product: item }) => {
                return {
                    id: item._id,
                    data: {
                        names: {
                            english: item.names.english,
                            spanish: item.names.spanish,
                        },
                        deleted: item.deleted,

                        upc: item.upc,
                        company: item.company._id,
                    },
                };
            }}
            defaultState={{
                data: {
                    base_unit: BaseUnit.Pounds,
                    per_base_unit: 1,
                    names: {
                        english: '',
                        spanish: '',
                    },

                    upc: '',
                    company: '',
                },
            }}
            form={ProductFormRender}
            handler={{
                onCreated: (d) =>
                    nav('/library/products/' + Object.values(d)[0]._id),
                onDeleted: (d) => nav('/library/products'),
                onUpdated: (d) =>
                    nav('/library/products/' + Object.values(d)[0]._id),
            }}
            refetch={[ProductQuery]}
        />
    );
};

const QualityCheckForm = () => {
    const nav = useNavigate();

    return (
        <AppForm
            entity="Quality Check"
            creationHook={useQualityCheckCreation}
            updateHook={useQualityCheckUpdate}
            stateHook={useQualityCheck}
            stateHandler={({ qualityCheck: qc }) => {
                return {
                    id: qc._id,
                    data: {
                        item: qc.item ? qc.item._id : null,
                        deleted: qc.deleted,
                        quality_check_category: qc.quality_check_category,
                        quality_check_class: qc.quality_check_class,
                        required: qc.required,
                        prompt: {
                            english: qc.prompt.english,
                            spanish: qc.prompt.spanish,
                        },
                        help: qc.help
                            ? {
                                  english: qc.help.english,
                                  spanish: qc.help.spanish,
                              }
                            : null,
                        number_range: qc.number_range
                            ? {
                                  min: qc.number_range.min,
                                  max: qc.number_range.max,
                              }
                            : null,
                        options: qc.options
                            ? qc.options.map((op) => ({
                                  value: op.value,
                                  acceptable: op.acceptable,
                              }))
                            : null,
                    },
                };
            }}
            defaultState={{
                data: {
                    item: '',
                    quality_check_category: QualityCheckCategory.Receipt,
                    quality_check_class: QualityCheckClass.Text,
                    required: false,
                    prompt: {
                        english: '',
                        spanish: '',
                    },
                    help: null,
                    number_range: null,
                    options: null,
                },
            }}
            form={QualityCheckFormRender}
            handler={{
                onCreated: (d) =>
                    nav('/library/qualitychecks/' + Object.values(d)[0]._id),
                onDeleted: (d) => nav('/library/qualitychecks'),
                onUpdated: (d) =>
                    nav('/library/qualitychecks/' + Object.values(d)[0]._id),
            }}
            refetch={[QualityCheckQuery]}
        />
    );
};

const DesignForm = () => {
    const nav = useNavigate();
    const { parent, location, category } = useParams();

    return (
        <AppForm
            entity="Design"
            creationHook={useDesignCreation}
            updateHook={useDesignUpdate}
            stateHook={useDesign}
            stateHandler={({ design }) => {
                return {
                    id: design._id,
                    data: {
                        part_number: design.part_number,
                        description: design.description,
                        deleted: design.deleted,
                        location: design.location,
                        category: design.category,
                        parent: design.parent ? design.parent._id : null,
                    },
                };
            }}
            defaultState={{
                data: {
                    part_number: '',
                    location: location
                        ? (location as DesignLocation)
                        : DesignLocation.Draper,
                    category: category
                        ? (category as DesignCategory)
                        : DesignCategory.Conveyor,
                    parent: parent || null,
                    description: '',
                },
            }}
            form={DesignFormRender}
            handler={{
                onCreated: (d) =>
                    nav('/design/detail/' + Object.values(d)[0]._id),
                onDeleted: (d) => nav('/design'),
                onUpdated: (d) =>
                    nav('/design/detail/' + Object.values(d)[0]._id),
            }}
            refetch={[DesignsQuery, DesignQuery]}
        />
    );
};

const UnitForm = () => {
    const nav = useNavigate();

    return (
        <AppForm
            entity="Unit"
            creationHook={useUnitCreation}
            updateHook={useUnitUpdate}
            stateHook={useUnit}
            stateHandler={({ unit }) => {
                return {
                    id: unit._id,
                    data: {
                        names: {
                            english: unit.names.english,
                            english_plural: unit.names.english_plural,
                            spanish: unit.names.spanish,
                            spanish_plural: unit.names.spanish_plural,
                        },
                        unit_class: unit.unit_class,
                        to_base_unit: unit.to_base_unit,
                        deleted: unit.deleted,
                    },
                };
            }}
            defaultState={{
                data: {
                    names: {
                        english: '',
                        english_plural: '',
                        spanish: '',
                        spanish_plural: '',
                    },
                    unit_class: UnitClass.Weight,
                    to_base_unit: 1,
                },
            }}
            form={UnitFormRender}
            handler={{
                onCreated: (d) =>
                    nav('/library/units/' + Object.values(d)[0]._id),
                onDeleted: (d) => nav('/library/units'),
                onUpdated: (d) =>
                    nav('/library/units/' + Object.values(d)[0]._id),
            }}
            refetch={[UnitsQuery]}
        />
    );
};

const TeamForm = () => {
    const nav = useNavigate();

    return (
        <AppForm
            entity="Team"
            creationHook={useTeamCreation}
            updateHook={useTeamUpdate}
            stateHook={useTeam}
            stateHandler={({ team }) => {
                return {
                    id: team._id,
                    data: {
                        name: team.name,
                        deleted: team.deleted,
                        company: team.company._id,
                        location: team.location ? team.location._id : null,
                        permissions: team.permissions,
                        members: team.members,
                    },
                };
            }}
            defaultState={{
                data: {
                    name: '',
                    company: '',
                    location: null,
                    permissions: [],
                    members: [],
                },
            }}
            form={TeamFormRender}
            handler={{
                onCreated: (d) =>
                    nav('/people/teams/' + Object.values(d)[0]._id),
                onDeleted: (d) => nav('/people/teams'),
                onUpdated: (d) =>
                    nav('/people/teams/' + Object.values(d)[0]._id),
            }}
            refetch={[TeamsQuery]}
        />
    );
};

const AccountForm = () => {
    const nav = useNavigate();

    return (
        <AppForm
            entity="Account"
            creationHook={useProfileCreation}
            updateHook={useProfileUpdate}
            stateHook={useProfile}
            stateHandler={({ profile }) => {
                return {
                    id: profile.user_id,
                    data: {
                        role: profile.roles[0],
                        given_name: profile.given_name || '',
                        family_name: profile.family_name || '',
                        email: profile.email,
                        username: profile.username || null,
                    },
                };
            }}
            defaultState={{
                data: {
                    given_name: '',
                    family_name: '',
                    email: null,
                    username: '',
                    role: UserRole.User,
                    phone_number: '',
                    temporary_password: '',
                },
            }}
            form={AccountFormRender}
            handler={{
                onCreated: (d) =>
                    nav('/people/accounts/' + Object.values(d)[0].user_id),
                onDeleted: (d) => nav('/people/accounts'),
                onUpdated: (d) =>
                    nav('/people/accounts/' + Object.values(d)[0].user_id),
            }}
            refetch={[ProfilesQuery, ProfileQuery]}
        />
    );
};

export {
    AccountForm,
    CompanyForm,
    DesignForm,
    IngredientForm,
    LocationForm,
    MiscItemForm,
    PackagingForm,
    ProductForm,
    QualityCheckForm,
    TeamForm,
    UnitForm,
};
