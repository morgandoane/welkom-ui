import { TinyCompany } from './Company';
import { useCompanies } from './useCompanies';

export const useInternalCompany = (): {
    error?: Error;
    loading: boolean;
    company: TinyCompany | null;
} => {
    const { data, error, loading } = useCompanies({
        variables: {
            filter: { skip: 0, take: 1, internal: true },
        },
    });

    return {
        error:
            error ||
            (data && data.companies.items.length == 0
                ? new Error('No internal company has been set up.')
                : undefined),
        loading,
        company:
            data && data.companies.items[0] ? data.companies.items[0] : null,
    };
};
