import { createSelector } from '@ngrx/store';
import { TrafficFinesSelectors } from '../traffic-fines.selectors';
import { trafficFineTableAdapter } from './traffic-fine-table.entity';

export class TrafficFineTableSelectors {
  static selectAll = createSelector(
    TrafficFinesSelectors.trafficFineTableSelector,
    trafficFineTableAdapter.setAll
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
