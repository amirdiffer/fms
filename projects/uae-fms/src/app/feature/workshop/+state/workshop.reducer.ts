import { Action, createReducer } from "@ngrx/store";
import { State, WORKSHOP_FEATURE_KEY } from "./workshop.entity";
import * as bodyShopReducer from './body-shop/body-shop.reducer';
import { WORKSHOP_BODYSHOP_FEATURE_KEY } from './body-shop/body-shop.entity';

export const reducers = {
  [WORKSHOP_BODYSHOP_FEATURE_KEY]: bodyShopReducer.reducer
}
