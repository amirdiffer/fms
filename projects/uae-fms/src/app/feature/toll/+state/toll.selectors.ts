import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TOLL_FEATURE_KEY, tollAdapter, TollState } from './toll.entity';
const { selectAll } = tollAdapter.getSelectors();

export class TollSelectors {
  static tollSelector = createSelector(
    createFeatureSelector(TOLL_FEATURE_KEY),
    (state: TollState) => state
  );

  static selectAll = createSelector(
    TollSelectors.tollSelector,
    selectAll
  );

  static message = createSelector(
    TollSelectors.tollSelector,
    (state) => state.message
  );

  static error = createSelector(
    TollSelectors.tollSelector,
    (state) => state.error
  );

  static assignNow = createSelector(
    TollSelectors.tollSelector,
    (state) => state.assignNow
  )
}
