import { createSelector } from '@ngrx/store';
import { registrationAdapter } from './registration.entity';
const { selectAll } = registrationAdapter.getSelectors();
const assetRegistrationState = (state) => state['registration']

export class RegistrationSelectors {

  static selectAll = createSelector(
    assetRegistrationState,
    selectAll
  );
  static submitted = createSelector(
    assetRegistrationState,
    (state) => state.submitted
  );
  static count = createSelector(
    assetRegistrationState,
    (state) => state.resultNumber
  );

  static assetForRegistration = createSelector(
    assetRegistrationState,
    (state) => state.assetForRegistration
  );

  static message = createSelector(
    assetRegistrationState,
    (state) => state.message
  );

  static error = createSelector(
    assetRegistrationState,
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
