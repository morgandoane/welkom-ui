import { FolderClass } from './Folder';

export interface CreateFolderInput {
    class: FolderClass;
    name: string;
    parent: string | null;
}

export interface UpdateFolderInput {
    deleted?: boolean;
    name?: string;
    parent?: string | null;
}
