import { Folder } from './Folder';

export interface MoveFolderResult<T extends Folder> {
    origin?: T | null;
    destination?: T | null;
}
