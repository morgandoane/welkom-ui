import { dateFormats } from './../utils/dateFormats';
import { TinyItem } from './../graphql/schema/Item/Item';
import { useTinyItems } from './../graphql/queries/items/useTinyItems';
import { TinyCompany } from './../graphql/schema/Company/Company';
import {
    TinyLocation,
    useTinyLocations,
} from './../graphql/queries/locations/useTinyLocations';
import { useTinyUnits } from './../graphql/queries/units/useTinyUnits';
import { useTinyCompanies } from '../graphql/queries/companies/useTinyCompanies';
import { OrderQueueContentInput } from './../graphql/schema/OrderQueue/OrderQueueInput';
import { TinyUnit } from '../graphql/schema/Unit/Unit';
import { format } from 'date-fns';

const useOrderDraftingData = (): {
    data: {
        companies: TinyCompany[];
        units: TinyUnit[];
        locations: TinyLocation[];
        items: TinyItem[];
    };
    loading: boolean;
    error?: Error;
} => {
    const {
        data: companyData,
        loading: companyLoading,
        error: companyError,
    } = useTinyCompanies({
        variables: {
            filter: {
                skip: 0,
                take: 250,
            },
        },
    });

    const {
        data: unitData,
        loading: unitLoading,
        error: unitError,
    } = useTinyUnits({
        variables: {
            filter: {
                skip: 0,
                take: 250,
            },
        },
    });

    const {
        data: locationData,
        loading: locationLoading,
        error: locationError,
    } = useTinyLocations({
        variables: {
            filter: {
                skip: 0,
                take: 250,
            },
        },
    });

    const {
        data: itemData,
        loading: itemLoading,
        error: itemError,
    } = useTinyItems({
        variables: {
            filter: {
                skip: 0,
                take: 250,
            },
        },
    });

    return {
        data: {
            companies: companyData ? companyData.companies.items : [],
            units: unitData ? unitData.units.items : [],
            locations: locationData ? locationData.locations.items : [],
            items: itemData ? itemData.items.items : [],
        },
        loading: companyLoading || unitLoading || locationLoading,
        error: companyError || unitError || locationError,
    };
};

export interface OrderDraft {
    company: TinyCompany;
    link: string;
    holdup: string | null;
    items: {
        content: OrderQueueContentInput;
        link: string;
        holdup: string | null;
    }[];
}

export const useOrderDrafting = (
    contents: OrderQueueContentInput[]
): { data: OrderDraft[]; error?: Error; loading: boolean } => {
    const {
        data: { companies, locations, units, items },
        error,
        loading,
    } = useOrderDraftingData();

    const lineText = (content: OrderQueueContentInput): string | null => {
        const po = content.order_code;
        const item = items.find((i) => i._id === content.item);
        const unit = units.find((u) => u._id === content.unit);
        const quantity = content.quantity;
        const location = locations.find((l) => l._id === content.location);
        const locationLabel = !location
            ? null
            : location.label
            ? location.label
            : location.address
            ? location.address
            : null;
        const date = content.date;
        const vendorLocation = locations.find(
            (l) => l._id === content.vendor_location
        );

        if (
            po &&
            item &&
            unit &&
            quantity &&
            location &&
            locationLabel &&
            date
        ) {
            return `${item.english} - ${quantity} x ${
                unit[quantity == 1 ? 'english' : 'english_plural']
            } (${po}) delivered to ${locationLabel} on ${format(
                date,
                dateFormats.condensedDate
            )}\n`;
        } else {
            return null;
        }
    };

    const getDraftForContent = (
        content: OrderQueueContentInput
    ): { link: string; holdup: string | null } => {
        return {
            link: '',
            holdup: 'Not ready.',
        };
    };

    const getDraftForContents = (): OrderDraft[] => {
        const groups: Record<string, OrderQueueContentInput[]> = {};

        // group orders by vendor
        for (const content of contents) {
            if (content.vendor)
                if (groups[content.vendor]) {
                    groups[content.vendor].push(content);
                } else {
                    groups[content.vendor] = [content];
                }
        }

        const drafts: OrderDraft[] = [];

        for (const key of Object.keys(groups)) {
            const company = companies.find((c) => c._id === key);
            const contents = groups[key];

            const link = '';
            const holdup = 'Not ready';

            if (company && contents.length > 0) {
                drafts.push({
                    company,
                    link,
                    holdup,
                    items: contents.map((content) => ({
                        content,
                        ...getDraftForContent(content),
                    })),
                });
            }
        }

        return drafts;
    };

    return {
        data: [],
        error,
        loading,
    };
};
