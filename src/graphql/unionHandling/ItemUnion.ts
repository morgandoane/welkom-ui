export const ItemUnionFields = [
    'Item',
    'Ingredient',
    'Product',
    'MiscItem',
    'Packaging',
];

export const createItemFragment = () => {
    let res = ``;

    for (const type of ItemUnionFields) {
        res += `
    ... on ${type} {
        _id
        names {
            english
            spanish
        }
        date_created
        created_by {
            ...TinyProfileFragment
        }
        deleted
        note
        files {
            name
            display_name
            date_created
            created_by {
                ...TinyProfileFragment
            }
            url
        }
        photo
      }
    `;
    }

    return res;
};
