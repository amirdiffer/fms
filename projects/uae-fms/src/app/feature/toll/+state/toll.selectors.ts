import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TOLL_FEATURE_KEY, tollAdapter, TollState } from './toll.entity';
const { selectAll } = tollAdapter.getSelectors();

export class TollSelectors {
  static tollSelector = createFeatureSelector<TollState>(TOLL_FEATURE_KEY);

  static selectAll = createSelector(createFeatureSelector('toll'), selectAll);

  static message = createSelector(
    TollSelectors.tollSelector,
    (state) => state.message
  );

  static error = createSelector(
    TollSelectors.tollSelector,
    (state) => state.error
  );
}
