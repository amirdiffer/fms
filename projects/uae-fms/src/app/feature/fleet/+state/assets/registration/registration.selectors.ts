import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '../../fleet.selectors';
import { registrationAdapter } from './registration.entity';
const { selectAll } = registrationAdapter.getSelectors();

export class RegistrationSelectors {
  static selectAll = createSelector(
    FleetSelectors.registrationSelector,
    selectAll
  );
  static submitted = createSelector(
    FleetSelectors.registrationSelector,
    (state) => state.submitted
  );
  
}
