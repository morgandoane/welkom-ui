import { AppFile } from './../AppFile/AppFile';
import { createUploadEnabledFragment } from './../../unionHandling/UploadEnabledFragment';
import { AppFragment } from './../../types';
import { gql } from '@apollo/client';
import { Base } from './../Base/Base';
import { TinyProfileFragment } from '../Profile/Profile';

export interface UploadEnabled extends Base {
    files: AppFile[];
    photo: string | null;
}

export const UploadEnabledFragment = new AppFragment(
    gql(String.raw`
        fragment UploadEnabledFragment on UploadEnabledUnion {
        ${createUploadEnabledFragment()}
        }
`),
    [TinyProfileFragment]
);
