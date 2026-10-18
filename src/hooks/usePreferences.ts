import { useSyncExternalStore } from 'react';
import { getPreferences, subscribePreferences } from '../shared/services/preferences';

export function usePreferences() {
  return useSyncExternalStore(subscribePreferences, getPreferences);
}
