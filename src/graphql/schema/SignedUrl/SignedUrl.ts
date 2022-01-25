export enum StorageBucket {
    Attachments = 'ldbbakery_attachments',
    Documents = 'ldbbakery_documents',
    Images = 'ldbbakery_images',
    Profiles = 'ldbbakery_profiles',
    Workbooks = 'ldbbakery_workbooks',
}

export interface SignedUrl {
    url: string;
}
