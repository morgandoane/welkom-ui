import { BaseFragment } from './../../fragments/BaseFragment';
import { gql } from '@apollo/client';
import { Base } from '../Base/Base';

export enum FolderClass {
    Recipe = 'Recipe',
}

export interface FolderChild {
    _id: string;
    name: string;
}

export interface Folder extends Base {
    class: FolderClass;
    name: string;
    ancestry: FolderChild[];
    folders: FolderChild[];
}

export const FolderFragment = gql`
    fragment FolderFragment on Folder {
        ...BaseFragment
        name
        ancestry {
            _id
            name
        }
        folders {
            _id
            name
        }
    }
`;
