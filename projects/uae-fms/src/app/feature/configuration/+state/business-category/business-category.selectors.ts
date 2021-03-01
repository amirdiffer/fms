import { createSelector } from '@ngrx/store';
import { ConfigurationSelectors } from '../configuration.selectors';
import { businessCategoryAdapter } from './business-category.entity';
const { selectAll } = businessCategoryAdapter.getSelectors();

export class BusinessCategorySelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.businessCategorySelector,
    selectAll
  );

  static message = createSelector(
    ConfigurationSelectors.businessCategorySelector,
    (state) => state.message
  );

  static error = createSelector(
    ConfigurationSelectors.businessCategorySelector,
    (state) => state.error
  );
}
