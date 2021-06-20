import { Action, createReducer, on } from '@ngrx/store';
import {
  initialState,
  IRegistrationState,
  registrationAdapter
} from './registration.entity';
import { RegistrationActions } from './registration.actions';

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
  on(RegistrationActions.editRegister, (state, { register }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(RegistrationActions.registerEditedSuccessfully, (state, { register }) =>
    registrationAdapter.updateOne(
      { changes: register, id: register.id },
      {
        ...state,
        error: null,
        message: null,
        submitted: true
      }
    )
  ),
  on(RegistrationActions.resetParams, (state) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(RegistrationActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),
  on(RegistrationActions.loadAssetForRegistrationByAssetId, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(
    RegistrationActions.AssetForRegistrationByAssetIdLoaded,
    (state, { data }) => ({
      ...state,
      loaded: true,
      error: null,
      assetForRegistration: data
    })
  ),

  /* Register an Asset by plate number */
  on(RegistrationActions.registerAssetByPlateNumber, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(RegistrationActions.assetByPlateNumberRegistered, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: true
  })),

  /* Register an Asset by chassis number */
  on(RegistrationActions.registerAssetByChassisNumber, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(RegistrationActions.assetByChassisNumberRegistered, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: true
  }))
);

export function reducer(state: IRegistrationState, action: Action) {
  return registrationReducer(state, action);
}
