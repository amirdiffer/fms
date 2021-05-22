import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '../../fleet.selectors';
import { trafficFineAdapter } from './operator-traffic-fine.entity';
const { selectAll } = trafficFineAdapter.getSelectors();

export class OperatorTrafficFineSelectors {
  static selectAll = createSelector(FleetSelectors.operatorTrafficFineSelector, selectAll);

  static message = createSelector(
    FleetSelectors.operatorTrafficFineSelector,
    (state) => state.message
  );

  static error = createSelector(
    FleetSelectors.operatorTrafficFineSelector,
    (state) => state.error
  );

  static selectStatistics = createSelector(
    FleetSelectors.operatorTrafficFineSelector,
    (state) => state.statistics
  );

  static count = createSelector(
    FleetSelectors.operatorTrafficFineSelector,
    (state) => state.resultNumber
  );
}
