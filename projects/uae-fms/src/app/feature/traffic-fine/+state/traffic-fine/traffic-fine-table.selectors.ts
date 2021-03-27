import { createSelector } from '@ngrx/store';
import { TrafficFinesSelectors } from '../traffic-fines.selectors';
import { trafficFineTableAdapter } from './traffic-fine-table.entity';
const { selectAll } = trafficFineTableAdapter.getSelectors();

export class TrafficFineTableSelectors {
  static selectAll = createSelector(
    TrafficFinesSelectors.trafficFineTableSelector,
    selectAll
  );

  static selectStatistics = createSelector(
    TrafficFinesSelectors.trafficFineTableSelector,
    (state) => state.statistics
  );

  static message = createSelector(
    TrafficFinesSelectors.trafficFineTableSelector,
    (state) => state.message
  );

  static error = createSelector(
    TrafficFinesSelectors.trafficFineTableSelector,
    (state) => state.error
  );
}
