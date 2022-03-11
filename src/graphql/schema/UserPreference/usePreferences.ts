import { UserPreference, UserPreferenceFragment } from './UserPreference';
import { gql } from '@apollo/client';
import { getQueryHook } from './../../types';
import { OrderQueuePreferenceFragment } from './categories/OrderQueuePreference';

export const PreferencesQuery = gql`
    ${UserPreferenceFragment._document}
    ${OrderQueuePreferenceFragment._document}
    query PreferencesQuery {
        preferences {
            ...UserPreferenceFragment
        }
    }
`;

export const usePreferences =
    getQueryHook<{ preferences: UserPreference }>(PreferencesQuery);
