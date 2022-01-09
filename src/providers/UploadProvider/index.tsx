import React, { ReactElement, useContext } from 'react';
import { useSignedUrl } from '../../graphql/queries/signedUrl/useSignedUrl';
import { SignedUrlAction } from '../../graphql/queries/signedUrl/useSignedUrls';
import { StorageBucket } from '../../graphql/schema/SignedUrl/SignedUrl';
import { useFileUpload } from '../../hooks/useFileUpload';
import UploadBox from './components/UploadBox';

export interface UploadItem {
    file: File;
    prefix: string;
    storage_category: StorageBucket;
}

export interface UploadItemError extends UploadItem {
    error: Error;
}

export interface UploadItemActive extends UploadItem {
    progress: number | null;
}

export interface UploadProviderContext {
    active: UploadItemActive | null;
    queue: UploadItem[];
    errors: UploadItemError[];
    completed: UploadItem[];
    enqueue: (items: UploadItem[]) => void;
}

export const Context = React.createContext<UploadProviderContext>({
    active: null,
    queue: [],
    errors: [],
    completed: [],
    enqueue: (items) => null,
});

export const UploadProvider = (props: { children: ReactElement }) => {
    const [queue, setQueue] = React.useState<UploadItem[]>([]);
    const [active, setActive] = React.useState<UploadItem | null>(null);

    const [errors, setErrors] = React.useState<UploadItemError[]>([]);
    const [completed, setCompleted] = React.useState<UploadItem[]>([]);

    const [upload, { progress }] = useFileUpload({
        onComplete: (data) => {
            if (active) {
                setCompleted((e) => [...e, active]);
                setActive(null);
            }
        },
        onError: (error) => {
            if (active) {
                setErrors((e) => [...e, { ...active, error }]);
                setActive(null);
            }
        },
    });

    const {} = useSignedUrl({
        variables: !active
            ? undefined
            : {
                  config: {
                      prefix: active.prefix,
                      category: active.storage_category,
                      name: active.file.name,
                      action: SignedUrlAction.write,
                  },
              },
        skip: !active,
        onCompleted: (data) => {
            if (active) upload(active.file, data.signedUrl.url);
        },
        onError: (error) => {
            if (active) {
                setErrors((e) => [...e, { ...active, error }]);
                setActive(null);
            }
        },
        fetchPolicy: 'network-only',
    });

    const pop = React.useCallback(() => {
        if (!active && queue.length > 0) {
            setActive(queue[0]);
            setQueue((q) => q.slice(1));
        }
    }, [active, queue]);

    React.useEffect(() => {
        if (!active && queue.length > 0) {
            pop();
        }
    }, [queue, active, pop]);

    return (
        <Context.Provider
            value={{
                queue,
                active: !active ? null : { ...active, progress },
                errors,
                completed,
                enqueue: (items) => {
                    setQueue((q) => [...q, ...items]);
                },
            }}
        >
            {props.children}
            <UploadBox />
        </Context.Provider>
    );
};

const useUploadContext = (): UploadProviderContext => React.useContext(Context);

export const useUploads = (onComplete?: () => void): UploadProviderContext => {
    const context = useUploadContext();

    const { active, queue } = context;

    React.useEffect(() => {
        if (!active && queue.length == 0 && onComplete !== undefined) {
            onComplete();
        }
    }, [active, queue]);

    return context;
};
