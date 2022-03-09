import {
    DocumentNode,
    MutationHookOptions,
    MutationTuple,
    QueryHookOptions,
    QueryResult,
} from '@apollo/client';
import React, { ReactElement, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { OperationResult } from '../../../../../utils/types/OperationResult';
import AppNav from '../../../../Layout/AppNav/components';
import { FormHandler } from '../../types';
import FormMessage from '../FormMessage';

export interface EntityFormProps<
    CreateArgs,
    UpdateArgs extends { data: { deleted?: boolean } }
> {
    loading: boolean;
    value: FormState<
        { _type: 'create' } & CreateArgs,
        { _type: 'update' } & UpdateArgs
    >;
    onChange: (
        value: FormState<
            { _type: 'create' } & CreateArgs,
            { _type: 'update' } & UpdateArgs
        >
    ) => void;
    submit: (deleted?: true) => void;
}

export type FormState<
    CreateArgs,
    UpdateArgs extends { data: { deleted?: boolean } }
> = ({ _type: 'create' } & CreateArgs) | ({ _type: 'update' } & UpdateArgs);

export interface AppFormProps<
    CreateArgs,
    UpdateArgs extends { data: { deleted?: boolean } },
    CreateRes,
    UpdateRes,
    StateRes
> {
    defaultState: CreateArgs;
    creationHook: (
        options?: MutationHookOptions<CreateRes, CreateArgs>
    ) => MutationTuple<CreateRes, CreateArgs>;
    updateHook: (
        options?: MutationHookOptions<UpdateRes, UpdateArgs>
    ) => MutationTuple<UpdateRes, UpdateArgs>;
    stateIdentifer?: string;
    stateHook: (
        options?: QueryHookOptions<StateRes, { id: string }>
    ) => QueryResult<StateRes, { id: string }>;
    stateHandler: (data: StateRes) => UpdateArgs;
    helperComponent?: ReactNode;
    form: (props: EntityFormProps<CreateArgs, UpdateArgs>) => ReactElement;
    refetch?: DocumentNode[];
    handler: FormHandler<UpdateRes | CreateRes>;
    entity: string;
}

const AppForm = <
    CreateArgs,
    UpdateArgs extends { data: { deleted?: boolean } },
    CreateRes,
    UpdateRes,
    StateRes
>(
    props: AppFormProps<CreateArgs, UpdateArgs, CreateRes, UpdateRes, StateRes>
): ReactElement => {
    const {
        creationHook,
        updateHook,
        stateHook,
        stateHandler,
        stateIdentifer = 'id',
        defaultState,
        form: Form,
        refetch = [],
        entity,
    } = props;

    const params = useParams();
    const id = params[stateIdentifer];

    const [state, setState] = React.useState<
        ({ _type: 'create' } & CreateArgs) | ({ _type: 'update' } & UpdateArgs)
    >({
        _type: 'create',
        ...defaultState,
    });

    stateHook({
        variables: { id: id || '' },
        skip: !id,
        onCompleted: (data) =>
            setState({ _type: 'update', ...stateHandler(data) }),
    });

    const [result, setResult] = React.useState<null | OperationResult<
        UpdateRes | CreateRes
    >>(null);

    const [handleCreate, { loading: createLoading }] = creationHook({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
        refetchQueries: refetch,
    });

    const [handleUpdate, { loading: updateLoading }] = updateHook({
        onCompleted: (data) => setResult({ success: true, data }),
        onError: (error) => setResult({ success: false, error }),
        refetchQueries: refetch,
    });

    return (
        <AppNav>
            {result ? (
                <FormMessage
                    entity={entity}
                    data={result.success == false ? result.error : result.data}
                    handler={props.handler}
                    type={
                        result.success == false
                            ? 'error'
                            : Object.values(result.data)[0].deleted == true
                            ? 'deleted'
                            : id
                            ? 'updated'
                            : 'created'
                    }
                    reset={() => setResult(null)}
                />
            ) : (
                <Form
                    value={state}
                    onChange={(d) => setState({ ...state, ...d })}
                    loading={createLoading || updateLoading}
                    submit={(remove?: true) => {
                        if (remove && state._type == 'update') {
                            const { _type, ...variables } = state;
                            handleUpdate({
                                variables: {
                                    ...(variables as unknown as UpdateArgs),
                                    data: {
                                        ...(variables as unknown as UpdateArgs)
                                            .data,
                                        deleted: true,
                                    },
                                },
                                refetchQueries: refetch,
                            });
                        } else if (state._type == 'update') {
                            const { _type, ...variables } = state;
                            handleUpdate({
                                variables: {
                                    ...(variables as unknown as UpdateArgs),
                                },
                                refetchQueries: refetch,
                            });
                        } else if (state._type == 'create') {
                            const { _type, ...variables } = state;
                            handleCreate({
                                variables: variables as unknown as CreateArgs,
                                refetchQueries: refetch,
                            });
                        }
                    }}
                />
            )}
        </AppNav>
    );
};

export default AppForm;
