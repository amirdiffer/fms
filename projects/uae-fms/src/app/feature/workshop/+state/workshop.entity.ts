import {
  IAuctionListState,
  WORKSHOP_AUCTION_LIST_FEATURE_KEY
} from './auction-list/auction-list.entity';
import {
  WORKSHOP_BODYSHOP_FEATURE_KEY,
  BodyShopState
} from './body-shop/body-shop.entity';
import {
  WORKSHOP_TECHNICAL_INSPECTION_FEATURE_KEY,
  ITechnicalInspectionState
} from './technical-inspections/technical-inspections.entity';

export const WORKSHOP_FEATURE_KEY = 'workshop';

export interface State {
  readonly [WORKSHOP_BODYSHOP_FEATURE_KEY]: BodyShopState;
  readonly [WORKSHOP_TECHNICAL_INSPECTION_FEATURE_KEY]: ITechnicalInspectionState;
  readonly [WORKSHOP_AUCTION_LIST_FEATURE_KEY]: IAuctionListState;
}

export interface WorkshopPartialState {
  readonly [WORKSHOP_FEATURE_KEY]: State;
}
