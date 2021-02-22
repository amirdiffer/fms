import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '../fleet.selectors';
import { accessoryAdapter } from './accessory.entity';
const { selectAll } = accessoryAdapter.getSelectors();

export class AccessorySelectors {
  static selectAll = createSelector(
    FleetSelectors.accessorySelector,
    selectAll
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
