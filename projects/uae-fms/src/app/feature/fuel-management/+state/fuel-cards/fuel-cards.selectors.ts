import { createSelector } from '@ngrx/store';
import { fuelCardsAdapter } from './fuel-cards.entity';
import { FuelManagementSelectors } from '../fuel-management.selectors';

export class FuelCardsSelectors {
  static selectAll = createSelector(
    FuelManagementSelectors.fuelCardsSelector,
    fuelCardsAdapter.setAll
  );

  static message = createSelector(
    FuelManagementSelectors.fuelCardsSelector,
    (state) => state.message
  );

  static error = createSelector(
    FuelManagementSelectors.fuelCardsSelector,
    (state) => state.error
  );
}
