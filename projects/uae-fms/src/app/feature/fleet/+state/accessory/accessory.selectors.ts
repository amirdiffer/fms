import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '../fleet.selectors';
import { accessoryAdapter } from './accessory.entity';
const { selectAll } = accessoryAdapter.getSelectors();

export class AccessorySelectors {
  static selectAll = createSelector(
    FleetSelectors.accessorySelector,
    selectAll
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

  static submitted = createSelector(
    FleetSelectors.accessorySelector,
    (state) => state.submitted
  )

}
