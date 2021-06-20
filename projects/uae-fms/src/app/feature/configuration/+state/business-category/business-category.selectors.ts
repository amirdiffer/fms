import { createSelector } from '@ngrx/store';
import { businessCategoryAdapter } from './business-category.entity';

const { selectAll } = businessCategoryAdapter.getSelectors();
const businessCategorySelector = (state) => state['businessCategory'];
export class BusinessCategorySelectors {
  static selectAll = createSelector(businessCategorySelector, selectAll);

  static message = createSelector(
    businessCategorySelector,
    (state) => state.message
  );

  static error = createSelector(
    businessCategorySelector,
    (state) => state.error
  );

  static submitted = createSelector(
    businessCategorySelector,
    (state) => state.submitted
  );

  static loaded = createSelector(
    businessCategorySelector,
    (state) => state.loaded
  );
}
