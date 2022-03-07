export const UploadEnabledFields = [
    'Company',
    'Design',
    'Location',
    'Item',
    'Packaging',
];

export const createUploadEnabledFragment = () => {
    let res = ``;

    for (const type of UploadEnabledFields) {
        res += `
    ... on ${type} {
        _id
        date_created
        created_by {
            ...TinyProfileFragment
        }
        deleted
        note
        photo
        files {
            name
            display_name
            date_created
            created_by {
                ...TinyProfileFragment
            }
            url
        }
      }
    `;
    }

    return res;
};
