import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '../fleet.selectors';
import { operatorAdapter } from './operator.entity';

export class OperatorSelectors {
  static selectAll = createSelector(
    FleetSelectors.operatorSelector,
    operatorAdapter.setAll
  );

  static message = createSelector(
    FleetSelectors.operatorSelector,
    (state) => state.message
  );

  static error = createSelector(
    FleetSelectors.operatorSelector,
    (state) => state.error
  );
}
