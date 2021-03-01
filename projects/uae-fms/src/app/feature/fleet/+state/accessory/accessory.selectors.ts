import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '../fleet.selectors';
import { accessoryAdapter } from './accessory.entity';

export class AccessorySelectors {
  static selectAll = createSelector(
    FleetSelectors.accessorySelector,
    accessoryAdapter.setAll
  );
  static selectStatistics = createSelector(
    FleetSelectors.accessorySelector,
    (state) => state.statistics
  );

  static message = createSelector(
    FleetSelectors.accessorySelector,
    (state) => state.message
  );

  static error = createSelector(
    FleetSelectors.accessorySelector,
    (state) => state.error
  );
}
