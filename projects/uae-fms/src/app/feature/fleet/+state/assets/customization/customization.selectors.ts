import { createSelector } from '@ngrx/store';
import { customizationAdapter } from './customization.entity';
import { FleetSelectors } from '../../fleet.selectors';

export class CustomizationSelectors {
  static selectAll = createSelector(
    FleetSelectors.customizationSelector,
    customizationAdapter.setAll
  );
}
