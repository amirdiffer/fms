import { WORKSHOP_BODYSHOP_FEATURE_KEY, BodyShopState } from "./body-shop/body-shop.entity";

export const WORKSHOP_FEATURE_KEY = "workshop";

export interface State {
  readonly [WORKSHOP_BODYSHOP_FEATURE_KEY]: BodyShopState
}

export interface WorkshopPartialState {
  readonly [WORKSHOP_FEATURE_KEY]: State;
}

