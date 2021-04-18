import { Action, createReducer, on } from '@ngrx/store';
import {
  initialState,
  IRegistrationState,
  registrationAdapter
} from '@feature/fleet/+state/assets/registration/registration.entity';
import { RegistrationActions } from '@feature/fleet/+state/assets/registration/registration.actions';

const registrationReducer = createReducer(
  initialState,
  on(RegistrationActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(RegistrationActions.allDataLoaded, (state, { data }) =>
    registrationAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(RegistrationActions.count, (state, { data }) => ({
    ...state,
    resultNumber: data
  })),
  on(RegistrationActions.registerAsset, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(RegistrationActions.assetRegisterSuccessfull, (state, { data }) =>
    registrationAdapter.updateOne(
      { changes: data, id: data.id },
      {
        ...state,
        error: null,
        message: null,
        submitted: true
      }
    )
  ),
  on(RegistrationActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: IRegistrationState, action: Action) {
  return registrationReducer(state, action);
}
