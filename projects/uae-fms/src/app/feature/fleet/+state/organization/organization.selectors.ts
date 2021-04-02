import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '@feature/fleet/+state/fleet.selectors';
import { organizationAdapter } from './organization.entity';
const { selectAll } = organizationAdapter.getSelectors();

export class OrganizationSelectors {
  static selectAll = createSelector(
    FleetSelectors.organizationSelector,
    selectAll
  );
  static submitted = createSelector(
    FleetSelectors.organizationSelector,
    (state) => state.submitted
  );
  static error = createSelector(
    FleetSelectors.organizationSelector,
    (state) => state.error
  );
}
