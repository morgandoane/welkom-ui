import { BaseFragment } from './../../../fragments/BaseFragment';
import {
    Conversion,
    ConversionInput,
} from '../../../schema/Conversion/Conversion';
import {
    gql,
    MutationHookOptions,
    MutationTuple,
    useMutation,
} from '@apollo/client';

export const DeleteConversion = gql`
    ${BaseFragment}
    mutation DeleteConversion($id: ObjectId!) {
        upsertConversion(id: $id) {
            _id
            conversions {
                ...BaseFragment
                from
                to
                from_per_to
            }
        }
    }
`;

export interface DeleteConversionRes {
    deleteConversion: {
        _id: string;
        conversions: Conversion[];
    };
}

export interface DeleteConversionArgs {
    id: string;
}

export const useConversionDeletion = (
    options?: MutationHookOptions<DeleteConversionRes, DeleteConversionArgs>
): MutationTuple<DeleteConversionRes, DeleteConversionArgs> =>
    useMutation<DeleteConversionRes, DeleteConversionArgs>(
        DeleteConversion,
        options
    );
