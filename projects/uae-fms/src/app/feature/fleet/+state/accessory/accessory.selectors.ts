import { createSelector } from '@ngrx/store';
import { accessoryAdapter } from './accessory.entity';
const { selectAll } = accessoryAdapter.getSelectors();
const accessoryState = (state) => state['accessory'];
export class AccessorySelectors {
  static selectAll = createSelector(accessoryState, selectAll);
  static selectStatistics = createSelector(
    accessoryState,
    (state) => state.statistics
  );

  static message = createSelector(accessoryState, (state) => state.message);

  static error = createSelector(accessoryState, (state) => state.error);

  static submitted = createSelector(accessoryState, (state) => {
    return state.submitted;
  });
}
