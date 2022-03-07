export const BaseUnionFields = [
    'Unit',
    'Folder',
    'QualityCheck',
    'RecipeVersion',
];

export const createBaseFragment = () => {
    let res = ``;

    for (const type of BaseUnionFields) {
        res += `
    ... on ${type} {
        _id
        date_created
        created_by {
            ...TinyProfileFragment
        }
        deleted
        note
      }
    `;
    }

    return res;
};
