export interface CreateRecipeInput {
    name: string;
    item: string;
    folder?: string | null;
}

export class UpdateRecipeInput {
    name?: string;
    deleted?: boolean;
    item?: string;
    folder?: string | null;
}
