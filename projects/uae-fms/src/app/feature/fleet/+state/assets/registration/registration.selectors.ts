import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '@feature/fleet/+state';
import { registrationAdapter } from '@feature/fleet/+state/assets/registration/registration.entity';

export class RegistrationSelectors {
  static selectAll = createSelector(
    FleetSelectors.registrationSelector,
    registrationAdapter.setAll
  );
}
