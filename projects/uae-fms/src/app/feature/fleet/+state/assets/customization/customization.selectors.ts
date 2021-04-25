import { createSelector } from '@ngrx/store';
import { customizationAdapter } from './customization.entity';
import { FleetSelectors } from '../../fleet.selectors';
const { selectAll } = customizationAdapter.getSelectors();

export class CustomizationSelectors {
  static selectAll = createSelector(
    FleetSelectors.customizationSelector,
    selectAll
  );
  static count = createSelector(
    FleetSelectors.customizationSelector,
    (state) => state.resultNumber
  );
}
