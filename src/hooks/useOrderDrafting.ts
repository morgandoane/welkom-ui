import { useAuth0 } from '@auth0/auth0-react';
import { startsWithNumber } from './../utils/startsWithNumber';
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
import mailtoLink from 'mailto-link';

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

const template = (
    to: string[],
    cc: string[],
    bcc: string[],
    subject: string,
    body: string
) => {
    if (!body) throw new Error('Please provide a body!');
    if (!subject) throw new Error('Please provide a subject!');

    return mailtoLink({ to, cc, bcc, subject, body });
};

export interface OrderDraft {
    company: TinyCompany;
    link: string;
    body: string;
    holdup: string | null;
    items: {
        content: OrderQueueContentInput;
        line: string;
        holdup: string | null;
    }[];
}

const br = '\n';

export const useOrderDrafting = (
    contents: OrderQueueContentInput[]
): { data: OrderDraft[]; error?: Error; loading: boolean } => {
    const { user } = useAuth0();

    const signedBy = user
        ? user.given_name && user.family_name
            ? `${user.given_name} ${user.family_name}`
            : user.email
        : '';

    const {
        data: { companies, locations, units, items },
        error,
        loading,
    } = useOrderDraftingData();

    const getLineForContent = ({
        order_code,
        item,
        unit,
        quantity,
        location,
        date,
        vendor,
        vendor_location,
        time_sensitive,
    }: OrderQueueContentInput): { line: string; holdup: string | null } => {
        const tinyItem = items.find((i) => item === i._id);
        const tinyUnit = units.find((i) => unit === i._id);
        const tinyLocation = locations.find((i) => location === i._id);
        const tinyVendor = companies.find((i) => vendor === i._id);
        const tinyVendorLocation = locations.find(
            (i) => vendor_location === i._id
        );

        if (!order_code)
            return {
                line: '',
                holdup: 'Needs a PO number.',
            };
        if (!tinyItem)
            return {
                line: '',
                holdup: 'Needs an item.',
            };
        if (!tinyUnit)
            return {
                line: '',
                holdup: 'Needs a unit.',
            };
        if (!quantity)
            return {
                line: '',
                holdup: 'Needs a quantity.',
            };
        if (!tinyLocation)
            return {
                line: '',
                holdup: 'Needs a destination.',
            };
        if (!date)
            return {
                line: '',
                holdup: 'Needs a delivery date.',
            };
        if (!tinyVendor)
            return {
                line: '',
                holdup: 'Needs a vendor.',
            };
        else {
            return {
                line: `${quantity}${
                    startsWithNumber(
                        tinyUnit[
                            quantity == 1 ? 'english' : 'english_plural'
                        ] || ''
                    )
                        ? ' x'
                        : ''
                } ${
                    tinyUnit[quantity == 1 ? 'english' : 'english_plural']
                } of ${tinyItem.english} delivered to ${
                    tinyLocation.label || tinyLocation?.address?.city || 'us'
                }${
                    tinyVendorLocation
                        ? ` from ${
                              tinyVendorLocation.label ||
                              tinyVendorLocation?.address?.city ||
                              tinyVendor.name
                          }`
                        : ''
                } on ${format(date, dateFormats.condensedDate)}${
                    time_sensitive
                        ? ' by ' + format(date, dateFormats.time)
                        : ''
                }${br}PO# ${order_code}${br}`,
                holdup: null,
            };
        }
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

        const data: OrderDraft[] = [];

        for (const key of Object.keys(groups)) {
            const vendor = companies.find((c) => c._id === key);
            const contents = groups[key];

            const subject = !contents[0]
                ? 'PO Little Dutch Boy Bakeries'
                : `Little Dutch Boy PO# ${contents
                      .map((c) => c.order_code)
                      .join(', ')}`;

            let body =
                'Hello,' +
                `${br}${br}${
                    contents.length == 1
                        ? 'We need - '
                        : `Please process these ${contents.length} POs for Little Dutch Boy - `
                }${br}`;

            for (const content of contents) {
                const { holdup, line } = getLineForContent(content);
                body += `${br}${line}`;
            }

            body += `${br}Please confirm.${br}Thanks,${br}${br}${signedBy}`;

            if (vendor && contents.length > 0) {
                const contacts = vendor.contacts;

                const emailTo = contacts
                    .filter((c) => c.email && c.email_on_order)
                    .map((c) => c.email + '');

                const cc = contacts
                    .filter((c) => c.email && c.cc_on_order)
                    .map((c) => c.email + '');

                data.push({
                    company: vendor,
                    body,
                    link: template(emailTo, cc, [], subject, body),
                    holdup:
                        contents
                            .map((c) => getLineForContent(c))
                            .find((c) => c.holdup !== null)?.holdup || null,
                    items: contents.map((content) => ({
                        content,
                        ...getLineForContent(content),
                    })),
                });
            }
        }

        return data;
    };

    return {
        data: getDraftForContents(),
        error,
        loading,
    };
};
