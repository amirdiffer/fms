import { createSelector } from '@ngrx/store';
import { fuelCardsAdapter } from './fuel-cards.entity';
import { FuelManagementSelectors } from '../fuel-management.selectors';
const { selectAll } = fuelCardsAdapter.getSelectors();
export class FuelCardsSelectors {
  static selectAll = createSelector(
    FuelManagementSelectors.fuelCardsSelector,
    selectAll
  );

  static message = createSelector(
    FuelManagementSelectors.fuelCardsSelector,
    (state) => state.message
  );

  static error = createSelector(
    FuelManagementSelectors.fuelCardsSelector,
    (state) => state.error
  );
  static selectStatistics = createSelector(
    FuelManagementSelectors.fuelCardsSelector,
    (state) => state.statistics
  );

}
