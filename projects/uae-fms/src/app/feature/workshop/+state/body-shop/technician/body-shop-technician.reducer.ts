import { Action, createReducer, on } from '@ngrx/store';
import { BodyShopTechnicianActions } from './body-shop-technician.actions';
import {
  bodyShopTechnicianAdapter,
  IBodyShopTechnicianState,
  initialState
} from './body-shop-technician.entity';

const bodyShopTechnicianReducer = createReducer(
  initialState,
  on(BodyShopTechnicianActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(BodyShopTechnicianActions.allDataLoaded, (state, { data }) =>
    bodyShopTechnicianAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })
  ),
  on(BodyShopTechnicianActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: IBodyShopTechnicianState, action: Action) {
  return bodyShopTechnicianReducer(state, action);
}
