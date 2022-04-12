import { Itinerary, ItineraryFragment } from './Itinerary';
import { gql } from '@apollo/client';
import { getMutationHook } from '../../types';
import { TinyProfileFragment } from '../Profile/Profile';
import { UploadEnabledFragment } from '../UploadEnabled/UploadEnabled';
import { ContactFragment } from '../Contact/Contact';
import { UpdateItineraryInput } from './UpdateItineraryInput';

export const UpdateItineraryMutation = gql`
    ${ItineraryFragment._document}
    ${UploadEnabledFragment._document}
    ${TinyProfileFragment._document}
    ${ContactFragment._document}
    mutation UpdateItineraryMutation(
        $id: ObjectId!
        $data: UpdateItineraryInput!
    ) {
        updateItinerary(id: $id, data: $data) {
            ...ItineraryFragment
        }
    }
`;

export const useItineraryUpdate = getMutationHook<
    { updateItinerary: Itinerary },
    { id: string; data: UpdateItineraryInput }
>(UpdateItineraryMutation);
