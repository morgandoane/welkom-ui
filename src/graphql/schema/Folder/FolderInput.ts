import { FolderClass } from './Folder';

export interface FolderInput {
    class: FolderClass;
    name: string;
    parent?: string;
}

export interface UpdateFolderInput {
    deleted?: boolean;
    name?: string;
}
