import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '../fleet.selectors';
import { operatorAdapter } from './operator.entity';
const { selectAll } = operatorAdapter.getSelectors();

export class OperatorSelectors {
  static selectAll = createSelector(FleetSelectors.operatorSelector, selectAll);

  static message = createSelector(
    FleetSelectors.operatorSelector,
    (state) => state.message
  );

  static error = createSelector(
    FleetSelectors.operatorSelector,
    (state) => state.error
  );

  static submitted = createSelector(
    FleetSelectors.operatorSelector,
    (state) => state.submitted
  );

  static selectStatistics = createSelector(
    FleetSelectors.operatorSelector,
    (state) => state.statistics
  );

  static selectById = createSelector(
    OperatorSelectors.selectAll,
    (state, props: { id: number }) => {
      let data = state.filter((x) => x.id == props.id);
      if (data.length > 0) return data[0];
      else return null;
    }
  );
}
