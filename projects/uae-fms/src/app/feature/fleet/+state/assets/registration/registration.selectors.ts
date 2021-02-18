import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '../../fleet.selectors';
import { registrationAdapter } from './registration.entity';

export class RegistrationSelectors {
  static selectAll = createSelector(
    FleetSelectors.registrationSelector,
    registrationAdapter.setAll
  );
}
