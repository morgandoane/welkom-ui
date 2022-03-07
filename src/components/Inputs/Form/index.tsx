import React, { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    BaseUnit,
    DesignCategory,
    DesignLocation,
    IngredientUnitClass,
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
import Product from '../../../scenes/Library/components/Products/components/Product';
import AppForm from './components/AppForm';
import CompanyFormRender from './components/forms/Company';
import DesignFormRender from './components/forms/Design';
import IngredientFormRender from './components/forms/Ingredient';
import LocationFormRender from './components/forms/Location';
import PackagingFormRender from './components/forms/Packaging';
import ProductFormRender from './components/forms/Product';

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
                        pallet_configurations: item.pallet_configurations.map(
                            (config) => ({
                                name: config.name,
                                capacity: config.capacity,
                            })
                        ),
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
                    pallet_configurations: [],
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
                        pallet_configurations: item.pallet_configurations.map(
                            (config) => ({
                                name: config.name,
                                capacity: config.capacity,
                            })
                        ),
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
                    pallet_configurations: [],
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
                        pallet_configurations: item.pallet_configurations.map(
                            (config) => ({
                                name: config.name,
                                capacity: config.capacity,
                            })
                        ),
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
                    pallet_configurations: [],
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

export {
    CompanyForm,
    DesignForm,
    IngredientForm,
    LocationForm,
    PackagingForm,
    ProductForm,
};
