import { Base } from '../Base/Base';

export enum FolderClass {
    Recipe = 'Recipe',
}

export interface Folder extends Base {
    class: FolderClass;
    name: string;
    parent?: Folder;
    folders?: Folder[];
}
