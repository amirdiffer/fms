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
  static count = createSelector(
    FleetSelectors.registrationSelector,
    (state) => state.resultNumber
  );

  static assetForRegistration = createSelector(
    FleetSelectors.registrationSelector,
    (state) => state.assetForRegistration
  );

  static message = createSelector(
    FleetSelectors.registrationSelector,
    (state) => state.message
  );

  static error = createSelector(
    FleetSelectors.registrationSelector,
    (state) => state.error
  );

  static selectById = createSelector(
    RegistrationSelectors.selectAll,
    (state, props: { id: number }) => {
      let data = state.filter((x) => x.id == props.id);
      if (data.length > 0) return data[0];
      else return null;
    }
  );
}
