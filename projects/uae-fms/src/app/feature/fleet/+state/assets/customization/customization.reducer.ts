import { Action, createReducer, on } from '@ngrx/store';
import {
  customizationAdapter,
  ICustomizationState,
  initialState
} from '@feature/fleet/+state/assets/customization/customization.entity';
import { CustomizationActions } from '@feature/fleet/+state/assets/customization/customization.actions';

const customizationReducer = createReducer(
  initialState,
  on(CustomizationActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(CustomizationActions.allDataLoaded, (state, { data }) =>
    customizationAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(CustomizationActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: ICustomizationState, action: Action) {
  return customizationReducer(state, action);
}
