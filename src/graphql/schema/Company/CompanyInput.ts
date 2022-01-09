export interface CreateCompanyInput {
    name: string;
}

export interface UpdateCompanyInput {
    name: string;
    deleted?: boolean;
}
