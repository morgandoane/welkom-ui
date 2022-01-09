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

export const UpsertConversion = gql`
    ${BaseFragment}
    mutation UpsertConversion($item: ObjectId!, $data: ConversionInput!) {
        upsertConversion(item: $item, data: $data) {
            ...BaseFragment
            from
            to
            from_per_to
        }
    }
`;

export interface UpsertConversionRes {
    upsertConversion: Conversion;
}

export interface UpsertConversionArgs {
    item: string;
    data: ConversionInput;
}

export const useConversionUpsert = (
    options?: MutationHookOptions<UpsertConversionRes, UpsertConversionArgs>
): MutationTuple<UpsertConversionRes, UpsertConversionArgs> =>
    useMutation<UpsertConversionRes, UpsertConversionArgs>(
        UpsertConversion,
        options
    );
