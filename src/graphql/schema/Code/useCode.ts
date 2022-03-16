import { gql, useQuery } from '@apollo/client';

export enum CodeType {
    BOL = 'B',
    ITIN = 'I',
    LOT = 'L',
    PO = 'PO',
}

export const CodeQuery = gql`
    query CodeQuery($type: CodeType!) {
        code(type: $type)
    }
`;

export const useCode = (
    type: CodeType,
    skip?: boolean,
    onComplete?: (code: string) => void
): { error?: Error; loading: boolean; code: string | null } => {
    const { data, error, loading } = useQuery<
        { code: string },
        { type: CodeType }
    >(CodeQuery, {
        variables: {
            type,
        },
        fetchPolicy: 'network-only',
        skip,
        onCompleted: ({ code }) => (onComplete ? onComplete(code) : null),
    });

    return {
        error,
        loading,
        code: data ? data.code : null,
    };
};
