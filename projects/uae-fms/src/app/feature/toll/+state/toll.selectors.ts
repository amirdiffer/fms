import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TOLL_FEATURE_KEY, tollAdapter } from './toll.entity';

export class TollSelectors {
  static tollSelector = createSelector(
    createFeatureSelector(TOLL_FEATURE_KEY),
    (state) => state['toll']
  );

  static selectAll = createSelector(
    TollSelectors.tollSelector,
    tollAdapter.setAll
  );

  static message = createSelector(
    TollSelectors.tollSelector,
    (state) => state.message
  );

  static error = createSelector(
    TollSelectors.tollSelector,
    (state) => state.error
  );
}
