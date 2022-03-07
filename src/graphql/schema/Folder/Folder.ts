import { AppFragment } from './../../types';
import { Identified, BaseFragment } from './../Base/Base';
import { FolderClass } from '../../inputsTypes';
import { Base } from '../Base/Base';
import { gql } from '@apollo/client';

export interface Folder extends Base {
    class: FolderClass;
    name: string;
    parent: TinyFolder | null;
}

export interface TinyFolder extends Identified {
    name: string;
}

export const FolderFragment = new AppFragment(
    gql`
        fragment FolderFragment on Folder {
            ...BaseFragment
            class
            name
            parent {
                _id
                name
            }
        }
    `,
    [BaseFragment]
);
