import { createSelector } from '@ngrx/store';

import { customizationAdapter } from '@feature/fleet/+state/assets/customization/customization.entity';
import { FleetSelectors } from '@feature/fleet/+state';

export class CustomizationSelectors {
  static selectAll = createSelector(
    FleetSelectors.customizationSelector,
    customizationAdapter.setAll
  );
}
