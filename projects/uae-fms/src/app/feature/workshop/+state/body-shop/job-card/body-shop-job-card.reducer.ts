import { Action, createReducer, on } from '@ngrx/store';
import { BodyShopJobCardActions } from "./body-shop-job-card.actions";
import { bodyShopJobCardAdapter, initialState, IBodyshopJobCardState } from "./body-shop-job-card.entity"


const bodyShopJobCardReducer = createReducer(
    initialState,
    on(BodyShopJobCardActions.loadAll, (state) => ({
      ...state,
      loaded: false,
      error: null,
      message: null
    })), 
    on(BodyShopJobCardActions.allDataLoaded, (state, { data }) =>
        bodyShopJobCardAdapter.setAll(data, { ...state, loaded: true, error: null })
    ),
    on(BodyShopJobCardActions.error, (state, { reason }) => ({
        ...state,
        error: reason,
        loaded: true
    }))
)

export function reducer(state: IBodyshopJobCardState, action: Action) {
    return bodyShopJobCardReducer(state, action);
  }