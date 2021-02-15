import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_PROFILE_FEATURE_KEY } from './user.entity';

export const featureSelector = createFeatureSelector(USER_PROFILE_FEATURE_KEY);
export class UserProfileSelector {
  static user = createSelector(
    featureSelector,
    (state) => state['userProfile']
  );
}
