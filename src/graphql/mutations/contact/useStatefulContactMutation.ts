import React from 'react';
import { OperationResult } from './../../types';
import { DeleteContactArgs, DeleteContactRes } from './useContactDeletion';
import { UpdateContactArgs, UpdateContactRes } from './useContactUpdate';
import { useContactMutation } from './useContactMutation';
import { CreateContactArgs, CreateContactRes } from './useContactCreation';

export type ContactMutationState =
    | ({ type: 'create' } & CreateContactArgs)
    | ({ type: 'update' } & UpdateContactArgs)
    | ({ type: 'delete' } & DeleteContactArgs);

export interface ContactMutationRes {
    state: ContactMutationState | null;
    setState: (data: null | (ContactMutationState & { save?: true })) => void;
    result: OperationResult<
        CreateContactRes | UpdateContactRes | DeleteContactRes
    > | null;
    reset: (partial?: boolean) => void;
    loading: boolean;
}

export const useStatefulContactMutation = (): ContactMutationRes => {
    const { handler, loading, result, reset } = useContactMutation();

    const [state, setState] = React.useState<ContactMutationState | null>(null);

    const resetState = () => {
        setState(null);
        reset();
    };

    return {
        loading,
        result,
        reset: (partial?: boolean) => {
            reset();
            if (!partial) setState(null);
        },

        state,
        setState: (data) => {
            if (data === null) resetState();
            else
                switch (data.type) {
                    case 'create': {
                        const { type, save, ...variables } = data;
                        if (!save) {
                            setState(data);
                        } else {
                            setState(data);
                            handler.create(variables);
                        }
                        break;
                    }
                    case 'update': {
                        const { type, save, ...variables } = data;
                        if (!save) {
                            setState(data);
                        } else {
                            setState(data);
                            handler.update(variables);
                        }
                        break;
                    }
                    case 'delete': {
                        const { type, save, ...variables } = data;
                        if (!save) {
                            setState(data);
                        } else {
                            setState(data);
                            handler.delete(variables);
                        }
                        break;
                    }
                }
        },
    };
};
