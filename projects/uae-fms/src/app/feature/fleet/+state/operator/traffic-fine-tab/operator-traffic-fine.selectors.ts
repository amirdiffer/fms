import { createSelector } from '@ngrx/store';
import { trafficFineAdapter } from './operator-traffic-fine.entity';
const { selectAll } = trafficFineAdapter.getSelectors();
const operatorTrafficFineState = (state) => state['operator-traffic-fine']
export class OperatorTrafficFineSelectors {
  static selectAll = createSelector(operatorTrafficFineState, selectAll);

  static message = createSelector(
    operatorTrafficFineState,
    (state) => state.message
  );

  static error = createSelector(
    operatorTrafficFineState,
    (state) => state.error
  );

  static selectStatistics = createSelector(
    operatorTrafficFineState,
    (state) => state.statistics
  );

  static count = createSelector(
    operatorTrafficFineState,
    (state) => state.resultNumber
  );
}
