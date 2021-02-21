import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '@feature/fleet/+state/fleet.selectors';
import { organizationAdapter } from './organization.entity';

export class OrganizationSelectors {
  static selectAll = createSelector(
    FleetSelectors.assetMasterSelector,
    organizationAdapter.setAll
  );
}
